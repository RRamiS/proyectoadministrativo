import axios from "axios";
import { getAccessTokenSilently } from "@auth0/auth0-react";

const apiClient = axios.create({
  baseURL: "http://localhost:5000", // Cambia esto a tu baseURL
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await getAccessTokenSilently();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error al obtener el token de acceso", error);
  }
  return config;
});

export default apiClient;
