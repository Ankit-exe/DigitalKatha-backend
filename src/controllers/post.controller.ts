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

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const startIndex = parseInt(req.query.startIndex as string) || 0;
        const limit = parseInt(req.query.limit as string) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        let query: any = {};

        if (req.query.userId) {
            query.userId = req.query.userId as string;
        }
        if (req.query.category) {
            query.category = req.query.category as string;
        }
        if (req.query.slug) {
            query.slug = req.query.slug as string;
        }
        if (req.query.postId) {
            query._id = req.query.postId
        }
        if (req.query.searchTerm) {
            query.$or = [
                { title: { $regex: req.query.searchTerm, $options: 'i' } },
                { content: { $regex: req.query.searchTerm, $options: 'i' } },

            ]
        }

        const posts = await Post.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit)

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() -1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        })

        res.status(200).json({
            posts,
            lastMonthPosts
        })

    } catch (error) {
        next(error)
    }

}