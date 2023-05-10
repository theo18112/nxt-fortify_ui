import Navbar from "@/components/Navbar";
import React from "react";

// export default function RootLayout({ children }: { children: React.ReactNode }) {

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="py-10">{children}</div>
    </div>
  );
}
