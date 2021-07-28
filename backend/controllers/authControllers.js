import {
  registerValidation,
  loginValidation,
  repasswordValidation,
} from '../utils/validation.cjs';
import accountsModel from '../models/accountsModel.cjs';
import usersModel from '../models/usersModel.cjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/email.js';
import crypto from 'crypto';
import mongoose from 'mongoose';

const authController = {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
};

async function register(req, res) {
  const { error } = registerValidation(req.body);

  if (error)
    return res.status(400).json({
      is_err: true,
      message: error.details[0].message,
    });

  const emailExist = await accountsModel.findOne({
    email: req.body.email,
  });
  if (emailExist)
    return res.status(400).json({
      is_err: true,
      message: 'Email already exists',
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const account = new accountsModel({
    email: req.body.email,
    password: hashPassword,
  });

  const user = new usersModel({
    accountId: mongoose.Types.ObjectId(account._id),
    username: req.body.username,
  });

  try {
    await account.save();
    await user.save();

    const dataToken = {
      userId: user._id,
      username: user.username,
    };

    const token = jwt.sign(dataToken, process.env.TOKEN_SECRET);
    res
      .status(201)
      .header('auth_token', token)
      .cookie('auth_token', token, { httpOnly: true })
      .json({
        is_err: false,
        message: 'Register success',
        data: {
          token: token,
        },
      });
  } catch (err) {
    res.status(400).json({
      is_err: true,
      message: err,
    });
  }
}

async function login(req, res) {
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).json({
      is_err: true,
      message: error.details[0].message,
    });

  const account = await accountsModel.findOne({
    email: req.body.email,
  });
  if (!account)
    return res.status(400).json({
      is_err: true,
      message: 'Email is not found',
    });

  const validPass = await bcrypt.compare(req.body.password, account.password);
  if (!validPass)
    return res.status(400).json({
      is_err: true,
      message: 'Invalid password',
    });

  const user = await usersModel.findOne({
    accountId: account._id,
  });

  const dataToken = {
    userId: user._id,
    username: user.username,
  };

  const token = jwt.sign(dataToken, process.env.TOKEN_SECRET);

  res
    .status(200)
    .header('auth_token', token)
    .cookie('auth_token', token, { httpOnly: true })
    .json({
      is_err: false,
      message: 'Login success',
      data: {
        token: token,
      },
    });
}

async function forgotPassword(req, res, next) {
  const account = await accountsModel.findOne({
    email: req.body.email,
  });

  if (!account)
    return next(
      res.status(400).json({
        is_err: true,
        message: 'Email is not found',
      }),
    );

  const resetToken = account.createPasswordResetToken();
  await account.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/account/resetPassword/${resetToken}`;

  const message = `Forgot your password? Click here to reset your password:\n ${resetURL}.\nIf you didn't forget your password, please ingore this email!`;

  try {
    await sendEmail({
      email: account.email,
      subject: '[DRAW & GUESS GAME] - Reset your password',
      message,
    });

    res.status(200).json({
      is_err: false,
      message: 'Token sent to email!',
    });
  } catch (err) {
    account.passwordResetToken = undefined;
    account.passwordResetExpires = undefined;
    await account.save({ validateBeforeSave: false });

    return res.status(500).json({
      is_err: true,
      message: 'There was an error sending the email. Try again later!',
    });
  }
}

async function resetPassword(req, res) {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const account = await accountsModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!account) {
    return res.status(400).json({
      is_err: true,
      message: 'Token is invalid or has expired',
    });
  }

  const { error } = repasswordValidation(req.body);
  if (error)
    return res.status(400).json({
      is_err: true,
      message: error.details[0].message,
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  account.password = hashPassword;

  account.passwordResetToken = undefined;
  account.passwordResetExpires = undefined;

  const user = await usersModel.findOne({
    accountId: account._id,
  });

  await account.save();

  const dataToken = {
    userId: user._id,
    username: user.username,
  };

  const token = jwt.sign(dataToken, process.env.TOKEN_SECRET);
  res
    .status(200)
    .header('auth_token', token)
    .cookie('auth_token', token, { httpOnly: true })
    .json({
      is_err: false,
      message: 'Reset password success',
      data: {
        token: token,
      },
    });
}

async function logout(req, res) {
  res.clearCookie('auth_token');
  res.json({
    is_err: false,
    message: 'You have been logout!',
  });
}

export default authController;
