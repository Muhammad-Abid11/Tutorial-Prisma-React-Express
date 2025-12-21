import { z } from "zod";

export const createTodoSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters long"),
    completed: z.boolean().optional(),
})

export const updateTodoSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters long"),
    completed: z.boolean().optional(),
})

export const deleteTodoSchema = z.object({
    id: z.coerce.number().int().min(1, "Id must be at least 1"),
});
