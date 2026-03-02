import { useNavigate } from "react-router-dom";
import { useAdminLedgerEntries } from "../../hooks/useAdmin";

export default function LedgerEntriesPreview() {
  const navigate = useNavigate();

  const { data, isLoading } = useAdminLedgerEntries({
    page: 1,
    limit: 5,
  });

  const entries = data?.data?.data ?? [];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Detailed Ledger Entries
        </h2>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">
            Export CSV
          </button>

          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-8 py-4 text-left">Date</th>
            <th className="px-8 py-4 text-left">Reference/Description</th>
            <th className="px-8 py-4 text-left">Account Code</th>
            <th className="px-8 py-4 text-right">Debit (₦)</th>
            <th className="px-8 py-4 text-right">Credit (₦)</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="py-16 text-center text-gray-400">
                Loading entries...
              </td>
            </tr>
          ) : (
            entries.flatMap((entry) =>
              entry.lines.map((line) => (
                <tr key={line.id} className="hover:bg-gray-50">
                  <td className="px-8 py-5 text-gray-500">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-8 py-5 text-gray-700">
                    {entry.description}
                  </td>

                  <td className="px-8 py-5 text-gray-500 font-medium">
                    {line.account.code}
                  </td>

                  <td className="px-8 py-5 text-right text-red-600 font-medium">
                    {line.debit > 0 ? `₦${line.debit.toLocaleString()}` : "-"}
                  </td>

                  <td className="px-8 py-5 text-right text-green-600 font-medium">
                    {line.credit > 0 ? `₦${line.credit.toLocaleString()}` : "-"}
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>

      {/* View All Button */}
      <div className="px-8 py-6 border-t border-gray-100 text-center">
        <button
          onClick={() => navigate("/admin/ledger/all")}
          className="text-blue-600 font-semibold hover:underline"
        >
          View All Historical Entries
        </button>
      </div>
    </div>
  );
}
