import { CSSProperties } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default function Skeleton({ className = "", style }: Props) {
  return (
    <div
      style={style}
      className={`animate-pulse bg-gray-200 rounded-lg ${className}`}
    />
  );
}
