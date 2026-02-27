export default function UpgradeCard() {
  return (
    <div className="rounded-2xl p-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg">
      <h3 className="text-xl font-semibold mb-3">
        Max out your savings potential
      </h3>

      <p className="text-blue-100 mb-6">
        Get lower transaction fees and priority payouts with Pro.
      </p>

      <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
        Upgrade to Pro
      </button>
    </div>
  );
}
