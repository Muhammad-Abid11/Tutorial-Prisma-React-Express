import express from "express";
import { getAllTodos, createTodo, updateTodo, deleteTodo } from "./todo.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createTodoSchema, updateTodoSchema, deleteTodoSchema } from "./todo.validation.js";

const router = express.Router();

router.route("/").get(getAllTodos).post(validate(createTodoSchema), createTodo);
router.route("/:id").put(validate(updateTodoSchema), updateTodo).delete(validate(deleteTodoSchema, "params"), deleteTodo);

export default router;
