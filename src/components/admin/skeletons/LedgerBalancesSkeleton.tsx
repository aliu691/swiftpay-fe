export default function LedgerBalancesSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="h-5 w-40 bg-gray-200 rounded" />
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-2xl px-5 py-4 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-10 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-48 bg-gray-100 rounded" />
              </div>
            </div>

            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
