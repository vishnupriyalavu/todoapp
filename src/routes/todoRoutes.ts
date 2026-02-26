import { Router } from "express";
import {
  fetchAllTasks,
  fetchTask,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/todoController";

const taskRouter = Router();

taskRouter.get("/", fetchAllTasks);
taskRouter.get("/:id", fetchTask);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;