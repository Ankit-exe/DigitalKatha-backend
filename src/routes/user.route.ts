import express from 'express'
import { updateUser, deleteUser } from '../controllers/user.controller';
import { verifyToken } from '../middleware/verifyUser';
'../middleware/verifyUser';



const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser)

export default router;