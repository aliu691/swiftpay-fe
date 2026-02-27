import { ReactNode } from "react";

interface Props {
  label: string;
  value: string;
  icon?: ReactNode;
  color?: "default" | "green";
}

export default function GroupsSummaryCard({
  label,
  value,
  icon,
  color = "default",
}: Props) {
  const isGreen = color === "green";

  return (
    <div
      className={`
        rounded-3xl p-6 border transition-all duration-200
        ${
          isGreen
            ? "bg-green-50 border-green-200 shadow-sm"
            : "bg-white border-gray-200 shadow-sm hover:shadow-md"
        }
      `}
    >
      {/* Icon */}
      {icon && (
        <div
          className={`
            w-12 h-12 rounded-2xl flex items-center justify-center mb-6
            ${isGreen ? "bg-green-100" : "bg-gray-100"}
          `}
        >
          {icon}
        </div>
      )}

      {/* Label */}
      <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
        {label}
      </p>

      {/* Value */}
      <h3
        className={`
          text-4xl font-bold mt-2
          ${isGreen ? "text-green-700" : "text-gray-900"}
        `}
      >
        {value}
      </h3>
    </div>
  );
}
