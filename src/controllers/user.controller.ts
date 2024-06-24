import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';



export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req.userId !== req.params.userId) {
        return res.status(403).send({ message: "You are not allowed to update this user" });
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return res.status(400).send({ message: "Password must be at least 6 characters" });
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return res.status(400).send({ message: "Username must be between 7 and 20 characters" });
        }
        if (req.body.username.includes(' ')) {
            return res.status(400).send({ message: "Username cannot contain spaces" });
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return res.status(400).send({ message: "Username must be lowercase" });
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return res.status(400).send({ message: "Username can only contain letters and numbers" });
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        const { password, _id, ...rest } = updatedUser.toObject();
        const userWithUserId = { userId: _id, ...rest };
        res.status(200).json(userWithUserId);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req.userId !== req.params.userId) {
        return next(res.status(403).send({ message: "You are not allowed to delete the user" }))
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        next(error)
    }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('access_token').status(200).json("User has been signed out")
    } catch (error) {
        next(error)
    }
}