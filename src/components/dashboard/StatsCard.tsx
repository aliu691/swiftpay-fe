import AnimatedNumber from "./AnimatedNumber";
import { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  prefix?: string;

  subtitle?: string;
  highlight?: boolean;

  icon?: ReactNode;

  // small top-right badge
  badge?: string;
  badgeColor?: "green" | "blue" | "red";
  badgeClassName?: string;

  // 🔥 icon container background override
  iconBgClassName?: string;
}

export default function StatsCard({
  title,
  value,
  prefix,
  subtitle,
  highlight,
  icon,
  badge,
  badgeColor = "green",
  badgeClassName,
  iconBgClassName,
}: Props) {
  const badgeStyles = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
  };

  const resolvedBadgeStyle = badgeClassName ?? badgeStyles[badgeColor];

  const resolvedIconBg = iconBgClassName ?? "bg-gray-100";

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-gray-200 hover:shadow-md transition relative">
      {/* Badge */}
      {badge && (
        <span
          className={`absolute top-6 right-6 text-xs px-3 py-1 rounded-full font-semibold ${resolvedBadgeStyle}`}
        >
          {badge}
        </span>
      )}

      {/* Icon */}
      {icon && (
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${resolvedIconBg}`}
        >
          {icon}
        </div>
      )}

      <p className="text-gray-500 mb-2">{title}</p>

      <h3 className="text-3xl font-bold text-gray-900">
        <AnimatedNumber value={value} prefix={prefix} />
      </h3>

      {subtitle && (
        <p
          className={`mt-3 text-sm font-medium ${
            highlight ? "text-green-600" : "text-gray-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
