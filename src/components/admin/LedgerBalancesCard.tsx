import { Info } from "lucide-react";

interface Props {
  balances: Record<string, number>;
}

export default function LedgerBalancesCard({ balances }: Props) {
  const entries = Object.entries(balances);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Summary of Balances
        </h2>
        <Info size={18} className="text-gray-400" />
      </div>

      <div className="p-6 space-y-4">
        {entries.map(([code, amount]) => {
          const isPrimary = code === "PLATFORM_CASH";
          const isZero = Number(amount) === 0;

          return (
            <div
              key={code}
              className={`flex items-center justify-between rounded-2xl px-5 py-4 border
                ${
                  isPrimary
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white border-gray-100"
                }
                ${isZero ? "opacity-50" : ""}
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-2 h-10 rounded-full ${
                    isPrimary ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />

                <div>
                  {isPrimary ? (
                    <>
                      <p className="font-medium text-gray-800">Platform Cash</p>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Operational Account
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-gray-800">Group Pool</p>
                      <p className="text-xs text-gray-400 break-all">
                        {code.replace("GROUP_POOL_", "")}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <p className="text-lg font-semibold text-gray-900">
                ₦{Number(amount).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
