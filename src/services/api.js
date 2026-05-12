import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

export const productAPI = {
  getAll: (params = {}) =>
    api.get("/products", {
      params: {
        search: params.search || "",
        page: params.page || 1,
        limit: params.limit || 10,
      },
    }),

  getById: (id) => api.get(`/products/${id}`),

  create: (productData) => api.post("/products", productData),

  update: (id, productData) => api.put(`/products/${id}`, productData),

  delete: (id) => api.delete(`/products/${id}`),

  deleteMultiple: (productIds) =>
    api.delete("/products", { data: { ids: productIds } }),
};
