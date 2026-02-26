import mongoose, { Schema, Document } from "mongoose";

export interface ITaskDocument extends Document {
  title: string;
  dueDate: Date;
  completed: boolean;
}

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<ITaskDocument>("Todo", taskSchema);

export default TaskModel;