import db from "../db/db.js";

export const createOrder = async (userId) => {
  const [result] = await db.query(
    "INSERT INTO orders (user_id) VALUES (?)",
    [userId]
  );
  return result.insertId;
};

export const addOrderItem = async (item) => {
  await db.query(
    "INSERT INTO order_items (order_id,product_id,size,color,quantity) VALUES (?,?,?,?,?)",
    [
      item.orderId,
      item.productId,
      item.size,
      item.color,
      item.quantity
    ]
  );
};

export const getOrderById = async (orderId) => {
  const [rows] = await db.query(
    `SELECT o.id,o.status,oi.product_id,oi.size,oi.color,oi.quantity
     FROM orders o
     JOIN order_items oi ON o.id=oi.order_id
     WHERE o.id=?`,
    [orderId]
  );
  return rows;
};
