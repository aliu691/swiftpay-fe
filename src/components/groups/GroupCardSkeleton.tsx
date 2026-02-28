export default function GroupCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border overflow-hidden animate-pulse">
      {/* Cover */}
      <div className="h-36 bg-gray-200" />

      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <div className="h-5 bg-gray-200 rounded w-40" />
          <div className="h-5 bg-gray-200 rounded w-16" />
        </div>

        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-36" />
        <div className="h-4 bg-gray-200 rounded w-36" />

        <div className="border-t pt-4">
          <div className="h-4 bg-gray-200 rounded w-28 mx-auto" />
        </div>
      </div>
    </div>
  );
}
