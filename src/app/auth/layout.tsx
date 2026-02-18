"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0c10]">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0" />
      
      <div className="w-full relative z-10 flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}