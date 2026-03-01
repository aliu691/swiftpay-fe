import { ApiResponse } from "../types/api";
import api from "./axios";
import { ENDPOINTS } from "./endpoints";

/* ================================
   TYPES
================================ */

/* ---------- Payments List ---------- */

export interface AdminPayment {
  id: string;
  reference: string;
  userEmail: string;
  groupId: string;
  amount: number;
  status: "success" | "failed" | "initiated";
  failureReason: FailureReason | null;
  createdAt: string;
}

export interface PaymentsMeta {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdminPaymentsResponse {
  meta: PaymentsMeta;
  filters: {
    startDate: string | null;
    endDate: string | null;
    status?: string | null;
  };
  data: AdminPayment[];
}

/* ---------- Payment Trends ---------- */

export interface PaymentTrendItem {
  date: string;
  total: number;
  successRate: number;
}

export interface PaymentTrendsResponse {
  incident: boolean;
  dropPercentage: number;
  comparison: {
    today: number;
    yesterday: number;
  };
  data: PaymentTrendItem[];
}

/* ---------- Payment Health ---------- */

export interface PaymentHealthResponse {
  filters: {
    startDate: string | null;
    endDate: string | null;
  };
  totalAttempts: number;
  successful: number;
  failed: number;
  successRate: number;
}

/* ---------- Failures ---------- */

export interface FailureTransaction {
  id: string;
  reference: string;
  userEmail: string;
  groupId: string;
  amount: number;
  failureReason: FailureReason;
  createdAt: string;
}

export interface FailureResponse {
  filters: {
    startDate: string | null;
    endDate: string | null;
    failureReason: FailureReason | null;
  };
  totalFailed: number;
  transactions?: FailureTransaction[];
}

export type FailureReason =
  | "FAILED_AUTHORIZATION"
  | "WEBHOOK_TIMEOUT"
  | "SIGNATURE_INVALID"
  | "BANK_DECLINED"
  | "PSP_TIMEOUT"
  | "OVERFUNDING_BLOCKED";

/* ---------- Ledger Dashboard ---------- */

export interface AdminLedgerDashboard {
  filters: {
    startDate: string | null;
    endDate: string | null;
  };
  totalContributions: number;
  totalPayoutAmount: number;
  paidOutGroups: number;
  activeGroups: number;
  completedGroups: number;
  disbursedGroups: number;
  successRate: number;
}

/* ---------- Simulation ---------- */

export interface ForceFailureResponse {
  reason: string;
}

/* ================================
   API CALLS
================================ */

/* ---------- Payments ---------- */

export const getAdminPayments = async (params: {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
}): Promise<ApiResponse<AdminPaymentsResponse>> => {
  const response = await api.get<ApiResponse<AdminPaymentsResponse>>(
    ENDPOINTS.ADMIN.PAYMENTS,
    { params }
  );

  return response.data;
};

/* ---------- Trends ---------- */

export const getPaymentTrends = async (
  days: number
): Promise<ApiResponse<PaymentTrendsResponse>> => {
  const response = await api.get<ApiResponse<PaymentTrendsResponse>>(
    ENDPOINTS.ADMIN.PAYMENT_TRENDS,
    { params: { days } }
  );

  return response.data;
};

/* ---------- Health ---------- */

export const getPaymentHealth = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<ApiResponse<PaymentHealthResponse>> => {
  const response = await api.get<ApiResponse<PaymentHealthResponse>>(
    ENDPOINTS.ADMIN.PAYMENT_HEALTH,
    { params }
  );

  return response.data;
};

/* ---------- Failures ---------- */

export const getPaymentFailures = async (params?: {
  startDate?: string;
  endDate?: string;
  failureReason?: FailureReason;
  includeTransactions?: boolean;
}): Promise<ApiResponse<FailureResponse>> => {
  const response = await api.get<ApiResponse<FailureResponse>>(
    ENDPOINTS.ADMIN.PAYMENT_FAILURES,
    { params }
  );

  return response.data;
};

/* ---------- Ledger Dashboard ---------- */

export const getAdminLedgerDashboard = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<ApiResponse<AdminLedgerDashboard>> => {
  const response = await api.get<ApiResponse<AdminLedgerDashboard>>(
    ENDPOINTS.ADMIN.DASHBOARD,
    { params }
  );

  return response.data;
};

/* ---------- Force Failure Simulation ---------- */

export const forceNextFailure = async (
  reason: string
): Promise<ApiResponse<ForceFailureResponse>> => {
  const response = await api.post<ApiResponse<ForceFailureResponse>>(
    ENDPOINTS.ADMIN.FORCE_FAILURE,
    { reason }
  );

  return response.data;
};
