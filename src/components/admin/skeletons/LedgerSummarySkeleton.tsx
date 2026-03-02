import Skeleton from "../../ui/Skeleton";

export default function LedgerSummarySkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-8 space-y-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
