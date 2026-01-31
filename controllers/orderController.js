import { createOrder, addOrderItem, getOrderById } from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  const orderId = await createOrder(req.user.id);

  for (let item of req.body.items) {
    await addOrderItem({ ...item, orderId });
  }

  res.json({ message: "Order placed", orderId });
};

export const trackOrder = async (req, res) => {
  const order = await getOrderById(req.params.id);
  res.json(order);
};
