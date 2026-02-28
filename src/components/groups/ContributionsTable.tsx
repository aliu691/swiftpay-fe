import { ContributionStatus } from "../../api";
import StatusBadge from "../StatusBadge";

interface Props {
  contributions: {
    id: string;
    amount: number;
    status: ContributionStatus;
    createdAt: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}

export default function ContributionsTable({ contributions }: Props) {
  return (
    <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-dashed border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-gray-200">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          Group Contributions
        </h3>
      </div>

      {/* ======================
          MOBILE CARD LAYOUT
         ====================== */}
      <div className="sm:hidden divide-y divide-gray-100">
        {contributions.map((c) => (
          <div key={c.id} className="p-5 space-y-4">
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                  {c.user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-medium text-gray-900">{c.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(c.createdAt).toISOString().split("T")[0]}
                  </p>
                </div>
              </div>

              <StatusBadge status={c.status} />
            </div>

            {/* Amount */}
            <div className="text-lg font-semibold text-gray-900">
              ₦
              {c.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        ))}

        {contributions.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No contributions yet.
          </div>
        )}
      </div>

      {/* ======================
          DESKTOP TABLE
         ====================== */}
      <div className="hidden sm:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
            <tr>
              <th className="text-left p-5">Member</th>
              <th className="text-left p-5">Amount</th>
              <th className="text-left p-5">Status</th>
              <th className="text-left p-5">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {contributions.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                      {c.user.name.charAt(0).toUpperCase()}
                    </div>

                    <span className="font-medium text-gray-900">
                      {c.user.name}
                    </span>
                  </div>
                </td>

                <td className="p-5 font-medium text-gray-900">
                  ₦
                  {c.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>

                <td className="p-5">
                  <StatusBadge status={c.status} />
                </td>

                <td className="p-5 text-gray-600">
                  {new Date(c.createdAt).toISOString().split("T")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {contributions.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No contributions yet.
          </div>
        )}
      </div>
    </div>
  );
}
