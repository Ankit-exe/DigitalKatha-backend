import { Request, Response, NextFunction } from "express";
import { check, validationResult } from 'express-validator'


const handleValidationResults = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateSignUpRequest = [
    check('username').isString().withMessage('Username is required'),
    check('email').isEmail().withMessage('Email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password with 6 or more characters is required'),
    handleValidationResults
];

export const validateSignInRequest = [
    check('email').isEmail().withMessage('Email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password with 6 or more characters is required'),
    handleValidationResults
];

