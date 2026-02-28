import { useState, KeyboardEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../../api/group.api";
import { X, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

export default function CreateGroupModal({ onClose }: Props) {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  /* ======================
     EMAIL VALIDATION
  ====================== */

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(email);
  };

  const handleAddEmail = () => {
    const trimmed = emailInput.trim().toLowerCase();
    if (!trimmed) return;

    if (!validateEmail(trimmed)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (emails.includes(trimmed)) {
      setEmailError("Email already added");
      return;
    }

    setEmails((prev) => [...prev, trimmed]);
    setEmailInput("");
    setEmailError("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const removeEmail = (email: string) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  /* ======================
     MUTATION
  ====================== */

  const mutation = useMutation({
    mutationFn: createGroup,
    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["user-groups"],
        exact: false,
      });

      // show success animation
      setShowSuccess(true);

      // close after animation
      setTimeout(() => {
        onClose();
      }, 1500);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      name,
      targetAmount: Number(targetAmount),
      invitedEmails: emails,
    });
  };

  const isFormValid =
    name.trim().length > 0 && Number(targetAmount) > 0 && emails.length > 0;

  /* ======================
     SUCCESS SCREEN
  ====================== */

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-3xl p-10 text-center shadow-2xl animate-fadeIn">
          <CheckCircle2
            size={64}
            className="mx-auto text-green-500 animate-bounce"
          />
          <h2 className="text-2xl font-bold mt-6 text-gray-900">
            Group Created!
          </h2>
          <p className="text-gray-500 mt-2">
            Your group has been successfully created.
          </p>
        </div>
      </div>
    );
  }

  /* ======================
     MAIN MODAL
  ====================== */

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-xl rounded-3xl p-10 shadow-2xl space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Create Group</h2>
          <p className="text-gray-500 mt-3">
            Start a collective savings goal with friends or family.
          </p>
        </div>

        {/* Group Name */}
        <div className="space-y-3">
          <label className="font-semibold text-gray-800">Group Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Trip Fund"
          />
        </div>

        {/* Target Amount */}
        <div className="space-y-3">
          <label className="font-semibold text-gray-800">
            Savings Goal Amount
          </label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="50000"
          />
        </div>

        {/* Invite Emails */}
        <div className="space-y-3">
          <label className="font-semibold text-gray-800">
            Invite Friends by Email
          </label>

          <input
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
              setEmailError("");
            }}
            onKeyDown={handleKeyDown}
            className={`w-full border ${
              emailError ? "border-red-400" : "border-gray-200"
            } rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            placeholder="Type email and press Enter"
          />

          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          {emails.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {emails.map((email) => (
                <div
                  key={email}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {email}
                  <button onClick={() => removeEmail(email)}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-4 pt-4">
          <button
            onClick={handleSubmit}
            disabled={mutation.isPending || !isFormValid}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Creating..." : "Create Group →"}
          </button>

          <button
            onClick={onClose}
            disabled={mutation.isPending}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-gray-600 text-sm">
          By creating a group, you'll be able to invite friends to contribute
          towards this goal. You can manage permissions and withdrawal settings
          later in the group dashboard.
        </div>
      </div>
    </div>
  );
}
