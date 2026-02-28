export function GroupInsightsCardSkeleton() {
  return (
    <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-gray-200 animate-pulse space-y-8">
      <div className="h-6 w-40 bg-gray-200 rounded" />

      <div className="flex justify-between">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-6 w-10 bg-gray-200 rounded" />
      </div>

      <div className="flex justify-between">
        <div className="h-4 w-36 bg-gray-200 rounded" />
        <div className="h-6 w-10 bg-gray-200 rounded" />
      </div>

      <div className="flex justify-between">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-6 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
