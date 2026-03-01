import { useState } from "react";
import {
  useAdminDashboard,
  usePaymentFailures,
  usePaymentHealth,
  usePaymentTrends,
} from "../../hooks/useAdmin.ts";

import DateRangeFilter from "../../components/DateRangeFilter";
import IncidentCard from "../../components/admin/IncidentAlert";
import PerformanceCard from "../../components/admin/PerformanceCard";
import PaymentTrendsChart from "../../components/admin/PaymentTrendsChart";
import LedgerSummary from "../../components/admin/LedgerSummary";
import LatestFailedPaymentsTable from "../../components/admin/LatestFailedPaymentsTable";

import PerformanceCardSkeleton from "../../components/admin/skeletons/PerformanceCardSkeleton";
import LedgerSummarySkeleton from "../../components/admin/skeletons/LedgerSummarySkeleton";
import PaymentTrendsChartSkeleton from "../../components/admin/skeletons/PaymentTrendsChartSkeleton";
import LatestFailedPaymentsTableSkeleton from "../../components/admin/skeletons/LatestFailedPaymentsTableSkeleton";
import IncidentCardSkeleton from "../../components/admin/skeletons/IncidentCardSkeleton";

import { AlertCircle, Banknote, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [range, setRange] = useState({});
  const navigate = useNavigate();

  const { data: ledger, isLoading: ledgerLoading } = useAdminDashboard(range);

  const { data: health, isLoading: healthLoading } = usePaymentHealth(range);

  const { data: trends, isLoading: trendsLoading } = usePaymentTrends(7);

  const { data: failures, isLoading: failuresLoading } = usePaymentFailures({
    includeTransactions: true,
  });

  const healthData = health?.data;
  const ledgerData = ledger?.data;
  const trendsData = trends?.data;

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Payment Performance
          </h1>
          <p className="text-gray-500 mt-2">
            Monitor real time payment ecosystem health
          </p>
        </div>

        <DateRangeFilter
          appliedRange={range}
          onApply={setRange}
          onClear={() => setRange({})}
        />
      </div>

      {/* =========================
          METRIC CARDS
      ========================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {healthLoading || !healthData ? (
          <>
            <PerformanceCardSkeleton />
            <PerformanceCardSkeleton />
            <PerformanceCardSkeleton />
            <PerformanceCardSkeleton />
          </>
        ) : (
          <>
            <PerformanceCard
              title="Total Attempts"
              value={healthData.totalAttempts}
              highlight="blue"
              icon={<Banknote className="text-blue-600" />}
            />

            <PerformanceCard
              title="Successful Payments"
              value={healthData.successful}
              highlight="green"
              icon={<CheckCircle2 className="text-green-600" />}
            />

            <PerformanceCard
              title="Failed Payments"
              value={healthData.failed}
              highlight="red"
              icon={<AlertCircle className="text-red-600" />}
            />

            <PerformanceCard
              title="Success Rate"
              value={healthData.successRate ?? 0}
              suffix="%"
              progress={healthData.successRate ?? 0}
              subtitle="Threshold: 85% required for SLA"
            />
          </>
        )}
      </div>

      {/* =========================
          CHART + INCIDENT
      ========================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {trendsLoading || !trendsData ? (
            <PaymentTrendsChartSkeleton />
          ) : (
            <PaymentTrendsChart data={trendsData.data} />
          )}
        </div>

        {trendsLoading || !trendsData ? (
          <IncidentCardSkeleton />
        ) : (
          <IncidentCard
            incident={trendsData.incident}
            drop={trendsData.dropPercentage}
            today={trendsData.comparison.today}
            yesterday={trendsData.comparison.yesterday}
          />
        )}
      </div>

      {/* =========================
          LEDGER SUMMARY
      ========================== */}
      {ledgerLoading || !ledgerData ? (
        <LedgerSummarySkeleton />
      ) : (
        <LedgerSummary
          totalContributions={ledgerData.totalContributions}
          totalPayoutAmount={ledgerData.totalPayoutAmount}
          successRate={ledgerData.successRate ?? 0}
          statusCounters={{
            active: ledgerData.activeGroups,
            completed: ledgerData.completedGroups,
            disbursed: ledgerData.disbursedGroups,
          }}
        />
      )}

      {/* =========================
          FAILED PAYMENTS
      ========================== */}
      {failuresLoading ? (
        <LatestFailedPaymentsTableSkeleton />
      ) : (
        <LatestFailedPaymentsTable
          transactions={failures?.data?.transactions ?? []}
          onViewAll={() => navigate("/admin/payments?status=failed")}
        />
      )}
    </div>
  );
}
