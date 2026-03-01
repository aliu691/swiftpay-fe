import Skeleton from "../../ui/Skeleton";

export default function IncidentCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-14 w-full rounded-2xl" />
      <Skeleton className="h-14 w-full rounded-2xl" />
    </div>
  );
}
