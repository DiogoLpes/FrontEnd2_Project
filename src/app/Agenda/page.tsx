"use client";

import React, { useState } from "react";
import { Calendar, Clock, ChevronRight, MessageSquare, Wrench, Car, Settings } from "lucide-react";

export default function AgendarPage() {
  const [servico, setServico] = useState("");

  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-4 font-sans">
      
      {/* IMAGEM DE FUNDO SUBTIL (ESTILO OFICINA) */}
      <div className="absolute top-0 right-0 w-full h-[500px] opacity-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000" 
          alt="Oficina Background" 
          className="w-full h-full object-cover mask-gradient" // Precisas de um gradient para suavizar
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05070a]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* CABEÇALHO DIRETO */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
            MARCAR <span className="text-blue-600">VISITA</span>
          </h1>
          <p className="text-slate-400 font-bold mt-4">Simples, rápido e sem complicações.</p>
        </div>

        <div className="bg-[#0d0f14] border-2 border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* PASSO 1: O QUE PRECISA? */}
          <div className="p-8 border-b border-white/5">
            <label className="text-blue-600 font-black uppercase text-xs tracking-widest block mb-6">
              1. Qual é o motivo da visita?
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'pneus', label: 'Pneus', img: '/assets/pneus.jpg' },
                { id: 'revisao', label: 'Revisão / Óleo', img: '/assets/oleo.png' },
                { id: 'travoes', label: 'Travões', img: '/assets/travoes.jpg' },
                { id: 'mecanica', label: 'Mecânica Geral', img: '/assets/mecanica.jpeg' },
                { id: 'luzes', label: 'Eletrónica', img: '/assets/luzes.jpg' },
                { id: 'outro', label: 'Outro Problema', img: '/assets/outro.jpg' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setServico(item.id)}
                  type="button"
                  className={`relative h-26 rounded-xl overflow-hidden group transition-all border-2 ${
                    servico === item.id ? 'border-blue-600 scale-[1.05]' : 'border-transparent'
                  }`}
                >
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/40`}>
                    <span className="text-white font-black uppercase italic text-sm">{item.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* SE FOR "OUTRO", MOSTRA CAMPO DE TEXTO */}
            {servico === 'outro' && (
              <div className="mt-6 animate-in slide-in-from-top duration-300">
                <textarea 
                  className="w-full bg-black/40 border border-white/10 p-4 text-white font-bold rounded-xl outline-none focus:border-blue-600"
                  placeholder="Explique-nos brevemente o que se passa com o carro..."
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* PASSO 2: QUANDO? */}
          <div className="p-8 bg-black/20">
            <label className="text-blue-600 font-black uppercase text-xs tracking-widest block mb-6">
              2. Escolha o melhor horário
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-[#14171c] p-4 rounded-xl border border-white/5">
                <Calendar className="text-white" />
                <input type="date" className="bg-transparent text-white font-bold outline-none w-full brightness-50" />
              </div>
              <div className="flex items-center gap-4 bg-[#14171c] p-4 rounded-xl border border-white/5">
                <Clock className="text-white" />
                <input type="time" className="bg-transparent text-white font-bold outline-none w-full brightness-50" />
              </div>
            </div>
          </div>

          {/* BOTÃO FINAL */}
          <div className="p-8">
            <button className="w-full bg-blue-600 hover:bg-white text-white hover:text-black py-6 rounded-xl font-black uppercase italic text-xl transition-all shadow-xl flex items-center justify-center gap-4 group">
              CONFIRMAR MARCAÇÃO
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-center text-slate-500 text-[10px] font-bold uppercase mt-4 tracking-widest">
              A nossa equipa entrará em contacto para confirmar o serviço.
            </p>
          </div>
        </div>

        {/* DETALHE DE DESIGN: ICONES DE CARRO NO FUNDO */}
        <div className="mt-12 flex justify-center gap-12 opacity-20">
           <Wrench size={32} className="text-slate-500" />
           <Car size={32} className="text-slate-500" />
           <Settings size={32} className="text-slate-500" />
        </div>
      </div>
    </div>
  );
}