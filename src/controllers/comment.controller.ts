import { Request, Response, NextFunction, response } from "express";
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

export const getPostComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 })
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }

}

export const likeComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(res.status(404).send("Comment not found"));
        }
        const userIndex = comment.likes.indexOf(req.userId);
        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.userId)
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1)
        }
        await comment.save();
        res.status(200).json(comment);
    }
    catch (error) {
        next(error);
    }
}

export const editComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(res.status(402).send("Comment not found"));
        }
        if (comment.userId !== req.userId) {
            return next(res.status(403).send("You are not allowed to edit this comment"))
        }
        const editedComment = await Comment.findByIdAndUpdate(req.params.commentId, {
            content: req.body.content,
        }, { new: true }
        );
        res.status(200).json(editedComment)
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(res.status(404).send("Comment not found"));
        }
        if (comment.userId !== req.userId) {
            return next(res.status(403).send("You are not allowed to edit this comment"))
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json("Comment has been deleted")

    } catch (error) {
        next(error)
    }
}