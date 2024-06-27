import express from 'express'
import { verifyToken } from '../middleware/verifyUser';
import { createComment } from '../controllers/comment.controller';

const router = express.Router();

router.post('/create', verifyToken, createComment);

export default router;