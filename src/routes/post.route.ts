
import express from 'express'
import { verifyToken } from '../middleware/verifyUser'
import { Create } from '../controllers/post.controller'

const router = express.Router()

router.post('/create', verifyToken, Create)

export default router;