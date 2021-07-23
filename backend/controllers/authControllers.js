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

const authController = { register, login, forgotPassword, resetPassword };

async function register(req, res) {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const emailExist = await accountsModel.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).json({ msg: 'Email already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const account = new accountsModel({
    email: req.body.email,
    password: hashPassword,
    username: req.body.username,
  });

  const user = new usersModel({
    _accountId: account._id,
  });

  try {
    await account.save();
    await user.save();
    const dataToken = {
      _userId: user._id,
      username: user.username,
      avatar: user.avatar,
    };

    const token = jwt.sign(dataToken, process.env.TOKEN_SECRET);
    res
      .status(201)
      .header('auth-token', token)
      .cookie('auth-token', token, { httpOnly: true })
      .json({
        token: token,
      });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
}

async function login(req, res) {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const account = await accountsModel.findOne({
    email: req.body.email,
  });
  if (!account) return res.status(400).json({ msg: 'Email is not found' });

  const validPass = await bcrypt.compare(req.body.password, account.password);
  if (!validPass) return res.status(400).json({ msg: 'Invalid password' });

  const user = await usersModel.findOne({
    _accountId: account._id,
  });

  const dataToken = {
    _userId: user._id,
    username: user.username,
    avatar: user.avatar,
  };

  const token = jwt.sign(dataToken, process.env.TOKEN_SECRET);
  res.status(200).cookie('auth-token', token, { httpOnly: true }).json({
    token: token,
  });
}

async function forgotPassword(req, res) {
  const account = await accountsModel.findOne({
    email: req.body.email,
  });

  if (!account) return res.status(400).json({ msg: 'Email is not found' });

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
      msg: 'Token sent to email!',
    });
  } catch (err) {
    account.passwordResetToken = undefined;
    account.passwordResetExpires = undefined;
    await account.save({ validateBeforeSave: false });

    return res
      .status(500)
      .json({ msg: 'There was an error sending the email. Try again later!' });
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
    return res.status(400).json({ msg: 'Token is invalid or has expired' });
  }

  const { error } = repasswordValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  account.password = hashPassword;

  account.passwordResetToken = undefined;
  account.passwordResetExpires = undefined;
  const user = await usersModel.findOne({
    _accountId: account._id,
  });

  await account.save();

  const token = jwt.sign({ _userId: user._id }, process.env.TOKEN_SECRET);
  res.status(200).json({
    token: token,
  });
}

export default authController;
