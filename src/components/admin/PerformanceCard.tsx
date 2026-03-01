import { ReactNode, useEffect, useState } from "react";
import AnimatedNumber from "../dashboard/AnimatedNumber";

interface Props {
  title: string;
  value: string | number;
  icon?: ReactNode;
  highlight?: "blue" | "green" | "red";
  badge?: string;
  progress?: number;
  subtitle?: string;

  /* NEW */
  prefix?: string;
  suffix?: string;
}

export default function PerformanceCard({
  title,
  value,
  icon,
  highlight = "blue",
  badge,
  progress,
  subtitle,
  prefix = "",
  suffix = "",
}: Props) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  /* ================================
     Color Logic
  ================================ */

  const textColor =
    highlight === "green"
      ? "text-green-600"
      : highlight === "red"
      ? "text-red-600"
      : "text-blue-600";

  const progressColor =
    highlight === "green"
      ? "bg-green-600"
      : highlight === "red"
      ? "bg-red-600"
      : "bg-blue-600";

  /* ================================
     Animate Progress Bar
  ================================ */

  useEffect(() => {
    if (progress !== undefined) {
      const timeout = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
      {/* Title */}
      <p className="text-sm text-gray-500">{title}</p>

      {/* Value Row */}
      <div className="flex items-center justify-between mt-3">
        <h3 className={`text-3xl font-bold ${textColor}`}>
          {typeof value === "number" ? (
            <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
          ) : (
            value
          )}
        </h3>

        {icon && <div className="bg-gray-100 p-2 rounded-xl">{icon}</div>}
      </div>

      {/* Badge */}
      {badge && (
        <div className="mt-3 inline-block text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">
          {badge}
        </div>
      )}

      {/* Progress Bar */}
      {progress !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`${progressColor} h-2 rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${animatedProgress}%` }}
            />
          </div>

          {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}
