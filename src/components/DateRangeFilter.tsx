import { useState } from "react";
import { Calendar, X } from "lucide-react";

interface Props {
  appliedRange: { startDate?: string; endDate?: string };
  onApply: (range: { startDate?: string; endDate?: string }) => void;
  onClear: () => void;
}

export default function DateRangeFilter({
  appliedRange,
  onApply,
  onClear,
}: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [draftRange, setDraftRange] = useState(appliedRange);

  const today = new Date().toISOString().split("T")[0];

  const isFiltered = !!appliedRange.startDate || !!appliedRange.endDate;

  const formattedRange =
    appliedRange.startDate && appliedRange.endDate
      ? `${appliedRange.startDate} → ${appliedRange.endDate}`
      : "Select Date Range";

  return (
    <div className="flex items-center gap-3 relative">
      <button
        onClick={() => {
          setDraftRange(appliedRange);
          setShowPicker(!showPicker);
        }}
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-sm transition
          ${
            isFiltered
              ? "bg-blue-50 border-2 border-blue-500"
              : "bg-white border-2 border-gray-200 hover:shadow-md"
          }`}
      >
        <Calendar size={18} className="text-gray-500" />
        <span className="text-sm text-gray-600">{formattedRange}</span>

        {isFiltered && (
          <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
            Filtered
          </span>
        )}
      </button>

      {isFiltered && (
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition"
        >
          <X size={16} />
          Clear
        </button>
      )}

      {showPicker && (
        <div className="absolute top-16 right-0 bg-white border rounded-2xl shadow-xl p-6 w-80 z-50">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                max={today}
                value={draftRange.startDate || ""}
                onChange={(e) =>
                  setDraftRange((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="w-full mt-2 border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                End Date
              </label>
              <input
                type="date"
                min={draftRange.startDate}
                max={today}
                value={draftRange.endDate || ""}
                onChange={(e) =>
                  setDraftRange((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
                className="w-full mt-2 border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => {
                  setDraftRange({});
                  onClear();
                  setShowPicker(false);
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Reset
              </button>

              <button
                onClick={() => {
                  onApply(draftRange);
                  setShowPicker(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
