"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button"; 
import { Menu, X, Car, User, LogOut, ChevronDown, ShieldAlert } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || "Cliente";

  // FUNÇÃO PARA PROTEGER CLIQUES NA HOME
  const handleProtectedNavigation = (e: React.MouseEvent, path: string) => {
    if (!user) {
      e.preventDefault();
      Swal.fire({
        title: "TERMINAL RESTRITO",
        text: "Para aceder a esta funcionalidade, precisa de entrar na sua conta TS PNEUS.",
        icon: "info",
        background: "#0a0c10",
        color: "#fff",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        confirmButtonText: "ENTRAR AGORA",
        cancelButtonText: "MAIS TARDE",
        customClass: {
          popup: "border-2 border-blue-600 italic font-black uppercase tracking-tighter"
        }
      }).then((result) => {
        if (result.isConfirmed) router.push("/auth?mode=login");
      });
    } else {
      router.push(path);
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-[100] bg-[#0a0c10]/95 backdrop-blur-sm border-b-2 border-blue-600">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-blue-600 p-2 skew-x-[-12deg] group-hover:bg-white transition-colors duration-300">
            <Car className="w-8 h-8 text-white group-hover:text-blue-600 skew-x-[12deg]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black italic tracking-tighter text-white uppercase">
              TS <span className="text-blue-600">PNEUS</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">Oficina Especializada</span>
          </div>
        </Link>

        {/* LINKS COM PROTEÇÃO NO CLIQUE */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { name: "Início", path: "/" },
            { name: "Serviços", path: "/Services" },
            { name: "Rastreio", path: "/Tracking" },
            { name: "Agendar", path: "/Agenda" }
          ].map((item) => (
            <button 
              key={item.name} 
              onClick={(e) => (item.path === "/" || item.path === "/Services") ? router.push(item.path) : handleProtectedNavigation(e, item.path)}
              className="text-sm font-black uppercase italic tracking-widest text-slate-300 hover:text-blue-600 transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all" />
            </button>
          ))}
        </div>

        {/* PERFIL / LOGIN */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 bg-[#14171c] border border-white/5 p-2 px-4 hover:border-blue-600 transition-all skew-x-[-12deg]"
              >
                <div className="skew-x-[12deg] flex items-center gap-3 text-white">
                   <User size={14} className="text-blue-600" />
                   <span className="text-xs font-black uppercase italic">OLÁ, {firstName}</span>
                   <ChevronDown size={12} />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-[#0a0c10] border border-blue-600 p-2 shadow-2xl z-20 animate-in fade-in slide-in-from-top-2">
                  <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 p-3 text-[10px] font-black text-white hover:bg-blue-600 transition-all uppercase italic">
                    <Car size={14} /> Minha Garagem
                  </Link>
                  <button onClick={() => signOut()} className="w-full flex items-center gap-3 p-3 text-[10px] font-black text-red-500 hover:bg-red-600 hover:text-white transition-all uppercase italic text-left">
                    <LogOut size={14} /> Sair do Terminal
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth?mode=login" className="text-xs font-black uppercase italic text-white hover:text-blue-600 px-4">Entrar</Link>
              <Link href="/auth?mode=register">
                <Button className="bg-white text-black font-black uppercase italic px-6 rounded-none skew-x-[-12deg] hover:bg-blue-600 hover:text-white border-none">
                  <span className="skew-x-[12deg]">Criar Conta</span>
                </Button>
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>
    </nav>
  );
}