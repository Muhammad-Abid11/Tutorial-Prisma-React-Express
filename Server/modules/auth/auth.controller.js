import prisma, { EXPIRE_IN, JWT_SECRET } from "../../prisma/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "./auth.validation.js";

const register = async (req, res) => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const { email, password, name } = validatedData;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: EXPIRE_IN }
        );

        res.status(201).json({ user: { id: user.id, email: user.email, name: user.name }, token, message: "User registered successfully" });
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({ error: error.errors });
        }
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

const login = async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const { email, password } = validatedData;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: EXPIRE_IN });

        res.json({ user: { id: user.id, email: user.email, name: user.name }, token, message: "Login successful" });
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({ error: error.errors });
        }
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login" });
    }
};

export { register, login };
