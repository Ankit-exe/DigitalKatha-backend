import express from 'express'
import { verifyToken } from '../middleware/verifyUser';
import { createComment, getPostComments } from '../controllers/comment.controller';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);

export default router;