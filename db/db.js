import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB,
  port: process.env.SQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const connectDB = async () => {
  try {
    const connection = await db.getConnection();
    console.log("DB connected successfully");
    connection.release();
  } catch (err) {
    console.error("DB connection failed", err);
  }
};

export default db;
