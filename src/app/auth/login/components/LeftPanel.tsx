import React from "react";

function LeftPanel() {
  return (
    <div className="absolute left-0 hidden h-dvh w-1/2 min-w-[40rem] py-6 pr-10 pl-6 lg:block">
      <div className="flex h-full w-full flex-col items-center justify-end rounded-4xl bg-[url(/images/login-image.jpg)] bg-cover bg-center p-8"></div>
    </div>
  );
}

export default LeftPanel;
