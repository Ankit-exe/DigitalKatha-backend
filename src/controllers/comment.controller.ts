import { Request, Response, NextFunction } from "express";
import Comment from "../models/comment.model";


export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { content, postId, userId } = req.body;

        if (userId !== req.userId) {
            return next(res.status(401).send("You are not allowed to create this comment"))
        }

        const newComment = new Comment({
            content,
            postId,
            userId
        });
        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        next(error)
    }
}