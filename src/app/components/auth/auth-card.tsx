"use client";

import Link from "next/link";
import { Wrench } from "lucide-react";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, linkText, linkHref, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      {/* Logo/Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Wrench className="w-8 h-8 text-primary" />
          <span className="text-2xl font-black text-white uppercase italic">TSPneus</span>
        </div>
        <h1 className="text-4xl font-black text-white uppercase italic mb-2 tracking-tighter">{title}</h1>
        <p className="text-slate-400 font-medium">{subtitle}</p>
      </div>

      {/* Form Container */}
      <div className="bg-slate-900/50 border-2 border-slate-800 p-8 rounded-lg backdrop-blur-sm">
        {children}
      </div>

      {/* Footer Link */}
      <div className="mt-6 text-center">
        <p className="text-slate-400 font-medium">
          {linkText.split("?")[0]}
          <Link href={linkHref} className="text-primary font-black ml-2 hover:text-yellow-400 transition-colors">
            {linkText.includes("?") ? linkText.split("?")[1] : linkText.split("? ")[1]}
          </Link>
        </p>
      </div>
    </div>
  );
}