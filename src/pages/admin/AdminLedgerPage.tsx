import { useState } from "react";
import { useAdminDashboard } from "../../hooks/useAdmin";
import DateRangeFilter from "../../components/DateRangeFilter";

import LedgerSummary from "../../components/admin/LedgerSummary";
import LedgerSummarySkeleton from "../../components/admin/skeletons/LedgerSummarySkeleton";

import LedgerReconciliationCard from "../../components/admin/LedgerReconciliationCard";
import LedgerReconciliationSkeleton from "../../components/admin/skeletons/LedgerReconciliationSkeleton";

import LedgerBalancesCard from "../../components/admin/LedgerBalancesCard";
import LedgerBalancesSkeleton from "../../components/admin/skeletons/LedgerBalancesSkeleton";

import LedgerEntriesPreview from "../../components/admin/LedgerEntriesPreview";
import LedgerEntriesPreviewSkeleton from "../../components/admin/skeletons/LedgerEntriesPreviewSkeleton";

export default function AdminLedgerPage() {
  const [range, setRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const { data: ledger, isLoading } = useAdminDashboard(range);
  const ledgerData = ledger?.data;

  return (
    <div className="space-y-10">
      {/* =============================
         HEADER
      ============================== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Ledger Management
          </h1>
          <p className="text-gray-500 mt-2">
            Financial oversight and system reconciliation
          </p>
        </div>

        <DateRangeFilter
          appliedRange={range}
          onApply={setRange}
          onClear={() => setRange({})}
        />
      </div>

      {/* =============================
         LEDGER SUMMARY
      ============================== */}
      {isLoading || !ledgerData ? (
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

      {/* =============================
         BALANCES + RECONCILIATION
      ============================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <LedgerBalancesSkeleton />
            <LedgerReconciliationSkeleton />
          </>
        ) : (
          <>
            <LedgerBalancesCard />
            <LedgerReconciliationCard
              startDate={range.startDate}
              endDate={range.endDate}
            />
          </>
        )}
      </div>

      {/* =============================
         ENTRIES PREVIEW
      ============================== */}
      {isLoading ? <LedgerEntriesPreviewSkeleton /> : <LedgerEntriesPreview />}
    </div>
  );
}
