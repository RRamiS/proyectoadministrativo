import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  return response.data;
};

export const getIngresos = async (token) => {
  const response = await axios.get(`${API_URL}/ingresos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createIngreso = async (token, ingreso) => {
  const response = await axios.post(`${API_URL}/ingresos`, ingreso, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
