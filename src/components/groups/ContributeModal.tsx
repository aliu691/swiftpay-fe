import { useState, useMemo } from "react";
import { X, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  isProcessing: boolean;
  remainingAmount: number;
}

export default function ContributeModal({
  isOpen,
  onClose,
  onSubmit,
  isProcessing,
  remainingAmount,
}: Props) {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numericAmount = Number(amount);

  const quickAmounts = [5000, 10000, 20000];

  const error = useMemo(() => {
    if (!numericAmount) return null;
    if (numericAmount <= 0) return "Enter a valid amount";
    if (numericAmount > remainingAmount)
      return `Maximum allowed is ₦${remainingAmount.toLocaleString()}`;
    return null;
  }, [numericAmount, remainingAmount]);

  const handleSubmit = () => {
    if (error || !numericAmount) return;
    setIsSubmitting(true);
    onSubmit(numericAmount);
  };

  const isLocked = isProcessing || isSubmitting;

  // ✅ RETURN AFTER HOOKS
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 space-y-6 shadow-xl animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            Contribute to Group
          </h2>

          <button
            onClick={onClose}
            disabled={isLocked}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-40"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Remaining: ₦{remainingAmount.toLocaleString()}
        </p>

        {/* Quick Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {quickAmounts.map((value) => (
            <button
              key={value}
              type="button"
              disabled={isLocked || value > remainingAmount}
              onClick={() => setAmount(String(value))}
              className={`py-2 rounded-xl border text-sm font-medium transition
                ${
                  numericAmount === value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }
                disabled:opacity-40
              `}
            >
              ₦{value.toLocaleString()}
            </button>
          ))}

          <button
            type="button"
            disabled={isLocked || remainingAmount <= 0}
            onClick={() => setAmount(String(remainingAmount))}
            className={`py-2 rounded-xl border text-sm font-medium transition
              ${
                numericAmount === remainingAmount
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }
              disabled:opacity-40
            `}
          >
            Max
          </button>
        </div>

        {/* Custom Input */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Custom Amount</label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              ₦
            </span>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLocked}
              className={`w-full pl-10 pr-4 py-4 bg-gray-50 border rounded-xl focus:ring-2 focus:outline-none
                ${
                  error
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Submit */}
        <div className="space-y-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={isLocked || !!error || !amount}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLocked ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Redirecting...
              </>
            ) : (
              "Continue to Payment"
            )}
          </button>

          <button
            onClick={onClose}
            disabled={isLocked}
            className="w-full py-3 text-gray-500 hover:text-gray-700 disabled:opacity-40"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
