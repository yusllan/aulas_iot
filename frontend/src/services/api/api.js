import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/usuarios/login", { email, password });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Error en la conexión con el servidor",
      }
    );
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await API.post("/usuarios/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

const getAll = (resource) => API.get(`/${resource}`);
const getWithParams = (resource, path = "", params = {}) =>
  API.get(`/${resource}${path}`, { params });
const getSingle = (resource, id) => API.get(`/${resource}/${id}`);
const postData = (resource, data) => API.post(`/${resource}`, data);

export const api = {
  temperatura: {
    getAll: () => getAll("temperatura"),
    getByFecha: (params) => getWithParams("temperatura", "/fecha", params),
    getPromedioHoy: (fecha) =>
      getWithParams("temperatura", "/promedio-dia", { fecha }),
  },
  humedad: {
    getAll: () => getAll("humedad"),
    getByFecha: (params) => getWithParams("humedad", "/fecha", params),
    getPromedioHoy: (fecha) =>
      getWithParams("humedad", "/promedio-dia", { fecha }),
  },
  usuarios: {
    login: loginUser,
    logout: logoutUser,
    getAll: () => getAll("usuarios"),
    create: (data) => postData("usuarios", data),
  },
  postData,
};

export default API;
