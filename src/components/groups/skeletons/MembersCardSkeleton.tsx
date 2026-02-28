export function MembersCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 animate-pulse">
      <div className="p-6">
        <div className="h-6 w-32 bg-gray-200 rounded" />
      </div>

      <div className="divide-y">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full" />
              <div>
                <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="w-4 h-4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
