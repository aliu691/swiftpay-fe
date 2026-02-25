import { ApiResponse } from "../types/api";
import api from "./axios";
import { ENDPOINTS } from "./endpoints";

/* ======================
   PAYLOADS
====================== */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RequestResetPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

/* ======================
   RESPONSES
====================== */

interface AuthResponse {
  accessToken: string;
}

/* ======================
   LOGIN
====================== */

export const login = async (
  data: LoginPayload
): Promise<ApiResponse<AuthResponse>> => {
  const response = await api.post<ApiResponse<AuthResponse>>(
    ENDPOINTS.AUTH.LOGIN,
    data
  );

  return response.data;
};

/* ======================
   REGISTER
====================== */

export const register = async (
  data: RegisterPayload
): Promise<ApiResponse<AuthResponse>> => {
  const response = await api.post<ApiResponse<AuthResponse>>(
    ENDPOINTS.AUTH.REGISTER,
    data
  );

  return response.data;
};

/* ======================
   REQUEST RESET
====================== */

export const requestPasswordReset = async (
  data: RequestResetPayload
): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(
    ENDPOINTS.AUTH.REQUEST_RESET,
    data
  );

  return response.data;
};

/* ======================
   RESET PASSWORD
====================== */

export const resetPassword = async (
  data: ResetPasswordPayload
): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(
    ENDPOINTS.AUTH.RESET_PASSWORD,
    data
  );

  return response.data;
};
