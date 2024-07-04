import express from 'express'
import { verifyToken } from '../middleware/verifyUser';
import { sendMessage } from '../controllers/contact.controller';

const router = express.Router();

router.post('/sendmessage', verifyToken, sendMessage);

export default router;