"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ShieldCheck, Lock, Mail, Car, Hash } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Decorativo: Textura de Oficina */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-[#111216] border-[1px] border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden">
        
        {/* LADO FIXO: STATUS DA OFICINA */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#16181d] to-[#0a0a0c] border-r border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-sm rotate-3">
                <Car className="text-white -rotate-3" size={24} />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-white uppercase">
                TS <span className="text-blue-600">PNEUS</span>
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase italic leading-none text-white mb-6">
              SISTEMA DE <br /> <span className="text-blue-600">SEGURANÇA</span> <br /> AUTOMÓVEL
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                <ShieldCheck className="text-blue-500" size={16} /> Encriptação de Matrícula Ativa
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                <ShieldCheck className="text-blue-500" size={16} /> Base de Dados em Olhos de Água
              </div>
            </div>
          </div>
          <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">
            TSPNEUS PERFORMANCE HUB v2.0
          </div>
        </div>

        {/* LADO DINÂMICO: LOGIN E REGISTO */}
        <div className="p-8 lg:p-16 relative min-h-[600px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="space-y-8"
              >
                <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">Entrar no Terminal</h3>
                
                <div className="space-y-4">
                  <div className="group border-b-2 border-slate-800 focus-within:border-blue-600 transition-all p-2">
                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">ID de Acesso</label>
                    <div className="flex items-center gap-3 mt-1">
                      <Mail size={18} className="text-slate-600" />
                      <input className="bg-transparent w-full text-white outline-none font-bold" placeholder="EMAIL@EXEMPLO.COM" />
                    </div>
                  </div>
                  <div className="group border-b-2 border-slate-800 focus-within:border-blue-600 transition-all p-2">
                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Chave de Segurança</label>
                    <div className="flex items-center gap-3 mt-1">
                      <Lock size={18} className="text-slate-600" />
                      <input type="password" className="bg-transparent w-full text-white outline-none font-bold" placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 font-black uppercase italic tracking-widest transition-all flex items-center justify-center gap-4 group">
                  ACEDER À GARAGEM <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>

                <button 
                  onClick={() => setIsLogin(false)}
                  className="w-full text-center text-slate-500 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors"
                >
                  Ainda não tem acesso? <span className="text-blue-600">Registe a sua matrícula aqui</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="space-y-6"
              >
                <button onClick={() => setIsLogin(true)} className="flex items-center gap-2 text-blue-600 font-black uppercase italic text-[10px] tracking-widest hover:text-white mb-4">
                  <ArrowLeft size={14} /> Voltar ao Login
                </button>
                
                <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">Novo Registo Técnico</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-b-2 border-slate-800 p-2">
                    <p className="text-[10px] font-black text-blue-600 uppercase">Proprietário</p>
                    <input className="bg-transparent w-full text-white text-sm outline-none font-bold" placeholder="NOME" />
                  </div>
                  <div className="border-b-2 border-slate-800 p-2">
                    <p className="text-[10px] font-black text-blue-600 uppercase">Contacto</p>
                    <input className="bg-transparent w-full text-white text-sm outline-none font-bold" placeholder="9XX..." />
                  </div>
                </div>

                <div className="bg-[#facc15] p-1 shadow-[4px_4px_0px_rgba(255,255,255,0.1)]">
                  <div className="bg-white border-2 border-black p-4 text-center">
                    <p className="text-[10px] font-black text-black/40 uppercase mb-1 tracking-widest">Matrícula do Veículo</p>
                    <input className="bg-transparent w-full text-center text-3xl font-mono font-black text-black outline-none uppercase" placeholder="00-AA-00" />
                  </div>
                </div>

                <button className="w-full bg-white text-black p-5 font-black uppercase italic tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-4">
                  VALIDAR VEÍCULO <ShieldCheck size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}