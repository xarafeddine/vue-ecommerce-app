import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getProducts() {
    return apiClient.get("/products");
  },
  getProduct(id) {
    return apiClient.get(`/products/${id}`);
  },
  getCategories() {
    return apiClient.get("/products/categories");
  },
  getCategory(id) {
    return apiClient.get(`/carts/${id}`);
  },
};
