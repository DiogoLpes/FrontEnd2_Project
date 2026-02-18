"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Menu, X, Car, Calendar, History, Wrench, ShieldAlert, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled ? "bg-slate-900/95 backdrop-blur-md py-3 shadow-2xl border-b border-primary/20" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO INDUSTRIAL */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Wrench className="w-8 h-8 text-primary relative z-10 group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-colors" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">TS<span className="text-primary">PNEUS</span></span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Performance Hub</span>
          </div>
        </Link>

        {/* LINKS CENTRAIS */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { name: "Garagem", path: "/" },
            { name: "Agendamento", path: "/agendar" },
            { name: "Rastreio", path: "/status" }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 hover:text-primary transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* LOGIN / CTA - DESKTOP */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/auth/login" 
            className="flex items-center gap-2 text-xs font-bold uppercase text-white hover:text-primary px-4 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Entrar
          </Link>
          <Link href="/auth/register">
            <Button className="bg-primary hover:bg-yellow-500 text-black font-black uppercase italic tracking-tighter px-8 rounded-none skew-x-[-12deg] transition-all hover:scale-105 flex items-center gap-2">
              <span className="skew-x-[12deg] flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Criar Conta
              </span>
            </Button>
          </Link>
        </div>

        {/* MENU MOBILE */}
        <button 
          className="lg:hidden text-white" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-b border-primary/20 p-6 space-y-4">
          {[
            { name: "Garagem", path: "/" },
            { name: "Agendamento", path: "/agendar" },
            { name: "Rastreio", path: "/status" }
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.path}
              className="block text-sm font-black uppercase tracking-[0.2em] text-slate-300 hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-slate-700 space-y-3">
            <Link 
              href="/auth/login"
              className="flex items-center gap-2 text-sm font-bold uppercase text-white hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </Link>
            <Link 
              href="/auth/register"
              className="flex items-center gap-2 bg-primary text-black font-black uppercase text-sm px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              <UserPlus className="w-4 h-4" />
              Criar Conta
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}