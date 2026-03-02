import { CheckCircle2, AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  balanced: boolean;
  platformCash: number;
  totalGroupLiabilities: number;
  onRefetch: () => void;
  loading?: boolean;
}

export default function LedgerReconciliationCard({
  balanced,
  platformCash,
  totalGroupLiabilities,
  onRefetch,
  loading,
}: Props) {
  return (
    <div
      className={`rounded-2xl border p-10 shadow-sm text-center transition
        ${
          balanced ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
        }`}
    >
      <div
        className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-md
          ${balanced ? "bg-green-500" : "bg-red-500"}`}
      >
        {balanced ? (
          <CheckCircle2 className="text-white" size={32} />
        ) : (
          <AlertTriangle className="text-white" size={32} />
        )}
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        {balanced ? "Ledger is Balanced" : "Ledger Imbalance Detected"}
      </h2>

      <div className="flex justify-center gap-10 mb-8 text-sm text-gray-700">
        <div>
          <p className="font-medium">Platform Cash</p>
          <p className="text-lg font-semibold">
            ₦{platformCash.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="font-medium">Total Liabilities</p>
          <p className="text-lg font-semibold">
            ₦{totalGroupLiabilities.toLocaleString()}
          </p>
        </div>
      </div>

      <button
        onClick={onRefetch}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:opacity-95 transition disabled:opacity-50"
      >
        <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
        Trigger Manual Reconciliation
      </button>
    </div>
  );
}
