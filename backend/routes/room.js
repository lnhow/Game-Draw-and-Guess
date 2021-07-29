import { Router } from 'express';
import roomControllers from '../controllers/roomControllers.js';
import verify from '../middlewares/verifyToken.js';

const router = Router();
router.get('/', verify, roomControllers.findingRoom);
router.post('/room/create', roomControllers.createRoom);
router.delete('/room/:id', roomControllers.deleteRoom);
router.put('/room/:id', roomControllers.updateRoom);

export default router;
