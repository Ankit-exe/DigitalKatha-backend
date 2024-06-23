import express from 'express'
import { updateUser, deleteUser, signOut } from '../controllers/user.controller';
import { verifyToken } from '../middleware/verifyUser';
'../middleware/verifyUser';



const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signOut);

export default router;