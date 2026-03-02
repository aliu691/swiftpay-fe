import { useState } from "react";
import {
  useAdminLedgerSummary,
  useAdminLedgerEntries,
} from "../../hooks/useAdmin";

import DateRangeFilter from "../../components/DateRangeFilter";
import PerformanceCard from "../../components/admin/PerformanceCard";
import PerformanceCardSkeleton from "../../components/admin/skeletons/PerformanceCardSkeleton";
import LedgerEntriesTable from "../../components/admin/LedgerEntriesTable";
import LedgerEntriesTableSkeleton from "../../components/admin/skeletons/LedgerEntriesTableSkeleton";

import { Wallet, ClipboardList, DollarSign, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLedgerHistoricalPage() {
  const navigate = useNavigate();

  const [range, setRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const [page, setPage] = useState(1);

  /* =============================
     SUMMARY
  ============================== */

  const { data: summary, isLoading: summaryLoading } = useAdminLedgerSummary();

  const balances = summary?.data?.balances ?? {};
  const totalTransactions = summary?.data?.totalTransactions ?? 0;

  const platformCash = balances.PLATFORM_CASH ?? 0;

  const totalGroupLiabilities = Object.entries(balances)
    .filter(([key]) => key.startsWith("GROUP_POOL"))
    .reduce((acc, [, value]) => acc + Number(value), 0);

  /* =============================
     ENTRIES
  ============================== */

  const { data: entriesData, isLoading: entriesLoading } =
    useAdminLedgerEntries({
      page,
      limit: 20,
      ...range,
    });

  const response = entriesData?.data;
  const entries = response?.data ?? [];
  const meta = response?.meta;

  return (
    <div className="space-y-10">
      {/* =============================
         BREADCRUMB
      ============================== */}
      <button
        onClick={() => navigate("/admin/ledger")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
      >
        <ChevronLeft size={16} />
        Back to Ledger Summary
      </button>

      {/* =============================
         HEADER
      ============================== */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Historical Ledger Entries
        </h1>

        <DateRangeFilter
          appliedRange={range}
          onApply={(r) => {
            setPage(1); // reset pagination when filter changes
            setRange(r);
          }}
          onClear={() => {
            setPage(1);
            setRange({});
          }}
        />
      </div>

      {/* =============================
         METRIC CARDS
      ============================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryLoading ? (
          <>
            <PerformanceCardSkeleton />
            <PerformanceCardSkeleton />
            <PerformanceCardSkeleton />
          </>
        ) : (
          <>
            <PerformanceCard
              title="Platform Cash"
              value={platformCash}
              prefix="₦"
              icon={<Wallet size={18} className="text-blue-600" />}
            />

            <PerformanceCard
              title="Total Transactions"
              value={totalTransactions}
              icon={<ClipboardList size={18} className="text-blue-600" />}
            />

            <PerformanceCard
              title="Total Group Liabilities"
              value={totalGroupLiabilities}
              prefix="₦"
              highlight="red"
              icon={<DollarSign size={18} className="text-red-600" />}
            />
          </>
        )}
      </div>

      {/* =============================
         TABLE
      ============================== */}
      {entriesLoading ? (
        <LedgerEntriesTableSkeleton />
      ) : (
        <LedgerEntriesTable
          entries={entries}
          meta={meta}
          page={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
