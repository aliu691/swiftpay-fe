import { ContributionStatus } from "../api";

interface Props {
  status: ContributionStatus;
  className?: string;
}

export default function StatusBadge({ status, className }: Props) {
  const styles = {
    disbursed: "bg-green-100 text-green-600",
    completed: "bg-blue-100 text-blue-600",
    active: "bg-yellow-100 text-yellow-700",
    success: "bg-teal-100 text-teal-700",
    initiated: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-semibold ${styles[status]} ${className}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
