import { NextFunction, Request, Response } from "express"
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    let user = await User.findOne({
        email: req.body.email
    })

    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save();
        res.status(201).json("USER CREATED SUCCESSFULLY")
    } catch (error) {
        next(error)
    }
}


export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const validatePassword = bcrypt.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '1d' }
        );

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 86400000,
            sameSite: 'none' as 'none',
        }).json({ username: user.username, email: user.email, userId: user._id, profilePicture: user.profilePicture });
    } catch (error) {
        next(error);
    }
};



export const google = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, googlePhotoUrl } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            // User already exists, generate a token and send the response
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '1d' }
            );

            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none' as 'none',
                maxAge: 86400000,
            }).json({
                username: user.username,
                email: user.email,
                userId: user._id,
                profilePicture: user.profilePicture
            });
        } else {
            // User does not exist, create a new user
            const generatePassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatePassword, 10);
            const username = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            });
            await newUser.save();

            const token = jwt.sign(
                { userId: newUser._id },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '1d' }

            );
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none' as 'none',
                maxAge: 86400000,
            }).json({
                username: newUser.username,
                email: newUser.email,
                userId: newUser._id,
                profilePicture: newUser.profilePicture
            });
        }
    } catch (error) {
        next(error);
    }
};
