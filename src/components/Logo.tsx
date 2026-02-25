import { Wallet } from "lucide-react";

interface Props {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  light?: boolean; // for dark backgrounds
}

export default function Logo({
  size = "md",
  showText = true,
  light = false,
}: Props) {
  const sizes = {
    sm: {
      box: "w-8 h-8",
      icon: 16,
      text: "text-lg",
    },
    md: {
      box: "w-10 h-10",
      icon: 20,
      text: "text-xl",
    },
    lg: {
      box: "w-12 h-12",
      icon: 24,
      text: "text-2xl",
    },
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizes[size].box} ${
          light ? "bg-white/20" : "bg-blue-600"
        } rounded-xl flex items-center justify-center backdrop-blur-md`}
      >
        <Wallet
          size={sizes[size].icon}
          className={light ? "text-white" : "text-white"}
        />
      </div>

      {showText && (
        <h1
          className={`${sizes[size].text} font-semibold tracking-wide ${
            light ? "text-white" : "text-gray-900"
          }`}
        >
          SwiftPay
        </h1>
      )}
    </div>
  );
}
