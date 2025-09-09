"use client";

import { useState } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import RememberMe from "./RememberMe";
import SubmitButton from "./SubmitButton";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    console.log({ email, password, remember });
    // call login API here
  };
  return (
    <div className="absolute right-0 flex h-dvh w-full items-center justify-center px-6 lg:w-1/2 lg:px-0">
      <div className="flex w-full shrink-0 flex-col gap-24 overflow-y-auto rounded-xl border border-black/5 bg-neutral-200 p-6 md:p-12 lg:p-16 shadow-2xl backdrop-blur-xl sm:w-[30rem] lg:w-[35rem] dark:border-white/5 dark:bg-neutral-900">
        <div className="flex flex-col gap-2">
          <h1 className="text-start text-3xl tracking-widest text-indigo-400 sm:text-4xl lg:text-5xl">
            Login
          </h1>
          <h3 className="text-start text-sm opacity-80 md:text-base">
            Please enter your email and password to login.
          </h3>
        </div>

        <div className="flex w-full flex-col gap-10">
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
          <RememberMe checked={remember} onChange={setRemember} />
        </div>

        <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
      </div>
    </div>
  );
}

export default LoginForm;
