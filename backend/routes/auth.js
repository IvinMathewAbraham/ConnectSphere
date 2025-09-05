import { Router } from 'express';
const router = Router();
import { signup, loginUser, logoutUser, updateProfile, checkAuth } from '../controllers/authController';
import { validateToken } from '../middleware/validateTokenHandler';


router.post('/signup',signup);
router.post('/login',loginUser);
router.post('/logout',logoutUser);

router.put('/updateprofile', validateToken, updateProfile);

router.get('/check',validateToken, checkAuth);

export default router;