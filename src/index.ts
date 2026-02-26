import express from "express";
import dotenv from "dotenv";
import taskRouter from "./routes/todoRoutes";
import { connectDatabase } from "./config/db";

dotenv.config();

const app = express();

app.use(express.json());

// 👇 Root route for evaluators
app.get("/", (_req, res) => {
  res.send(`
    <h2>Todo API is Running 🚀</h2>
    <p>To view todos, visit:</p>
    <a href="/todos">/todos</a>
  `);
});

app.use("/todos", taskRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI as string;

async function startApplication() {
  await connectDatabase(MONGO_URI);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startApplication();