import { MoreVertical, ArrowRight } from "lucide-react";
import { FailureTransaction, FailureReason } from "../../api/admin.api"; // adjust path if needed

interface Props {
  transactions: FailureTransaction[];
  onViewAll?: () => void;
}

/* =========================================
   Failure Badge Style Config
========================================= */

const FAILURE_BADGE_STYLES: Record<
  FailureReason,
  { bg: string; text: string }
> = {
  FAILED_AUTHORIZATION: {
    bg: "bg-rose-100",
    text: "text-rose-600",
  },
  WEBHOOK_TIMEOUT: {
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  SIGNATURE_INVALID: {
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  BANK_DECLINED: {
    bg: "bg-red-100",
    text: "text-red-600",
  },
  PSP_TIMEOUT: {
    bg: "bg-orange-100",
    text: "text-orange-700",
  },
  OVERFUNDING_BLOCKED: {
    bg: "bg-gray-200",
    text: "text-gray-700",
  },
};

export default function LatestFailedPaymentsTable({
  transactions,
  onViewAll,
}: Props) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`;

  const renderFailureBadge = (reason: FailureReason) => {
    const style = FAILURE_BADGE_STYLES[reason];

    return (
      <span
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide ${style.bg} ${style.text}`}
      >
        {reason}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start px-8 py-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Latest Failed Payments
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Recently blocked or declined transactions
          </p>
        </div>

        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:underline"
        >
          View All Report
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="border-t border-gray-100">
        {transactions.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            No failed payments found for this period.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-8 py-4 text-left">Date & Time</th>
                <th className="px-8 py-4 text-left">User Email</th>
                <th className="px-8 py-4 text-left">Reference</th>
                <th className="px-8 py-4 text-left">Amount</th>
                <th className="px-8 py-4 text-left">Failure Reason</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {transactions.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-8 py-5 text-gray-700 whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </td>

                  <td className="px-8 py-5 font-medium text-gray-800">
                    {item.userEmail}
                  </td>

                  <td className="px-8 py-5 text-gray-400 font-medium">
                    {item.reference}
                  </td>

                  <td className="px-8 py-5 font-semibold text-gray-900">
                    {formatCurrency(item.amount)}
                  </td>

                  <td className="px-8 py-5">
                    {renderFailureBadge(item.failureReason)}
                  </td>

                  <td className="px-8 py-5 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
