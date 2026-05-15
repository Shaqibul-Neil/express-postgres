import express from "express";
import cors from "cors";
import router from "./app/routes";
import type { TRequest, TResponse } from "./shared/types/express.types";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app = express();

// Parsers
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Application Routes
app.use("/api", router);

app.get("/", (req: TRequest, res: TResponse) => {
  res.send("Welcome to Server");
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Route
app.use((req: TRequest, res: TResponse) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
  });
});

export default app;
