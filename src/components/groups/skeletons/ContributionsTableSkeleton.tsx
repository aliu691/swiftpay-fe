export function ContributionsTableSkeleton() {
  return (
    <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-dashed border-gray-200 overflow-hidden animate-pulse">
      <div className="p-6 border-b">
        <div className="h-6 w-48 bg-gray-200 rounded" />
      </div>

      <div className="divide-y">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>

            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
