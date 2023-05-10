import React from "react";

export default function AlertSuccess({ children }: { children: React.ReactNode }) {
  return <div className={"mb-5 text-sm font-medium text-green-500"}>{children}</div>;
}
