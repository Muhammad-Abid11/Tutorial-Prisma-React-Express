import prisma from "../../prisma/prisma.js";

const getAllTodos = async (req, res) => {
    try {
        const todos = await prisma.todos.findMany();
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
            },
            data: {
                title,
                completed,
            },
        });
        res.json({ todo, message: "Todo updated successfully" });
    } catch (error) {
        // error code P2025 means record not found
        // ✅ Pros:
        // Clear 404 for missing records
        // No server error for expected scenarios
        // No need to check if record (no api extra call findUnique) exists before deleting
        if (error && error.code === "P2025") {
            return res.status(404).json({ error: "Todo not found" });
        }
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Failed to update todo" });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await prisma.todos.delete({
            where: { id: parseInt(id) },
        });
        res.json({ todo, message: "Todo deleted successfully" });
    } catch (error) {
        // error code P2025 means record not found
        // ✅ Pros:
        // Clear 404 for missing records
        // No server error for expected scenarios
        // No need to check if record (no api extra call findUnique) exists before deleting
        if (error && error.code === "P2025") {
            return res.status(404).json({ error: "Todo not found" });
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