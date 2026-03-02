import Skeleton from "../../ui/Skeleton";

export default function FilterSectionSkeleton() {
  return (
    <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        {/* Date Range */}
        <div className="flex flex-col">
          <Skeleton className="h-4 w-24 mb-3" />
          <Skeleton className="h-[52px] w-full rounded-xl" />
        </div>

        {/* Dropdown */}
        <div className="flex flex-col">
          <Skeleton className="h-4 w-28 mb-3" />
          <Skeleton className="h-[52px] w-full rounded-xl" />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-[52px] flex-1 rounded-xl" />
          <Skeleton className="h-[52px] w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
