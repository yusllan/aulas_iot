import API from "./api";

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

export const verifyToken = async () => {
  try {
    const response = await API.get("/usuarios/verify");
    return response.data;
  } catch (error) {
    throw error;
  }
};
