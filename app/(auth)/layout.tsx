import AppLogo from "@/components/AppLogo";
import Link from "next/link";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-zinc-200">
      <div className="w-full max-w-xl p-4">
        <div className="mb-6 flex items-center justify-center">
          <Link href={"/"}>
            <AppLogo />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
