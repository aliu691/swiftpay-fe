import Skeleton from "../../ui/Skeleton";

export default function LatestFailedPaymentsTableSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start px-8 py-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Table Rows */}
      <div className="border-t border-gray-100">
        {[1, 2, 3, 4].map((row) => (
          <div
            key={row}
            className="px-8 py-5 flex justify-between items-center border-b border-gray-100"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-28 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
