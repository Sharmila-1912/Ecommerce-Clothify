import express from "express";
import { placeOrder, trackOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/:id", authMiddleware, trackOrder);

export default router;
