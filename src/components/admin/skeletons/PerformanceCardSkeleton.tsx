import Skeleton from "../../ui/Skeleton";

export default function PerformanceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      {/* Title */}
      <Skeleton className="h-4 w-24 mb-4" />

      {/* Value */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>

      {/* Progress */}
      <div className="mt-6">
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </div>
  );
}
