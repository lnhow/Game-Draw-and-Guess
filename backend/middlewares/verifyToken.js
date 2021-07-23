import jwt from 'jsonwebtoken';
import usersModel from '../models/usersModel.cjs';

export default async function auth(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    const freshUser = await usersModel.findById(req.user._id);
    if (!freshUser) {
      return res
        .status(401)
        .json({ msg: 'The user belonging to this token no longer exists' });
    }

    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid Token' });
  }
}
