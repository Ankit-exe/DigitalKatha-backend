
import express from 'express'
import { verifyToken } from '../middleware/verifyUser'
import { Create, getPosts, deletePost, updatePost, getPostComments } from '../controllers/post.controller'

const router = express.Router()

router.post('/create', verifyToken, Create)
router.get('/getposts', getPosts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)
router.put('/updatepost/:postId/:userId', verifyToken, updatePost)
router.get('/getpostcomment', getPostComments);


export default router;