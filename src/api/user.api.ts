import { ApiResponse } from "../types/api";
import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export const getUserDashboard = (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  return api.get(ENDPOINTS.USER.DASHBOARD, { params });
};

export const getUserGroups = (status?: string) => {
  return api.get(ENDPOINTS.USER.GROUPS, {
    params: { status },
  });
};

export const getProfile = async (): Promise<ApiResponse<UserProfile>> => {
  const response = await api.get<ApiResponse<UserProfile>>(ENDPOINTS.USER.ME);

  return response.data;
};
