import React from "react";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

function RememberMe({ checked, onChange }: Props) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm duration-200 select-none md:text-base">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer hidden"
      />
      {/* Custom box */}
      <div
        className={`relative flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all duration-300 ${checked ? "border-indigo-700 bg-indigo-700" : "border-indigo-600 bg-indigo-400"} peer-focus:ring-2 peer-focus:ring-indigo-400 peer-focus:ring-offset-1`}
      >
        {/* Checkmark (with animation) */}
        <svg
          className={`h-3 w-3 text-white transition-opacity duration-300 ${
            checked ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      Remember Me
    </label>
  );
}

export default RememberMe;
