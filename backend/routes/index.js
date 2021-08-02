import { Router } from 'express';
import usersModel from '../models/usersModel.cjs';
import verify from '../middlewares/verifyToken.js';
import authRoute from './auth.js';
import roomRoute from './room.js';
import categoryRoute from './category.js';

const router = Router();

router.get('/', verify, async (req, res) => {
  try {
    const user = await usersModel.findOne({ _id: req.user._id });
    res.json({ user });
  } catch (err) {
    res.json({ msg: 'Not found' });
  }
});

router.use('/api/user', authRoute);
router.use('/api/room/category', categoryRoute);
router.use('/api/room', roomRoute);

export default router;
