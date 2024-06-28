import express from 'express'
import { updateUser, deleteUser, signOut, getUser } from '../controllers/user.controller';
import { verifyToken } from '../middleware/verifyUser';
'../middleware/verifyUser';



const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signOut);
router.get('/:userId', getUser);

export default router;