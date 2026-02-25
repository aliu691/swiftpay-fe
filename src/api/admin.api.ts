import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const getAdminDashboard = (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  return api.get(ENDPOINTS.ADMIN.DASHBOARD, { params });
};

export const getLedgerEntries = (params?: any) => {
  return api.get(ENDPOINTS.ADMIN.LEDGER_ENTRIES, { params });
};

export const reconcile = (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  return api.get(ENDPOINTS.ADMIN.RECONCILE, { params });
};
