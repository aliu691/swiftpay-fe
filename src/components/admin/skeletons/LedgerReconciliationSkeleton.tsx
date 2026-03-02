export default function LedgerReconciliationSkeleton() {
  return (
    <div className="rounded-2xl border p-10 shadow-sm text-center bg-white animate-pulse">
      <div className="w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-full" />

      <div className="h-6 w-64 bg-gray-200 rounded mx-auto mb-4" />
      <div className="h-4 w-80 bg-gray-100 rounded mx-auto mb-8" />

      <div className="flex justify-center gap-10 mb-8">
        <div className="space-y-2">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-300 rounded" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-300 rounded" />
        </div>
      </div>

      <div className="h-10 w-56 bg-gray-200 rounded-xl mx-auto" />
    </div>
  );
}
