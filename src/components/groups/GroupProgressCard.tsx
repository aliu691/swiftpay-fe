import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import AnimatedNumber from "../dashboard/AnimatedNumber";

interface Props {
  totalContributed: number;
  targetAmount: number;
  status?: string;
}

export default function GroupProgressCard({
  totalContributed,
  targetAmount,
  status,
}: Props) {
  const percentage =
    targetAmount > 0
      ? Math.min((totalContributed / targetAmount) * 100, 100)
      : 0;

  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedWidth(percentage);
    }, 200);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border-gray-200 border-2 border-dashed">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
        <div>
          <h3 className="text-md sm:text-lg text-gray-500">Savings Progress</h3>

          <h2 className="text-3xl sm:text-5xl font-bold mt-3 text-gray-900">
            <AnimatedNumber value={totalContributed} prefix="₦" />
          </h2>
        </div>

        <div className="sm:text-right">
          <p className="text-sm text-gray-500">
            Goal: ₦{targetAmount.toLocaleString()}
          </p>

          <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
            {percentage.toFixed(0)}% Reached
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-4 mt-8 overflow-hidden">
        <div
          className="h-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-1000 ease-out"
          style={{ width: `${animatedWidth}%` }}
        />
      </div>

      {percentage === 100 && status === "disbursed" && (
        <div className="flex items-center gap-2 mt-6 text-green-600 font-medium text-sm sm:text-base">
          <CheckCircle2 size={18} />
          <span>Target successfully reached and disbursed</span>
        </div>
      )}
    </div>
  );
}
