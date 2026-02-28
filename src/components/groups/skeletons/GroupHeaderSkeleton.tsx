export function GroupHeaderSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-4 w-48 bg-gray-200 rounded" />

      <div className="flex items-start gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gray-200" />

        <div className="flex-1 space-y-3">
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
