import type { Request, Response } from "express";
import {
  retrieveTasks,
  retrieveTaskById,
  insertTask,
  modifyTask,
  eraseTask
} from "../service/todos";
import {
  createItemSchema,
  updateItemSchema,
  idCheckSchema
} from "../validators/todoValidators";

export const fetchAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await retrieveTasks();
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchTask = async (req: Request, res: Response) => {
  const parsedId = idCheckSchema.safeParse(req.params);
  if (!parsedId.success)
    return res.status(400).json(parsedId.error.flatten());

  try {
    const task = await retrieveTaskById(parsedId.data.id);
    if (!task) return res.status(404).json({ message: "Todo not found" });

    res.json(task);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const parsedBody = createItemSchema.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(400).json(parsedBody.error.flatten());

  try {
    const { title, dueDate } = parsedBody.data;
    const created = await insertTask(title, new Date(dueDate));
    res.status(201).json(created);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const parsedId = idCheckSchema.safeParse(req.params);
  if (!parsedId.success)
    return res.status(400).json(parsedId.error.flatten());

  const parsedBody = updateItemSchema.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(400).json(parsedBody.error.flatten());

  try {
    const updateData = {
      ...parsedBody.data,
      ...(parsedBody.data.dueDate && {
        dueDate: new Date(parsedBody.data.dueDate)
      })
    };

    const updated = await modifyTask(parsedId.data.id, updateData);

    if (!updated)
      return res.status(404).json({ message: "Todo not found" });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const parsedId = idCheckSchema.safeParse(req.params);
  if (!parsedId.success)
    return res.status(400).json(parsedId.error.flatten());

  try {
    const removed = await eraseTask(parsedId.data.id);
    if (!removed) return res.status(404).json({ message: "Todo not found" });

    res.json(removed);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};