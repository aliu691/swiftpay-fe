import { useState } from "react";
import { useAdminLedgerEntries } from "../../hooks/useAdmin";

import { CreditCard, Lock } from "lucide-react";
import { LedgerEntry } from "../../api";

interface Props {
  entries: LedgerEntry[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  page: number;
  onPageChange: (page: number) => void;
}

export default function LedgerEntriesTable({
  entries,
  meta,
  page,
  onPageChange,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Detailed Ledger Entries
        </h2>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-8 py-4 text-left">Date & Time</th>
            <th className="px-8 py-4 text-left">Reference</th>
            <th className="px-8 py-4 text-left">Description</th>
            <th className="px-8 py-4 text-left">Account Code</th>
            <th className="px-8 py-4 text-left">Debit (₦)</th>
            <th className="px-8 py-4 text-left">Credit (₦)</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {entries.flatMap((entry) =>
            entry.lines.map((line) => {
              const isPlatform = line.account.code === "PLATFORM_CASH";

              return (
                <tr key={line.id} className="hover:bg-gray-50 transition">
                  {/* Date & Time */}
                  <td className="px-8 py-5 text-gray-500">
                    {new Date(entry.createdAt).toLocaleString()}
                  </td>

                  {/* Reference */}
                  <td className="px-8 py-5 font-medium text-gray-800">
                    {entry.reference}
                  </td>

                  {/* Description */}
                  <td className="px-8 py-5 text-gray-700">
                    {entry.description ?? "-"}
                  </td>

                  {/* Account Code with Icon */}
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-xs font-medium text-gray-700">
                      {isPlatform ? (
                        <CreditCard size={14} className="text-green-600" />
                      ) : (
                        <Lock size={14} className="text-amber-600" />
                      )}
                      {line.account.code}
                    </span>
                  </td>

                  {/* Debit */}
                  <td className="px-8 py-5 font-medium text-red-600">
                    {line.debit > 0 ? `₦${line.debit.toLocaleString()}` : "-"}
                  </td>

                  {/* Credit */}
                  <td className="px-8 py-5 font-medium text-green-600">
                    {line.credit > 0 ? `₦${line.credit.toLocaleString()}` : "-"}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {meta && (
        <div className="flex justify-between items-center px-8 py-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold">
              {(meta.page - 1) * meta.limit + 1}
            </span>{" "}
            –
            <span className="font-semibold">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of <span className="font-semibold">{meta.total}</span> entries
          </p>

          <div className="flex gap-2">
            <button
              disabled={meta.page === 1}
              onClick={() => onPageChange(page - 1)}
              className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={meta.page === meta.totalPages}
              onClick={() => onPageChange(page + 1)}
              className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
