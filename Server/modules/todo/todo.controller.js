import prisma from "../../prisma/prisma.js";

const getAllTodos = async (req, res) => {
    try {
        const todos = await prisma.todos.findMany({
            where: {
                userId: req.userId
            },
            orderBy: {
                createdAt: "desc"
            },
        });
        res.json({ todos, message: "Todos fetched successfully" });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Failed to fetch todos" });
    }
};

const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        // in prisma data need to wrap in an object 
        const todo = await prisma.todos.create({
            data: {
                title,
                completed: false,
                userId: req.userId,
            },
        });
        res.json({ todo, message: "Todo created successfully" });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: "Failed to create todo" });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const todo = await prisma.todos.update({
            where: {
                id: parseInt(id),
                userId: req.userId,
            },
            data: {
                title,
                completed,
            },
        });
        res.json({ todo, message: "Todo updated successfully" });
    } catch (error) {
        if (error && error.code === "P2025") {
            return res.status(404).json({ error: "Todo not found or unauthorized" });
        }
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Failed to update todo" });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await prisma.todos.delete({
            where: {
                id: parseInt(id),
                userId: req.userId,
            },
        });
        res.json({ todo, message: "Todo deleted successfully" });
    } catch (error) {
        if (error && error.code === "P2025") {
            return res.status(404).json({ error: "Todo not found or unauthorized" });
        }
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Failed to delete todo" });
    }
};


export {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};