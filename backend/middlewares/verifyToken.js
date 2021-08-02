import jwt from 'jsonwebtoken';
import usersModel from '../models/usersModel.cjs';
import accountsModel from '../models/accountsModel.cjs';
import cookie from 'cookie';
import mongoose from 'mongoose';

export default async function auth(req, res, next) {
  const token = req.header('auth-token');
  console.log(req.header);
  // const token = cookie.parse(req.headers.cookie).auth_token;
  if (!token) return next(res.status(401).send('Access Denied'));

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    const currentUser = await usersModel.findOne({
      _id: mongoose.Types.ObjectId(req.user.userId),
    });
    if (!currentUser) {
      return next(
        res
          .status(401)
          .json({ msg: 'The user belonging to this token no longer exists' }),
      );
    }

    const currentAccount = await accountsModel.findOne({
      _id: mongoose.Types.ObjectId(currentUser.accountId),
    });

    if (currentAccount.changePasswordAfter(req.user.iat)) {
      return next(
        res
          .json({ msg: 'User recently changed password! Please log in again' })
          .status(401),
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid Token' });
  }
}
