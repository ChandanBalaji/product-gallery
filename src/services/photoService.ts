import axios from "axios";
import { Product } from "../interfaces/products";

const API_URL = "https://jsonplaceholder.typicode.com/photos";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};
