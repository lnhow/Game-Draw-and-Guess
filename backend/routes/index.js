import { Router } from 'express';
import Account from '../models/User.js';
import verify from '../verifyToken.js';

const router = Router();

router.get('/', verify, async (req, res) => {
  const user = await Account.findOne({ _id: req.user._id });
  res.send(user);
});

export default router;
