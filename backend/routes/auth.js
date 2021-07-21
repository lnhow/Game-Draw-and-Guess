import { Router } from 'express';
import Account from '../models/User.js';
import { registerValidation, loginValidation } from '../validation.cjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/email.js';

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
  res.header('auth-token', token).send(token);
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

  const message = `Forgot your password? Submid a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ingore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
  }
});

router.patch('/resetPassword/:token', async (req, res) => {
  //Get user based on Post email
  const user = await Account.findOne({
    email: req.body.email,
  });

  if (!user) return res.status(400).send('Email is not found');

  //Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }

  //Send it to user's email
  const resetURL = ``;
});

export default router;
