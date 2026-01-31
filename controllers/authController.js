// import bcrypt from "bcryptjs";
// import { createUser, findUserByEmail } from "../models/userModel.js";
// import { generateToken } from "../utils/generateToken.js";
// import { deleteUserById } from "../models/userModel.js";

// export const register = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);
//   await createUser({ name, email, password: hashedPassword, role });

//   res.json({ message: "User registered successfully" });
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await findUserByEmail(email);
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//   const token = generateToken(user);
//   res.json({ token, role: user.role });
// };


// export const deleteUser = async (req, res) => {
//   const userId = req.params.id;

//   if (req.user.role !== "ADMIN" && req.user.id != userId) {
//     return res.status(403).json({ message: "Unauthorized" });
//   }

//   await deleteUserById(userId);
//   res.json({ message: "User deleted successfully" });
// };



import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, deleteUserById } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ name, email, password: hashedPassword, role });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE USER (ADMIN ONLY)
export const deleteUser = async (req, res) => {
  try {
    // Only ADMIN can delete users
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Unauthorized: Only admin can delete users" });
    }

    const userId = req.params.id;

    // Optional: prevent admin from deleting themselves
    if (req.user.id === parseInt(userId)) {
      return res.status(400).json({ message: "Admin cannot delete themselves" });
    }

    await deleteUserById(userId);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
