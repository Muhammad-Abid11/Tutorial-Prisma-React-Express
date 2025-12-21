import "dotenv/config";
import express from "express";
import { PrismaConnect } from "./prisma/prisma.js";
import todoRouter from "./modules/todo/todo.router.js";
import cors from "cors";

const app = express();

app.use(express.json()); //middleware
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
    }
));

// Root route
app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Todo route
app.use("/todos", todoRouter);

PrismaConnect(); // Just for testing Prisma connected or not

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});