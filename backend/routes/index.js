import { Router } from 'express';
import usersModel from '../models/usersModel.cjs';
import verify from '../middlewares/verifyToken.js';

const router = Router();

router.get('/', verify, async (req, res) => {
  const user = await usersModel.findOne({ _id: req.user._id });
  res.json({ user });
});

export default router;
