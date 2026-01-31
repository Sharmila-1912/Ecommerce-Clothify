import db from "../db/db.js";

export const createUser = async (user) => {
  const [result] = await db.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [user.name, user.email, user.password, user.role]
  );
  return result;
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email=?",
    [email]
  );
  return rows[0];
};

export const deleteUserById = async (id) => {
  await db.query("DELETE FROM users WHERE id=?", [id]);
};
