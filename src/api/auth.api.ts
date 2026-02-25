import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const login = (data: { email: string; password: string }) => {
  return api.post(ENDPOINTS.AUTH.LOGIN, data);
};

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post(ENDPOINTS.AUTH.REGISTER, data);
};
