import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAdminPayments } from "../../hooks/useAdmin.ts";
import DateRangeFilter from "../../components/DateRangeFilter";
import CustomDropdown from "../../components/ui/CustomDropdown";
import AnimatedNumber from "../../components/dashboard/AnimatedNumber.js";

export default function AdminPaymentsPage() {
  /* =============================
     FILTER STATE
  ============================== */

  const [draftFilters, setDraftFilters] = useState<{
    startDate?: string;
    endDate?: string;
    status?: string;
  }>({});

  const [appliedFilters, setAppliedFilters] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useAdminPayments(appliedFilters);

  const response = data?.data;
  const payments = response?.data ?? [];
  const meta = response?.meta;

  /* =============================
     HANDLERS
  ============================== */

  const handleApplyFilters = () => {
    setAppliedFilters((prev) => ({
      ...prev,
      ...draftFilters,
      page: 1,
    }));
  };

  const handleReset = () => {
    setDraftFilters({});
    setAppliedFilters({
      page: 1,
      limit: 10,
    });
  };

  const handlePageChange = (page: number) => {
    setAppliedFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  /* =============================
     STATUS BADGE
  ============================== */

  const renderStatusBadge = (status: string) => {
    const styles =
      status === "success"
        ? "bg-green-100 text-green-600"
        : status === "failed"
        ? "bg-red-100 text-red-600"
        : "bg-yellow-100 text-yellow-700";

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-10">
      {/* =============================
         HEADER
      ============================== */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Payment Management
          </h1>
          <p className="text-gray-500 mt-2">
            Monitor and manage all transactions across the platform.
          </p>
        </div>
      </div>

      {/* =============================
   FILTER + TOTAL BLOCK
============================== */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* FILTER CARD */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
            {/* STATUS */}
            <CustomDropdown
              label="Status"
              value={draftFilters.status}
              placeholder="All Statuses"
              onChange={(val) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  status: val || undefined,
                }))
              }
              options={[
                { label: "All Statuses", value: "" },
                { label: "Success", value: "success" },
                { label: "Failed", value: "failed" },
                { label: "Initiated", value: "initiated" },
              ]}
            />

            {/* DATE RANGE */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date Range
              </label>

              <DateRangeFilter
                appliedRange={draftFilters}
                onApply={(range) =>
                  setDraftFilters((prev) => ({ ...prev, ...range }))
                }
                onClear={() => setDraftFilters({})}
              />
            </div>

            {/* APPLY */}
            <div className="space-y-2">
              <div className="h-[22px]" /> {/* fake label spacer */}
              <button
                onClick={handleApplyFilters}
                className="h-[52px] bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-6 text-sm font-semibold shadow-md hover:opacity-95 transition"
              >
                Apply Filters
              </button>
            </div>

            {/* RESET */}
            <div className="space-y-2">
              <div className="h-[22px]" />
              <button
                onClick={handleReset}
                className="h-[52px] border border-gray-300 rounded-xl px-6 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* TOTAL PAYMENTS CARD */}
        <div className="bg-white rounded-2xl border-l-4 border-blue-600 p-8 shadow-sm flex flex-col justify-center">
          <p className="text-sm text-gray-500 mb-3">Total Payments</p>

          <p className="text-4xl font-bold text-gray-900">
            <AnimatedNumber value={meta?.totalRecords ?? 0} />
          </p>
        </div>
      </div>

      {/* =============================
         TABLE
      ============================== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-8 py-4 text-left">Reference</th>
              <th className="px-8 py-4 text-left">User Email</th>
              <th className="px-8 py-4 text-left">Group ID</th>
              <th className="px-8 py-4 text-left">Amount (NGN)</th>
              <th className="px-8 py-4 text-left">Status</th>
              <th className="px-8 py-4 text-left">Reason / Details</th>
              <th className="px-8 py-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-20 text-center text-gray-400">
                  Loading payments...
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-20 text-center text-gray-400">
                  No transactions found.
                </td>
              </tr>
            ) : (
              payments.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-8 py-5 font-medium text-gray-900">
                    {item.reference}
                  </td>

                  <td className="px-8 py-5 text-gray-700">{item.userEmail}</td>

                  <td className="px-8 py-5 text-gray-400">{item.groupId}</td>

                  <td className="px-8 py-5 font-semibold text-gray-900">
                    ₦{item.amount.toLocaleString()}
                  </td>

                  <td className="px-8 py-5">
                    {renderStatusBadge(item.status)}
                  </td>

                  <td className="px-8 py-5 text-gray-500">
                    {item.failureReason ?? "-"}
                  </td>

                  <td className="px-8 py-5 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* =============================
           PAGINATION
        ============================== */}
        {meta && (
          <div className="flex justify-between items-center px-8 py-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold">
                {(meta.currentPage - 1) * meta.pageSize + 1}
              </span>{" "}
              –
              <span className="font-semibold">
                {" "}
                {Math.min(meta.currentPage * meta.pageSize, meta.totalRecords)}
              </span>{" "}
              of <span className="font-semibold">{meta.totalRecords}</span>{" "}
              records
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={!meta.hasPreviousPage}
                onClick={() => handlePageChange(meta.currentPage - 1)}
                className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40"
              >
                Prev
              </button>

              <button
                disabled={!meta.hasNextPage}
                onClick={() => handlePageChange(meta.currentPage + 1)}
                className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
