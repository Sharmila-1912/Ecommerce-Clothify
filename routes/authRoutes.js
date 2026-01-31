import express from "express";
import { register, login } from "../controllers/authController.js";
import { deleteUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.delete("/delete/:id", authMiddleware, deleteUser);

export default router;
