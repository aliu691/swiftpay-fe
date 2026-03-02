import Skeleton from "../../ui/Skeleton";

export default function LedgerEntriesTableSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <Skeleton className="h-5 w-48" />
      </div>

      {/* Table Head */}
      <div className="px-8 py-4 border-b border-gray-100">
        <div className="grid grid-cols-4 gap-8">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-8 px-8 py-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-8 py-6 border-t border-gray-100 flex justify-between">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-lg" />
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
