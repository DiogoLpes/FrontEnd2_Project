"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Menu, X, Car, Gauge, MapPin } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-[100] bg-garage-dark/95 backdrop-blur-sm border-b-2 border-garage-blue">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO ROBUSTO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-garage-blue p-2 skew-x-[-12deg]">
            <Car className="w-8 h-8 text-white skew-x-[12deg]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black italic tracking-tighter text-white uppercase">
              TS <span className="text-garage-blue">PNEUS</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">Oficina Especializada</span>
          </div>
        </Link>

        {/* LINKS COM ESTILO DE MENU DE CORRIDAS */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { name: "Início", path: "/" },
            { name: "Serviços", path: "/servicos" },
            { name: "Rastreio", path: "/status" },
            { name: "Agendar", path: "/agendar" }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className="text-sm font-black uppercase italic tracking-widest text-slate-300 hover:text-garage-blue transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-garage-blue group-hover:w-full transition-all" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login" className="text-xs font-black uppercase italic text-white hover:text-garage-blue px-4">Entrar</Link>
          <Button className="bg-white hover:bg-garage-blue hover:text-white text-black font-black uppercase italic px-6 rounded-none skew-x-[-12deg] transition-all">
            <span className="skew-x-[12deg]">Criar Conta</span>
          </Button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>
    </nav>
  );
}