import express from 'express'
import { updateUser } from '../controllers/user.controller';
import { verifyToken } from '../middleware/verifyUser';
'../middleware/verifyUser';



const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);

export default router;