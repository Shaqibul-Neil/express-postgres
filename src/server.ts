import dotenv from "dotenv";
import express from "express";
import type { TApplication, TRequest, TResponse } from "./types/types";

import { Pool } from "pg";

const app: TApplication = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", (req: TRequest, res: TResponse) => {
  res.status(200).json({
    message: "Express Server with postgres",
    author: "Shaqibul Islam",
  });
});

app.post("/", async (req: TRequest, res: TResponse) => {
  const { name, email, password } = req.body;
  res.status(201).json({
    message: "Created",
    data: {
      name,
      email,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
