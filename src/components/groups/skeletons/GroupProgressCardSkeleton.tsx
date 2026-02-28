export function GroupProgressCardSkeleton() {
  return (
    <div className="lg:col-span-2 bg-white p-8 rounded-3xl border-2 border-dashed border-gray-200 animate-pulse space-y-6">
      <div className="h-5 w-40 bg-gray-200 rounded" />
      <div className="h-10 w-56 bg-gray-200 rounded" />

      <div className="flex justify-between">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>

      <div className="h-4 bg-gray-200 rounded-full w-full" />
      <div className="h-4 w-64 bg-gray-200 rounded" />
    </div>
  );
}
