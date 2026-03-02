import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminLedgerDashboard,
  getAdminPayments,
  getPaymentTrends,
  getPaymentHealth,
  getPaymentFailures,
  forceNextFailure,
  getAdminLedgerSummary,
  getAdminLedgerReconciliation,
  getAdminLedgerEntries,
} from "../api/admin.api";

/* ===============================
   LEDGER
================================ */

export const useAdminDashboard = (params?: {
  startDate?: string;
  endDate?: string;
}) =>
  useQuery({
    queryKey: ["admin-dashboard", params],
    queryFn: () => getAdminLedgerDashboard(params),
  });

export const useAdminLedgerSummary = () =>
  useQuery({
    queryKey: ["admin-ledger-summary"],
    queryFn: getAdminLedgerSummary,
  });

export const useAdminLedgerReconciliation = (params?: {
  startDate?: string;
  endDate?: string;
}) =>
  useQuery({
    queryKey: ["admin-ledger-reconcile", params],
    queryFn: () => getAdminLedgerReconciliation(params),
  });

export const useAdminLedgerEntries = (params?: {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  reference?: string;
  accountCode?: string;
}) =>
  useQuery({
    queryKey: ["admin-ledger-entries", params],
    queryFn: () => getAdminLedgerEntries(params),
    placeholderData: (previousData) => previousData,
  });

/* ===============================
   PAYMENTS
================================ */

export const useAdminPayments = (params: any) =>
  useQuery({
    queryKey: ["admin-payments", params],
    queryFn: () => getAdminPayments(params),
    placeholderData: (previousData) => previousData,
  });

/* ===============================
   TRENDS
================================ */

export const usePaymentTrends = (days: number = 7) =>
  useQuery({
    queryKey: ["admin-payment-trends", days],
    queryFn: () => getPaymentTrends(days),
  });

/* ===============================
   HEALTH
================================ */

export const usePaymentHealth = (params?: {
  startDate?: string;
  endDate?: string;
}) =>
  useQuery({
    queryKey: ["admin-payment-health", params],
    queryFn: () => getPaymentHealth(params),
  });

/* ===============================
   FAILURES
================================ */

export const usePaymentFailures = (params?: any) =>
  useQuery({
    queryKey: ["admin-payment-failures", params],
    queryFn: () => getPaymentFailures(params),
    placeholderData: (previousData) => previousData,
  });

/* ===============================
   FORCE FAILURE
================================ */

export const useForceFailure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reason: string) => forceNextFailure(reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-payment-trends"] });
      queryClient.invalidateQueries({ queryKey: ["admin-payment-health"] });
    },
  });
};
