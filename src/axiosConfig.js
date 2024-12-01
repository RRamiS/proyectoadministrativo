import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const useApiClient = () => {
  const { getAccessTokenSilently } = useAuth0();

  const apiClient = axios.create({
    baseURL: "https://admapi-production.up.railway.app/", // Cambia esto a la URL de tu backend
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
      console.error("Error al obtener el token de acceso:", error);
    }
    return config;
  });

  return apiClient;
};

export default useApiClient;
