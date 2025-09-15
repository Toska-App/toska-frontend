import { Eye, EyeClosed, LockKeyhole } from "lucide-react";
import React, { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function PasswordInput({ value, onChange }: Props) {
  const [showPassword, setfshowPassword] = useState(false);

  const handlePasswordChange = () => {
    setfshowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center text-sm md:text-base">
      <LockKeyhole
        className="pointer-events-none absolute left-3 text-indigo-500"
        size={20}
      />

      <span className="pointer-events-none absolute -top-6 left-0 text-sm font-bold tracking-widest text-indigo-500/80 select-none">
        Password
      </span>

      <input
        type={showPassword ? "text" : "password"}
        placeholder="enter your password"
        name="login-password"
        id="login-password"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-indigo-500/20 py-2 pr-12 pl-10 shadow-lg ring-2 ring-indigo-500 ring-offset-neutral-200 duration-200 outline-none focus:ring-offset-3 dark:ring-offset-neutral-900"
        required
      />

      <button
        type="button"
        onClick={handlePasswordChange}
        className="absolute top-0 right-0 bottom-0 flex w-10 cursor-pointer items-center justify-center rounded-r-xl bg-indigo-500/50 duration-200 hover:bg-indigo-500"
      >
        {showPassword ? (
          <EyeClosed className="pointer-events-none text-white" size={20} />
        ) : (
          <Eye className="pointer-events-none text-white" size={20} />
        )}
      </button>
    </div>
  );
}

export default PasswordInput;
