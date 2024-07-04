import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route";
import userRoutes from './routes/user.route';
import postRoutes from './routes/post.route';
import commentRoutes from './routes/comment.route';
import conatctRoutes from './routes/contact.route';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

mongoose.connect(process.env.MONGO_DB as string)
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/contact", conatctRoutes);

app.listen(7000, () => {
    console.log("SERVER STARTED ON 7000");
});
