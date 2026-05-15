import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  connectionString: config.connectionString,
});

export const initDB = async () => {
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
    console.log("Users table ready ✅");
    await pool.query(
      `
          CREATE TABLE IF NOT EXISTS profiles(
          id SERIAL PRIMARY KEY,
          user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
          bio TEXT, address TEXT, phoneNumber VARCHAR(11),gender VARCHAR(6),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
          )
          `,
    );
    console.log("Profiles table ready ✅");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default pool;
