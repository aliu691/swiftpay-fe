export default function AdminPaymentsTableSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: 7 }).map((_, i) => (
              <th key={i} className="px-8 py-4">
                <div className="h-4 bg-gray-200 rounded w-20" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {Array.from({ length: 8 }).map((_, row) => (
            <tr key={row}>
              {Array.from({ length: 7 }).map((_, col) => (
                <td key={col} className="px-8 py-5">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
