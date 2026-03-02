import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  data: {
    date: string;
    successRate: number;
  }[];
}

export default function PaymentTrendsChart({ data }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          Payment Success Trends (Last 7 Days)
        </h2>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          View Detailed Chart
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="12%">
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>

              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })
                  .toUpperCase()
              }
              tick={{ fill: "#94A3B8", fontSize: 13, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip cursor={{ fill: "transparent" }} />

            <Bar
              dataKey="successRate"
              radius={[24, 24, 0, 0]}
              barSize={70} // 👈 FATTER BARS
              background={{
                fill: "#DCE6F5",
                radius: 0,
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.successRate < 50
                      ? "url(#redGradient)"
                      : "url(#blueGradient)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
