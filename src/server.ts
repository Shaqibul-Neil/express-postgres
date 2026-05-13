import express from "express";
import type { TApplication, TRequest, TResponse } from "./types/types";
import { Pool } from "pg";
import config from "./config";

const app: TApplication = express();
const port = config.port || 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: config.connectionString,
});

//DB Connection
const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(10) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        age INT,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );

        `);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

initDB();

app.get("/", (req: TRequest, res: TResponse) => {
  res.status(200).json({
    message: "Express Server with postgres",
    author: "Shaqibul Islam",
  });
});

//POST users
app.post("/api/users", async (req: TRequest, res: TResponse) => {
  try {
    const { name, email, password, age } = req.body;
    const result = await pool.query(
      `
      INSERT INTO users
      ( name, email, password, age) 
       VALUES($1,$2,$3,$4) 
       RETURNING *
       `,
      [name, email, password, age],
    );

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

//GET users
app.get("/api/users", async (req: TRequest, res: TResponse) => {
  try {
    const result = await pool.query(
      `
        SELECT * 
        FROM users
        `,
    );
    res.status(201).json({
      success: true,
      message: "User fetched Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

//GET single users
app.get("/api/users/:id", async (req: TRequest, res: TResponse) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
        SELECT * 
        FROM users 
        WHERE id=$1
        `,
      [id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

//UPDATE users
app.put("/api/users/:id", async (req: TRequest, res: TResponse) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;

  try {
    const result = await pool.query(
      `
        UPDATE users 
        SET 
        name=COALESCE($1, name), 
        password=COALESCE($2, password), 
        age=COALESCE($3, age), 
        is_active=COALESCE($4, is_active)
        WHERE ID=$5 RETURNING * 
        `,
      [name, password, age, is_active, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }
    res.status(201).json({
      success: true,
      message: "User updated Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

//DELETE users
app.delete("/api/users/:id", async (req: TRequest, res: TResponse) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
        DELETE 
        FROM users 
        WHERE id=$1 RETURNING *
        `,
      [id],
    );
    console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }
    res.status(201).json({
      success: true,
      message: "User deleted Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
