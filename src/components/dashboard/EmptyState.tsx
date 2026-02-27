import { Plus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Active Groups
      </h3>

      <p className="text-gray-500 mb-6">
        You've completed your previous cycle. Start a new one to keep saving!
      </p>

      <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
        <Plus size={18} />
        Create a Group
      </button>
    </div>
  );
}
