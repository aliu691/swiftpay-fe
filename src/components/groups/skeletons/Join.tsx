export function JoinSkeleton() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6 space-y-16 animate-pulse">
      <div className="h-[280px] bg-gray-200 rounded-[28px]" />
      <div className="bg-white rounded-[28px] p-12 space-y-10 border border-gray-100">
        <div className="h-10 w-1/3 bg-gray-200 rounded" />
        <div className="h-6 w-1/4 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-14 w-full bg-gray-200 rounded-2xl" />
      </div>
    </div>
  );
}
