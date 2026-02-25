import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const createGroup = (data: any) => {
  return api.post(ENDPOINTS.GROUP.CREATE, data);
};

export const getGroupDetails = (id: string) => {
  return api.get(ENDPOINTS.GROUP.DETAILS(id));
};

export const contribute = (id: string, amount: number) => {
  return api.post(ENDPOINTS.GROUP.CONTRIBUTE(id), { amount });
};

export const payoutGroup = (id: string) => {
  return api.post(ENDPOINTS.GROUP.PAYOUT(id));
};
