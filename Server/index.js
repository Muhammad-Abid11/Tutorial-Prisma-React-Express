import "dotenv/config";
import express from "express";
import { frontendUrl, PORT, PrismaConnect } from "./prisma/prisma.js";
import todoRouter from "./modules/todo/todo.router.js";
import authRouter from "./modules/auth/auth.router.js";
import cors from "cors";

const app = express();

app.use(express.json()); //middleware
app.use(cors(
    {
        origin: frontendUrl,
    }
));

// Root route
app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Auth route
app.use("/auth", authRouter);

// Todo route
app.use("/todos", todoRouter);

PrismaConnect(); // Just for testing Prisma connected or not

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});