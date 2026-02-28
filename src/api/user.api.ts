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

export type GroupStatus = "active" | "completed" | "disbursed";

export interface UserGroup {
  id: string;
  name: string;
  targetAmount: number;
  status: GroupStatus;
  createdBy: {
    id: string;
    name: string;
  };
  completedAt?: string;
  disbursedAt?: string;
}

export interface UserGroupsResponse {
  total: number;
  groups: UserGroup[];
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

export const getUserGroups = async (
  status?: GroupStatus
): Promise<ApiResponse<UserGroupsResponse>> => {
  const response = await api.get<ApiResponse<UserGroupsResponse>>(
    ENDPOINTS.USER.GROUPS,
    {
      params: status ? { status: status.toUpperCase() } : undefined,
    }
  );

  return response.data;
};

/* ======================
   PROFILE
====================== */

export const getProfile = async (): Promise<ApiResponse<UserProfile>> => {
  const response = await api.get<ApiResponse<UserProfile>>(ENDPOINTS.USER.ME);

  return response.data;
};
