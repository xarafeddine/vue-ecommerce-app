import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://unusual-blue-gaiters.cyclic.app",
  // baseURL: "http://localhost:8000",
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
  updateProduct(id, product) {
    return apiClient.put(`/products/${id}`, product);
  },
  getCategories() {
    return apiClient.get("/categories");
  },
};
