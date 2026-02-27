export default function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
    </div>
  );
}
