import { Router } from 'express';
import roomControllers from '../controllers/roomControllers.js';

const router = Router();
router.get('/', roomControllers.findingRoom);

export default router;
