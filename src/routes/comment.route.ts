import express from 'express'
import { verifyToken } from '../middleware/verifyUser';
import { createComment, getPostComments, likeComment, editComment } from '../controllers/comment.controller';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);

export default router;