import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value?: string;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function CustomDropdown({
  label,
  value,
  options,
  placeholder = "Select",
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* =============================
     Close on Outside Click
  ============================== */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className="space-y-2 relative">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-[52px] flex items-center justify-between px-4 bg-white border border-gray-300 rounded-xl text-sm text-gray-700 shadow-sm hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      >
        <span>{selected ? selected.label : placeholder}</span>

        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm transition
                ${
                  value === opt.value
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
