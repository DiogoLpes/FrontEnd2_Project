"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Gauge } from "lucide-react";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);

  return (
    <form className="space-y-6">
      {/* NOME E TELEMÓVEL COM BORDAS DE METAL */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 group">
          <p className="text-[10px] font-black uppercase text-blue-600 mb-1 tracking-widest">Proprietário</p>
          <input 
            type="text" 
            placeholder="NOME COMPLETO"
            className="w-full bg-transparent border-b-4 border-slate-800 focus:border-blue-600 p-3 outline-none text-white font-black italic uppercase transition-all"
          />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase text-blue-600 mb-1 tracking-widest">Contacto</p>
          <input 
            type="tel" 
            placeholder="9XX XXX XXX"
            className="w-full bg-transparent border-b-4 border-slate-800 focus:border-blue-600 p-3 outline-none text-white font-black italic transition-all"
          />
        </div>
      </div>

      {/* EMAIL */}
      <div className="group">
        <p className="text-[10px] font-black uppercase text-blue-600 mb-1 tracking-widest">Acesso Digital (Email)</p>
        <input 
          type="email" 
          placeholder="exemplo@tspneus.pt"
          className="w-full bg-slate-900/50 border-l-4 border-slate-800 focus:border-blue-600 p-4 outline-none text-white font-bold transition-all"
        />
      </div>

      {/* O CAMPO DA MATRÍCULA - O CORAÇÃO DO SITE */}
      <div className="relative pt-4">
        <div className="bg-yellow-400 p-1 rotate-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-white border-2 border-black p-4 flex flex-col items-center">
            <span className="text-[10px] font-black text-black/40 uppercase mb-1">Chapa de Matrícula</span>
            <input 
              type="text" 
              placeholder="00-AA-00"
              className="w-full text-center bg-transparent text-3xl font-mono font-black text-black outline-none uppercase tracking-tighter"
            />
          </div>
        </div>
        <p className="text-[9px] font-bold text-slate-500 mt-4 text-center uppercase tracking-widest italic">
          * A matrícula será o seu ID único para rastrear reparações
        </p>
      </div>

      {/* BOTÃO BRUTALISTA */}
      <button 
        className="w-full group relative bg-blue-600 p-6 overflow-hidden transition-all hover:bg-black"
        disabled={loading}
      >
        <div className="relative z-10 flex items-center justify-center gap-4">
          <span className="text-2xl font-black italic uppercase text-white tracking-tighter">
            ATIVAR ACESSO À OFICINA
          </span>
          <ArrowRight className="text-white group-hover:translate-x-2 transition-transform" />
        </div>
        {/* Efeito de brilho de metal que passa no botão */}
        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000" />
      </button>
    </form>
  );
}