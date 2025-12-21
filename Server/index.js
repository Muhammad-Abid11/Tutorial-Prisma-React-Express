import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json()); //middleware

// Root route
app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});