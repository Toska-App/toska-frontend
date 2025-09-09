import { Mail } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function EmailInput({ value, onChange }: Props) {
  return (
    <div className="relative flex items-center text-sm md:text-base">
      <Mail
        className="pointer-events-none absolute left-3 text-indigo-500"
        size={20}
      />

      <span className="pointer-events-none absolute -top-6 left-0 text-sm font-bold tracking-widest text-indigo-500/80 select-none">
        Email
      </span>

      <input
        type="email"
        placeholder="example@example.com"
        name="login-email"
        id="login-email"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-indigo-500/20 py-2 pr-4 pl-10 shadow-lg ring-2 ring-indigo-500 ring-offset-neutral-200 duration-200 outline-none focus:ring-offset-3 dark:ring-offset-neutral-900"
        required
      />
    </div>
  );
}

export default EmailInput;
