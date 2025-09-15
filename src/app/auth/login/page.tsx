import React from "react";
import LoginForm from "./components/LoginForm";
import LeftPanel from "./components/LeftPanel";

function Login() {
  return (
    <div className="relative flex h-dvh w-full items-start justify-center gap-4 bg-neutral-50 bg-cover bg-center bg-[url(/images/login-image.jpg)] lg:bg-none lg:dark:bg-neutral-950">
      <LeftPanel />
      <LoginForm />
    </div>
  );
}

export default Login;
