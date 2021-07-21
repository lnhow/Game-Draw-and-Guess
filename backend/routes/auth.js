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
  //Validate data before push data to db
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in database
  const emailExist = await Account.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).send('Email already exists');

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new Account({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  //Validate data before push data to db
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email exists
  const user = await Account.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send('Email is not found');
  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  //Creat and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).json({
    token: token,
  });
});

router.post('/forgotPassword', async (req, res) => {
  //Get user based on Post email
  const user = await Account.findOne({
    email: req.body.email,
  });

  if (!user) return res.status(400).send('Email is not found');

  //Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //Send it to user's email
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
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res
      .status(500)
      .send('There was an error sending the email. Try again later!');
  }
});

router.patch('/resetPassword/:token', async (req, res) => {
  //Get user base on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await Account.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //If token has not expired, and there is user, set the new password
  if (!user) {
    return res.status(400).send('Token is invalid or has expired');
  }
  const { error } = repasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //Update updatedAt property for the user

  //Log the user in
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.status(200).json({
    status: 'success',
    token,
  });
});

export default router;
