import { addProduct, getProducts } from "../models/productModel.js";

export const createProduct = async (req, res) => {
  await addProduct(req.body);
  res.json({ message: "Product added" });
};

export const fetchProducts = async (req, res) => {
  const products = await getProducts(req.query);
  res.json(products);
};
