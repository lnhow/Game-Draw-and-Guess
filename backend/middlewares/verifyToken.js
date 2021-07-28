import jwt from 'jsonwebtoken';
import usersModel from '../models/usersModel.cjs';
import accountsModel from '../models/accountsModel.cjs';
import cookie from 'cookie';

export default async function auth(req, res, next) {
  // const token = req.header('auth_token');
  const token = cookie.parse(req.headers.cookie).auth_token;
  if (!token)
    return next(
      res.status(401).json({
        is_err: true,
        message: 'Access Denied',
      }),
    );

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    const currentUser = await usersModel.findOne({ _id: req.user.userId });
    if (!currentUser) {
      return next(
        res.status(401).json({
          is_err: true,
          message: 'The user belonging to this token no longer exists',
        }),
      );
    }

    const currentAccount = await accountsModel.findOne({
      _id: currentUser.accountId,
    });

    if (currentAccount.changePasswordAfter(req.user.iat)) {
      return next(
        res
          .json({
            is_err: true,
            message: 'User recently changed password! Please log in again',
          })
          .status(401),
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json({
      is_err: true,
      message: 'Invalid Token',
    });
  }
}
