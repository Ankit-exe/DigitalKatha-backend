
import express from 'express'
import { verifyToken } from '../middleware/verifyUser'
import { Create, getPosts } from '../controllers/post.controller'

const router = express.Router()

router.post('/create', verifyToken, Create)
router.get('/getposts', getPosts)

export default router;