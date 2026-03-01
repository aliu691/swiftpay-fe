import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface Props {
  incident: boolean;
  drop?: number;
  today?: number;
  yesterday?: number;
}

export default function IncidentCard({
  incident,
  drop,
  today,
  yesterday,
}: Props) {
  if (!incident) {
    return (
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="text-[#2563EB]" size={24} />
          <h3 className="text-xl font-semibold text-[#1D4ED8]">
            System Healthy
          </h3>
        </div>

        <p className="text-[#1E3A8A] text-base font-medium mb-2">
          Payment success rate is stable.
        </p>

        <p className="text-[#1E40AF] text-sm">
          No anomalies detected in the last 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF3DD] border border-[#F2C94C] rounded-3xl p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="text-[#B45309]" size={26} />
        <h3 className="text-xl font-semibold text-[#B45309]">Incident Alert</h3>
      </div>

      {/* Main Message */}
      <p className="text-[#7C2D12] text-2xl font-semibold leading-snug mb-6">
        Attention: {drop}% drop in success rate compared to yesterday ({today}%
        vs {yesterday}%)
      </p>

      {/* Description */}
      <p className="text-[#B45309] text-md leading-relaxed mb-10">
        This deviation was detected across 3 banking providers. Possible
        connectivity issue at the gateway level.
      </p>

      {/* Buttons (Stacked) */}
      <div className="space-y-5">
        <button className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white py-4 rounded-2xl text-xl font-semibold shadow-md hover:opacity-95 transition">
          Investigate Gateway
        </button>

        <button className="w-full border-2 border-[#F2C94C] bg-[#FFF8E1] text-[#B45309] py-4 rounded-2xl text-xl font-semibold hover:bg-[#FFF3C4] transition">
          Acknowledge
        </button>
      </div>
    </div>
  );
}
