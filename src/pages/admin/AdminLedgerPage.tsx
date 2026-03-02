import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAdminDashboard,
  useAdminLedgerSummary,
  useAdminLedgerReconciliation,
  useAdminLedgerEntries,
} from "../../hooks/useAdmin";

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
  const queryClient = useQueryClient();

  const [range, setRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  /* =============================
     FETCH DATA
  ============================== */

  const { data: dashboard, isLoading: dashboardLoading } =
    useAdminDashboard(range);

  const { data: summary, isLoading: summaryLoading } = useAdminLedgerSummary();

  const {
    data: reconciliation,
    isLoading: reconciliationLoading,
    isFetching: reconciliationFetching,
    refetch: refetchReconciliation,
  } = useAdminLedgerReconciliation(range);

  const { data: entriesData, isLoading: entriesLoading } =
    useAdminLedgerEntries({
      page: 1,
      limit: 5,
    });

  /* =============================
     DERIVED DATA
  ============================== */

  const ledgerData = dashboard?.data;
  const balances = summary?.data?.balances ?? {};
  const entries = entriesData?.data?.data ?? [];

  const reconciliationResult = reconciliation?.data;

  /* =============================
     HANDLE MANUAL RECONCILIATION
  ============================== */

  const handleReconcile = async () => {
    await refetchReconciliation();

    // Invalidate anything that may have changed
    queryClient.invalidateQueries({ queryKey: ["admin-ledger-summary"] });
    queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
  };

  /* =============================
     LOADING FLAGS
  ============================== */

  const summarySectionLoading = dashboardLoading || !ledgerData;
  const balancesSectionLoading = summaryLoading;
  const reconciliationSectionLoading =
    reconciliationLoading && !reconciliationResult;

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
      {summarySectionLoading ? (
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
        {balancesSectionLoading ? (
          <LedgerBalancesSkeleton />
        ) : (
          <LedgerBalancesCard balances={balances} />
        )}

        {reconciliationSectionLoading ? (
          <LedgerReconciliationSkeleton />
        ) : (
          <LedgerReconciliationCard
            balanced={reconciliationResult?.balanced ?? false}
            platformCash={reconciliationResult?.platformCash ?? 0}
            totalGroupLiabilities={
              reconciliationResult?.totalGroupLiabilities ?? 0
            }
            onRefetch={handleReconcile}
            loading={reconciliationFetching}
          />
        )}
      </div>

      {/* =============================
         ENTRIES PREVIEW
      ============================== */}
      {entriesLoading ? (
        <LedgerEntriesPreviewSkeleton />
      ) : (
        <LedgerEntriesPreview entries={entries} />
      )}
    </div>
  );
}
