import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

import LatestFailedPaymentsTable from "../../components/admin/LatestFailedPaymentsTable";
import LatestFailedPaymentsTableSkeleton from "../../components/admin/skeletons/LatestFailedPaymentsTableSkeleton";
import DateRangeFilter from "../../components/DateRangeFilter";
import CustomDropdown from "../../components/ui/CustomDropdown";

import { usePaymentFailures, useForceFailure } from "../../hooks/useAdmin.ts";
import AnimatedNumber from "../../components/dashboard/AnimatedNumber";

export default function FailedPaymentsReport() {
  const navigate = useNavigate();

  /* =============================
     FILTER STATE
  ============================== */

  const [draftFilters, setDraftFilters] = useState<{
    startDate?: string;
    endDate?: string;
    failureReason?: string;
  }>({});

  const [appliedFilters, setAppliedFilters] = useState({});

  /* =============================
     FAILURE SIMULATION STATE
  ============================== */

  const [simulationReason, setSimulationReason] =
    useState<string>("WEBHOOK_TIMEOUT");

  const { mutate: simulateFailure, isPending: isSimulating } =
    useForceFailure();

  /* =============================
     DATA
  ============================== */

  const { data, isLoading } = usePaymentFailures({
    ...appliedFilters,
    includeTransactions: true,
  });

  const response = data?.data;
  const totalFailed = response?.totalFailed ?? 0;
  const isHighVolume = totalFailed >= 5;

  /* =============================
     HANDLERS
  ============================== */

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const handleSimulateFailure = () => {
    simulateFailure(simulationReason, {
      onSuccess: () => {
        toast.success(`Next transaction will fail with ${simulationReason}`);
      },
      onError: () => {
        toast.error("Failed to schedule simulation");
      },
    });
  };

  return (
    <div className="space-y-10">
      {/* =============================
         BREADCRUMB
      ============================== */}
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
      >
        <ChevronLeft size={16} />
        Back to Dashboard
      </button>

      {/* =============================
         HEADER
      ============================== */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Failed Payments Report
          </h1>
          <p className="text-gray-500 mt-2">
            Review and manage transaction failures across your platform.
          </p>
        </div>

        {/* Simulation Control */}
        <div className="flex items-center gap-4">
          <div className="w-64">
            <CustomDropdown
              value={simulationReason}
              onChange={(val) => setSimulationReason(val)}
              options={[
                { label: "WEBHOOK_TIMEOUT", value: "WEBHOOK_TIMEOUT" },
                { label: "BANK_DECLINED", value: "BANK_DECLINED" },
                {
                  label: "FAILED_AUTHORIZATION",
                  value: "FAILED_AUTHORIZATION",
                },
                { label: "PSP_TIMEOUT", value: "PSP_TIMEOUT" },
                { label: "SIGNATURE_INVALID", value: "SIGNATURE_INVALID" },
                {
                  label: "OVERFUNDING_BLOCKED",
                  value: "OVERFUNDING_BLOCKED",
                },
              ]}
            />
          </div>

          <button
            onClick={handleSimulateFailure}
            disabled={isSimulating}
            className={`h-[52px] px-6 rounded-xl text-sm font-semibold shadow-md transition flex items-center gap-2
              ${
                isSimulating
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:opacity-95"
              }`}
          >
            <AlertTriangle size={16} />
            {isSimulating ? "Scheduling..." : "Simulate Next Failure"}
          </button>
        </div>
      </div>

      {/* =============================
         FILTER BLOCK
      ============================== */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Card */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* DATE RANGE */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date Range
              </label>

              <div className="h-[52px]">
                <DateRangeFilter
                  appliedRange={draftFilters}
                  onApply={(range) =>
                    setDraftFilters((prev) => ({ ...prev, ...range }))
                  }
                  onClear={() => setDraftFilters({})}
                />
              </div>
            </div>

            {/* FAILURE REASON FILTER */}
            <CustomDropdown
              label="Failure Reason"
              value={draftFilters.failureReason}
              placeholder="All Reasons"
              onChange={(val) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  failureReason: val || undefined,
                }))
              }
              options={[
                { label: "All Reasons", value: "" },
                { label: "WEBHOOK_TIMEOUT", value: "WEBHOOK_TIMEOUT" },
                { label: "BANK_DECLINED", value: "BANK_DECLINED" },
                {
                  label: "FAILED_AUTHORIZATION",
                  value: "FAILED_AUTHORIZATION",
                },
                { label: "PSP_TIMEOUT", value: "PSP_TIMEOUT" },
                { label: "SIGNATURE_INVALID", value: "SIGNATURE_INVALID" },
                {
                  label: "OVERFUNDING_BLOCKED",
                  value: "OVERFUNDING_BLOCKED",
                },
              ]}
            />

            {/* BUTTON GROUP */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleApplyFilters}
                className="h-[52px] flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-6 text-sm font-semibold shadow-md hover:opacity-95 transition"
              >
                Apply Filters
              </button>

              <button
                onClick={() => {
                  setDraftFilters({});
                  setAppliedFilters({});
                }}
                className="h-[52px] px-5 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* TOTAL FAILED CARD */}
        <div className="bg-white rounded-2xl border-l-4 border-red-500 p-8 shadow-sm">
          <p className="text-sm text-gray-500 mb-2">Total Failed</p>

          <p className="text-4xl font-bold text-gray-900">
            <AnimatedNumber value={totalFailed} />
          </p>

          {isHighVolume && (
            <span className="inline-block mt-3 text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
              High volume
            </span>
          )}
        </div>
      </div>

      {/* =============================
         TABLE
      ============================== */}
      {isLoading ? (
        <LatestFailedPaymentsTableSkeleton />
      ) : (
        <LatestFailedPaymentsTable
          transactions={response?.transactions ?? []}
        />
      )}

      {/* =============================
         HELP SECTION
      ============================== */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-sm text-blue-800">
        <p className="font-semibold mb-1">
          Need help troubleshooting these failures?
        </p>
        <p>
          Review our{" "}
          <span className="underline cursor-pointer">
            Transaction Integration Guide
          </span>{" "}
          or contact support if errors persist across multiple gateways.
        </p>
      </div>
    </div>
  );
}
