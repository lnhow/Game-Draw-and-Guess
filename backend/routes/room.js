import { Router } from 'express';
import roomControllers from '../controllers/roomControllers.js';
import verify from '../middlewares/verifyToken.js';

const router = Router();
router.get('/', roomControllers.findingRoom);
router.post('/create', roomControllers.createRoom);
router.delete('/:id', roomControllers.deleteRoom);
router.put('/:id', roomControllers.updateRoom);

export default router;
