import api from "./axios";
import { ENDPOINTS } from "./endpoints";

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
