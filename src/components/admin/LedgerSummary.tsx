import { Landmark } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedNumber from "../dashboard/AnimatedNumber";

interface Props {
  totalContributions: number;
  totalPayoutAmount: number;
  successRate: number;
  statusCounters: {
    active: number;
    completed: number;
    disbursed: number;
  };
}

export default function LedgerSummary({
  totalContributions,
  totalPayoutAmount,
  successRate,
  statusCounters,
}: Props) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const payoutPercentage =
    totalContributions > 0
      ? Math.round((totalPayoutAmount / totalContributions) * 100)
      : 0;

  /* ===========================
     Animate Progress Bar
  =========================== */

  useEffect(() => {
    setAnimatedProgress(0);

    const timeout = setTimeout(() => {
      setAnimatedProgress(payoutPercentage);
    }, 100);

    return () => clearTimeout(timeout);
  }, [payoutPercentage]);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Landmark className="text-blue-600" size={22} />
          <h2 className="text-xl font-semibold text-gray-800">
            Ledger Summary
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 text-gray-600 text-sm px-4 py-1.5 rounded-full">
          {/* Pulse Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          Live Updates
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* TOTAL CONTRIBUTIONS */}
        <div className="p-8">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
            Total Contributions
          </p>

          <p className="text-4xl font-bold text-gray-900">
            ₦
            <AnimatedNumber value={totalContributions} />
          </p>
        </div>

        {/* TOTAL PAYOUTS */}
        <div className="p-8">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
            Total Payouts
          </p>

          <p className="text-4xl font-bold text-gray-900">
            ₦
            <AnimatedNumber value={totalPayoutAmount} />
          </p>

          {/* Animated Progress */}
          <div className="mt-5 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${animatedProgress}%` }}
            />
          </div>
        </div>

        {/* COLLECTION SUCCESS */}
        <div className="p-8">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
            Collection Success
          </p>

          <p className="text-4xl font-bold text-blue-600">
            <AnimatedNumber value={successRate} suffix="%" />
          </p>

          <p className="text-sm text-gray-400 mt-2">Excellent performance</p>
        </div>

        {/* STATUS COUNTERS */}
        <div className="p-8">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-5">
            Status Counters
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              Active (
              <AnimatedNumber value={statusCounters.active} />)
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              Completed (
              <AnimatedNumber value={statusCounters.completed} />)
            </span>

            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              Disbursed (
              <AnimatedNumber value={statusCounters.disbursed} />)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
