import { Request, Response, NextFunction } from "express";
import Contact from "../models/contact.model";

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.subject || !req.body.message) {
            return next(res.status(400).send("Content required"))
        }
        const newMesage = new Contact({
            ...req.body, userId: req.userId
        });
        const saveMessage = await newMesage.save();
        res.status(201).json(saveMessage)

    } catch (error) {
        next(error)
    }
}