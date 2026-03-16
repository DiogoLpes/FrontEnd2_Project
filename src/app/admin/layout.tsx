"use client"; // Importante: Hooks como usePathname precisam de client component

import React from "react";
import { LayoutDashboard, Calendar, Users, Settings, Car, LogOut, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Para saber em que página estamos

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/admin" },
    { icon: <Calendar size={18} />, label: "Agendamentos", href: "/admin/agendamentos" },
    { icon: <Users size={18} />, label: "Clientes", href: "/admin/clientes" },
    { icon: <Car size={18} />, label: "Stock Peças", href: "/admin/stock" },
    { icon: <Settings size={18} />, label: "Configurações", href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#02040a] text-slate-200">
      {/* SIDEBAR TIPO SHADCN */}
      <aside className="w-64 border-r border-white/5 bg-[#09090b] hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black italic text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">TS</div>
          <span className="text-lg font-bold tracking-tighter text-white uppercase">TSPNEUS <span className="text-blue-600 italic font-black">PRO</span></span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm font-medium border ${
                  isActive 
                    ? "bg-blue-600/10 border-blue-600/20 text-white" 
                    : "text-slate-400 border-transparent hover:text-white hover:bg-white/[0.03] hover:border-white/5"
                }`}
              >
                <span className={isActive ? "text-blue-500" : ""}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-blue-600/5 border border-blue-600/20 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 text-blue-500 mb-1">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase">Admin Mode</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight font-medium">Você tem acesso total às funções do sistema.</p>
          </div>
          
          {/* BOTÃO DE SAIR CONFIGURADO */}
          <button 
            onClick={() => signOut({ callbackUrl: "/auth" })}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-500 hover:text-red-500 transition-all font-medium text-sm group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Terminar Sessão
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-white/5 bg-[#09090b]/50 backdrop-blur-md flex items-center justify-end px-8">
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sessão Ativa</span>
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">AD</div>
          </div>
        </header>
        
        <main className="p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}