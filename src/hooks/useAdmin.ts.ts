import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminLedgerDashboard,
  getAdminPayments,
  getPaymentTrends,
  getPaymentHealth,
  getPaymentFailures,
  forceNextFailure,
} from "../api/admin.api";

/* ===============================
   DASHBOARD
================================ */

export const useAdminDashboard = (params?: {
  startDate?: string;
  endDate?: string;
}) =>
  useQuery({
    queryKey: ["admin-dashboard", params],
    queryFn: () => getAdminLedgerDashboard(params),
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
