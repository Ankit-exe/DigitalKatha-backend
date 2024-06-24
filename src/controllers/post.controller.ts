import { Request, Response, NextFunction } from "express"
import Post from "../models/post.model";


export const Create = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.title || !req.body.content) {
        return next(res.status(400).send("Content required"))
    }
    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body, slug, userId: req.userId
    });
    try {
        const savePost = await newPost.save();
        res.status(201).json(savePost)
    } catch (error) {
        next(error)
    }
}