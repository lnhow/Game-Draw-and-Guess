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
import { usernameValidation } from '../utils/validation.cjs';

const authController = {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  anonymousUser,
};

async function register(req, res) {
  const { error } = registerValidation(req.body);

  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  const emailExist = await accountsModel.findOne({
    email: req.body.email,
  });
  if (emailExist)
    return res.status(400).json({
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
      .header('auth-token', token)
      .cookie('auth-token', token, { httpOnly: true })
      .json({
        message: 'Register success',
        token: token,
      });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
}

async function login(req, res) {
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  const account = await accountsModel.findOne({
    email: req.body.email,
  });
  if (!account)
    return res.status(400).json({
      message: 'Email is not found',
    });

  const validPass = await bcrypt.compare(req.body.password, account.password);
  if (!validPass)
    return res.status(400).json({
      message: 'Invalid password',
    });

  const user = await usersModel.findOne({
    accountId: mongoose.Types.ObjectId(account._id),
  });

  const dataToken = {
    userId: user._id,
    username: user.username,
  };

  const token = jwt.sign(dataToken, process.env.TOKEN_SECRET);

  res
    .status(200)
    .header('auth-token', token)
    .cookie('auth-token', token, { httpOnly: true })
    .json({
      message: 'Login success',
      token: token,
    });
}

async function forgotPassword(req, res, next) {
  const account = await accountsModel.findOne({
    email: req.body.email,
  });

  if (!account)
    return next(
      res.status(400).json({
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
      message: 'Token sent to email!',
    });
  } catch (err) {
    account.passwordResetToken = undefined;
    account.passwordResetExpires = undefined;
    await account.save({ validateBeforeSave: false });

    return res.status(500).json({
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
      message: 'Token is invalid or has expired',
    });
  }

  const { error } = repasswordValidation(req.body);
  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  account.password = hashPassword;

  account.passwordResetToken = undefined;
  account.passwordResetExpires = undefined;

  const user = await usersModel.findOne({
    accountId: mongoose.Types.ObjectId(account._id),
  });

  await account.save();

  const dataToken = {
    userId: user._id,
    username: user.username,
  };

  const token = jwt.sign(dataToken, process.env.TOKEN_SECRET);
  res
    .status(200)
    .header('auth-token', token)
    .cookie('auth-token', token, { httpOnly: true })
    .json({
      message: 'Reset password success',
      token: token,
    });
}

async function logout(req, res) {
  res.clearCookie('auth-token');
  res.json({
    message: 'You have been logout!',
  });
}

async function anonymousUser(req, res) {
  const { error } = usernameValidation(req.body);
  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });
  const user = await usersModel.findOne({ username: req.body.username });
  if (user)
    return res.status(409).json({
      message: 'Username already taken!',
    });
  const anonymousUser = new usersModel({
    accountId: null,
    username: req.body.username,
  });
  try {
    const dataToken = {
      userId: anonymousUser._id,
      username: anonymousUser.username,
    };
    await anonymousUser.save();
    const token = jwt.sign(dataToken, process.env.TOKEN_SECRET);
    res.status(201).header('auth-token', token).json({
      message: 'New user created!',
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}

export default authController;
