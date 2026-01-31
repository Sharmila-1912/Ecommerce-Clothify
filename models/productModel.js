import db from "../db/db.js";

export const addProduct = async (product) => {
  const [result] = await db.query(
    "INSERT INTO products (name,brand,price,sizes,colors,stock) VALUES (?,?,?,?,?,?)",
    [
      product.name,
      product.brand,
      product.price,
      product.sizes,
      product.colors,
      product.stock
    ]
  );
  return result;
};

export const getProducts = async (filters) => {
  let query = "SELECT * FROM products WHERE 1=1";
  let params = [];

  if (filters.brand) {
    query += " AND brand=?";
    params.push(filters.brand);
  }

  if (filters.minPrice && filters.maxPrice) {
    query += " AND price BETWEEN ? AND ?";
    params.push(filters.minPrice, filters.maxPrice);
  }

  const [rows] = await db.query(query, params);
  return rows;
};
