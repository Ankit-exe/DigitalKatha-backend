import express from 'express'
import { signUp, signIn, google } from '../controllers/auth.controller';
import { validateSignInRequest, validateSignUpRequest } from '../middleware/validate.user';

const router = express.Router();

router.post("/signup", validateSignUpRequest, signUp);
router.post("/signin", validateSignInRequest, signIn);
router.post("/google", google);

export default router;