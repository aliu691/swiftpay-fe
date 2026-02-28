import { ApiResponse } from "../types/api";
import api from "./axios";
import { ENDPOINTS } from "./endpoints";

/* ======================
   TYPES
====================== */

export interface VerifyPaymentData {
  groupId: string;
  status: "initiated" | "success" | "failed";
}

/* ======================
   PAYMENT ACTIONS
====================== */

export const verifyPayment = async (
  reference: string
): Promise<ApiResponse<VerifyPaymentData>> => {
  const response = await api.get<ApiResponse<VerifyPaymentData>>(
    ENDPOINTS.PAYMENTS.VERIFY(reference)
  );

  return response.data;
};
