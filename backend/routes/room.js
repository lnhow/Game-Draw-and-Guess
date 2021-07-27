import { Router } from 'express';
import roomControllers from '../controllers/roomControllers.js';
import verify from '../middlewares/verifyToken.js';

const router = Router();
router.get('/', verify, roomControllers.findingRoom);

export default router;
