"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button"; // Ajusta o caminho se necessário
import { Menu, X, Car, User, LogOut } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // FUTURO: Aqui vais trocar por: const { user } = useAuth();
  const user = null; 

  return (
    <nav className="fixed w-full z-[100] bg-[#0a0c10]/95 backdrop-blur-sm border-b-2 border-blue-600">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO ROBUSTO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-blue-600 p-2 skew-x-[-12deg] group-hover:bg-white transition-colors duration-300">
            <Car className="w-8 h-8 text-white group-hover:text-blue-600 skew-x-[12deg] transition-colors duration-300" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black italic tracking-tighter text-white uppercase">
              TS <span className="text-blue-600">PNEUS</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">Oficina Especializada</span>
          </div>
        </Link>

        {/* LINKS PRINCIPAIS (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { name: "Início", path: "/" },
            { name: "Serviços", path: "/Services" },
            { name: "Rastreio", path: "/Tracking" },
            { name: "Agendar", path: "/Agenda" }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className="text-sm font-black uppercase italic tracking-widest text-slate-300 hover:text-blue-600 transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all" />
            </Link>
          ))}
        </div>

        {/* BOTÕES DE ACESSO (DINÂMICOS) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            /* VISÃO: UTILIZADOR LOGADO */
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-xs font-black uppercase italic text-white hover:text-blue-600 transition-all"
              >
                <User size={16} className="text-blue-600" />
                Minha Garagem
              </Link>
              <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            /* VISÃO: VISITANTE (O que queres agora) */
            <>
              <Link 
                href="/auth?mode=login" 
                className="text-xs font-black uppercase italic text-white hover:text-blue-600 px-4 transition-colors"
              >
              Entrar
              </Link>
  
              <Link href="/auth?mode=register">
                <Button className="bg-white hover:bg-blue-600 hover:text-white text-black font-black uppercase italic px-6 rounded-none skew-x-[-12deg] transition-all border-none">
                  <span className="skew-x-[12deg]">Criar Conta</span>
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* BOTÃO MOBILE */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>
      
      {/* MENU MOBILE COM LÓGICA DE AUTH */}
      {isOpen && (
        <div className="lg:hidden bg-[#0a0c10] border-b border-blue-600 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {["Início", "Serviços", "Rastreio", "Agendar"].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-black uppercase italic text-white hover:text-blue-600"
              >
                {item}
              </Link>
            ))}
          </div>
          
          <div className="h-px bg-slate-800 w-full" />
          
          <div className="flex flex-col gap-4">
            {user ? (
               <Link href="/dashboard" className="text-blue-600 font-black uppercase italic">Dashboard</Link>
            ) : (
              <>
                <Link href="/auth?mode=login" onClick={() => setIsOpen(false)} className="text-white font-black uppercase italic">Entrar</Link>
                <Link href="/auth?mode=register" onClick={() => setIsOpen(false)} className="text-blue-600 font-black uppercase italic">Criar Conta</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}