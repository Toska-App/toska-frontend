import { ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function SubmitButton({ children, onClick }: Props) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-500 text-base md:text-lg text-white shadow-lg ring-2 ring-indigo-500 ring-offset-neutral-200 duration-200 hover:ring-offset-3 dark:ring-offset-neutral-900"
    >
      {children}
      <ArrowRight
        size={20}
        className="duration-200 group-hover:translate-x-2"
      />
    </button>
  );
}

export default SubmitButton;
