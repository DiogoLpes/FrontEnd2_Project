"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/auth" })}
      className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors font-bold uppercase text-xs p-2"
    >
      <LogOut size={16} />
      <span>Terminar Sessão</span>
    </button>
  );
}