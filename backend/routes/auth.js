import { Router } from 'express';
import authController from '../controllers/authControllers.js';
import verify from '../middlewares/verifyToken.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/logout', authController.logout);
router.post('/getUser', authController.anonymousUser);
router.post('/updateUser', authController.updateUser);
router.post('/changePassword', authController.changePassword);

export default router;
