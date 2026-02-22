"use client";

import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de autenticação no sistema da oficina
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* CABEÇALHO DO FORMULÁRIO */}
      <div className="border-l-4 border-blue-600 pl-4">
        <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">
          Acesso ao <span className="text-blue-600">Terminal</span>
        </h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          Introduza as credenciais da sua conta digital
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* CAMPO: UTILIZADOR */}
          <div className="relative border-2 border-slate-800 p-4 focus-within:border-blue-600 focus-within:bg-blue-600/5 transition-all group">
            <label className="absolute -top-3 left-4 bg-[#05070a] px-2 text-[10px] font-black italic text-blue-600 uppercase tracking-widest">
              Identificação (Email)
            </label>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-slate-600 group-focus-within:text-blue-600" />
              <input 
                type="email" 
                placeholder="EMAIL@SISTEMA.COM"
                className="bg-transparent w-full outline-none text-white font-bold uppercase text-sm placeholder:text-slate-800"
                required
              />
            </div>
          </div>

          {/* CAMPO: PASSWORD */}
          <div className="relative border-2 border-slate-800 p-4 focus-within:border-blue-600 focus-within:bg-blue-600/5 transition-all group">
            <label className="absolute -top-3 left-4 bg-[#05070a] px-2 text-[10px] font-black italic text-blue-600 uppercase tracking-widest">
              Chave de Segurança
            </label>
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-slate-600 group-focus-within:text-blue-600" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="bg-transparent w-full outline-none text-white font-bold text-sm placeholder:text-slate-800"
                required
              />
            </div>
          </div>
        </div>

        {/* BOTÃO SKEW (INCLINADO) */}
        <button 
          type="submit"
          disabled={loading}
          className="w-full h-16 bg-white hover:bg-blue-600 text-black hover:text-white font-black italic uppercase text-xl transition-all skew-x-[-10deg] flex items-center justify-center gap-3 group relative overflow-hidden"
        >
          <div className="skew-x-[10deg] flex items-center gap-3">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span>Autenticar no Sistema</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </div>
          
          {/* Efeito de brilho ao passar o rato */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </button>
      </form>

      {/* LINK DE TRANSIÇÃO PARA O REGISTER */}
      <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[10px] font-black uppercase text-slate-600 italic tracking-widest">
          Ainda não tem acesso à garagem?
        </span>
        <Link 
          href="/auth/register" 
          className="group flex items-center gap-3 text-blue-600 font-black uppercase italic text-xs hover:text-white transition-all"
        >
          Criar Novo Registo
          <div className="w-8 h-[2px] bg-blue-600 group-hover:w-12 group-hover:bg-white transition-all" />
        </Link>
      </div>
    </div>
  );
}