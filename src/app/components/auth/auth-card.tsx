"use client";

import Link from "next/link";
import { Car } from "lucide-react";
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
    <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
      {/* Logo Moderno */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 group">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
            <Car size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tighter dark:text-white">TS<span className="text-blue-600">PNEUS</span></span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">{subtitle}</p>
      </div>

      {/* Container estilo Glassmorphism */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2rem] shadow-xl shadow-blue-500/5">
        {children}
      </div>

      {/* Footer Link */}
      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm font-medium">
          {linkText.includes("?") ? linkText.split("?")[0] + "?" : linkText}
          <Link href={linkHref} className="text-blue-600 font-bold ml-1 hover:text-blue-700 transition-colors">
            {linkText.includes("?") ? linkText.split("?")[1] : ""}
          </Link>
        </p>
      </div>
    </div>
  );
}