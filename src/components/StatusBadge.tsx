import { ContributionStatus } from "../api";

interface Props {
  status: ContributionStatus;
  className?: string;
}

export default function StatusBadge({ status, className }: Props) {
  const styles: Record<ContributionStatus, string> = {
    disbursed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    active: "bg-yellow-100 text-yellow-800",
    success: "bg-emerald-100 text-emerald-700",
    initiated: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`
        inline-block
        w-fit
        px-3 py-1
        text-xs
        font-semibold
        rounded-full
        whitespace-nowrap
        leading-none
        ${styles[status]}
        ${className ?? ""}
      `}
    >
      {status.toUpperCase()}
    </span>
  );
}
