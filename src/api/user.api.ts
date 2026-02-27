import { ApiResponse } from "../types/api";
import api from "./axios";
import { ENDPOINTS } from "./endpoints";

/* ======================
   TYPES
====================== */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface UserDashboardData {
  totalDonated: number;
  successfulContributions: number;
  failedContributions: number;
  totalGroupsJoined: number;
  activeGroups: number;
  completedGroups: number;
  disbursedGroups: number;
  groupsCreated: number;
}

/* ======================
   DASHBOARD
====================== */

export const getUserDashboard = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<ApiResponse<UserDashboardData>> => {
  const response = await api.get<ApiResponse<UserDashboardData>>(
    ENDPOINTS.USER.DASHBOARD,
    { params }
  );

  return response.data;
};

/* ======================
   GROUPS
====================== */

export const getUserGroups = (status?: string) => {
  return api.get(ENDPOINTS.USER.GROUPS, {
    params: { status },
  });
};

/* ======================
   PROFILE
====================== */

export const getProfile = async (): Promise<ApiResponse<UserProfile>> => {
  const response = await api.get<ApiResponse<UserProfile>>(ENDPOINTS.USER.ME);

  return response.data;
};
