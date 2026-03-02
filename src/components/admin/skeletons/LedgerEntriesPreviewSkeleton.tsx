export default function LedgerEntriesPreviewSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
        <div className="h-5 w-48 bg-gray-200 rounded" />
        <div className="flex gap-3">
          <div className="h-9 w-24 bg-gray-200 rounded-lg" />
          <div className="h-9 w-24 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-100">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="px-8 py-5 flex justify-between">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      <div className="px-8 py-6 border-t border-gray-100 text-center">
        <div className="h-4 w-56 bg-gray-200 rounded mx-auto" />
      </div>
    </div>
  );
}
