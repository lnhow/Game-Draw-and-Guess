import { Router } from 'express';
import Account from '../models/User.js';
import {
  registerValidation,
  loginValidation,
  repasswordValidation,
} from '../validation.cjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/email.js';
import crypto from 'crypto';

const router = Router();

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const emailExist = await Account.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).json({ msg: 'Email already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new Account({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    await user.save();
    res.json({ user: user._id });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const user = await Account.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).json({ msg: 'Email is not found' });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ msg: 'Invalid password' });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).json({
    token: token,
  });
});

router.post('/forgotPassword', async (req, res) => {
  const user = await Account.findOne({
    email: req.body.email,
  });

  if (!user) return res.status(400).json({ msg: 'Email is not found' });

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/user/resetPassword/${resetToken}`;

  const message = `Forgot your password? Click here to reset your password:\n ${resetURL}.\nIf you didn't forget your password, please ingore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: '[DRAW & GUESS GAME] - Reset your password',
      message,
    });

    res.status(200).json({
      msg: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res
      .status(500)
      .json({ msg: 'There was an error sending the email. Try again later!' });
  }
});

router.patch('/resetPassword/:token', async (req, res) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await Account.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ msg: 'Token is invalid or has expired' });
  }

  const { error } = repasswordValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashPassword;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.status(200).json({
    userToken: token,
  });
});

export default router;
