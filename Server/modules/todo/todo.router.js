import express from "express";
import { getAllTodos, createTodo, updateTodo, deleteTodo } from "./todo.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createTodoSchema, updateTodoSchema, deleteTodoSchema } from "./todo.validation.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Apply authMiddleware to all routes in this router
router.use(authMiddleware);
// router.get("/", getAllTodos);
// router.post("/", validate(createTodoSchema), createTodo);
// router.patch("/:id", validate(updateTodoSchema), updateTodo);
// router.delete("/:id", validate(deleteTodoSchema, "params"), deleteTodo);

router.route("/").get(getAllTodos).post(validate(createTodoSchema), createTodo);
router.route("/:id").put(validate(updateTodoSchema), updateTodo).delete(validate(deleteTodoSchema, "params"), deleteTodo);

export default router;
