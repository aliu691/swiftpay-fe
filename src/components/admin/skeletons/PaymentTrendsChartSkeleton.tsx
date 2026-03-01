import Skeleton from "../../ui/Skeleton";

export default function PaymentTrendsChartSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Fake Bars */}
      <div className="flex items-end justify-between h-80 gap-4">
        {[60, 120, 80, 150, 90, 110, 140].map((h, i) => (
          <Skeleton
            key={i}
            className="w-16 rounded-t-2xl"
            style={{ height: h }}
          />
        ))}
      </div>
    </div>
  );
}
