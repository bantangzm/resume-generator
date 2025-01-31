import { useState } from "react";

interface AnimatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export const AnimatedInput = ({
  label,
  value,
  onChange,
  type = "text",
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-4 animate-slide-in">
      <label
        className={`absolute transition-all duration-200 ${
          isFocused || value
            ? "-top-3 left-2 text-xs text-blue-600"
            : "top-2 left-3 text-gray-500"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-3 py-2 border rounded-lg input-focus-effect bg-white/50 backdrop-blur-sm"
      />
    </div>
  );
};
