import { z } from "zod";

export const createItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.string().min(1, "Due date is required")
});

export const updateItemSchema = z.object({
  title: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  completed: z.boolean().optional()
});

export const idCheckSchema = z.object({
  id: z.string().min(1, "ID is required")
});