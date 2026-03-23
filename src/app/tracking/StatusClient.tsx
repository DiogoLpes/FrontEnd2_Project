"use client";

import { useState } from "react";
import { Car, Clock, Euro, CheckCircle2, Calendar, ChevronRight, Gauge } from "lucide-react";

export default function StatusClient({ bookings }: { bookings: any[] }) {
  // Começamos selecionando a primeira marcação da lista
  const [selectedId, setSelectedId] = useState(bookings[0]?.id);
  const active = bookings.find(b => b.id === selectedId) || bookings[0];

  const steps = [
    { label: "SOLICITADO", desc: "Análise", icon: <Clock size={18} /> },
    { label: "ORCAMENTADO", desc: "Proposta", icon: <Euro size={18} /> },
    { label: "EM_REPARACAO", desc: "Oficina", icon: <Gauge size={18} /> },
    { label: "CONCLUIDO", desc: "Pronto", icon: <CheckCircle2 size={18} /> }
  ];

  const currentIdx = steps.findIndex(s => s.label === active.status);

  return (
    <div className="min-h-screen bg-[#05070a] pt-28 pb-20 px-4 text-white font-sans selection:bg-blue-600">
      <div className="max-w-3xl mx-auto">
        
        {/* SELETOR DE MÚLTIPLAS VIATURAS */}
        {bookings.length > 1 && (
          <div className="flex gap-3 mb-8 overflow-x-auto pb-4 no-scrollbar">
            {bookings.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedId(b.id)}
                className={`flex-shrink-0 px-6 py-4 rounded-2xl border font-black italic uppercase text-[10px] tracking-widest transition-all ${
                  selectedId === b.id 
                  ? 'bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] scale-105' 
                  : 'bg-[#0a0c10] border-white/5 text-slate-500 hover:border-white/20'
                }`}
              >
                {b.brand} <span className="opacity-50 ml-1">[{b.plate}]</span>
              </button>
            ))}
          </div>
        )}

        {/* CARD PRINCIPAL (FICHA TÉCNICA) */}
        <div className="relative bg-[#0a0c10] border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden mb-6">
          {/* Decoração de Fundo */}
          <div className="absolute -top-10 -right-10 opacity-[0.02] pointer-events-none select-none">
            <h1 className="text-[12rem] font-black italic leading-none">TS</h1>
          </div>

          {/* Cabeçalho */}
          <div className="p-8 pb-4">
            <div className="flex items-center gap-2 mb-4">
               <div className="h-[2px] w-8 bg-blue-600"></div>
               <span className="text-blue-500 font-black uppercase text-[10px] tracking-[0.4em]">Tracking System</span>
            </div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-[0.8]">
              {active.brand} <span className="text-blue-600">{active.model}</span>
            </h1>
            <div className="mt-6 flex items-center gap-4">
                <div className="bg-[#14171c] px-4 py-2 rounded-lg border border-white/5">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Matrícula</p>
                    <p className="text-sm font-black italic text-white">{active.plate}</p>
                </div>
                <div className="bg-[#14171c] px-4 py-2 rounded-lg border border-white/5">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Serviço</p>
                    <p className="text-sm font-black italic text-blue-500">{active.type}</p>
                </div>
            </div>
          </div>

          {/* STEPPER DINÂMICO */}
          <div className="px-8 py-10 relative">
            <div className="grid grid-cols-4 gap-3 relative">
              {steps.map((step, idx) => {
                const isDone = idx < currentIdx;
                const isCurrent = idx === currentIdx;
                
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    {/* Linha de Progresso */}
                    <div className={`w-full h-[3px] rounded-full mb-6 transition-all duration-1000 ${
                        isDone || isCurrent ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]' : 'bg-white/5'
                    }`} />
                    
                    {/* Ícone */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500 ${
                        isCurrent ? 'bg-blue-600 text-white scale-125 shadow-xl shadow-blue-600/40 rotate-[-5deg]' : 
                        isDone ? 'bg-blue-900/30 text-blue-400 border border-blue-500/20' : 'bg-[#14171c] text-slate-700'
                    }`}>
                      {isDone ? <CheckCircle2 size={22} /> : step.icon}
                    </div>
                    
                    {/* Texto */}
                    <span className={`text-[9px] font-black uppercase tracking-tighter leading-none ${isCurrent ? 'text-white' : 'text-slate-600'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RESULTADO (ORÇAMENTO) */}
          <div className="p-8 bg-gradient-to-t from-black/40 to-transparent">
            {active.status === "ORCAMENTADO" ? (
              <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                 <div className="relative z-10">
                    <h3 className="font-black italic uppercase text-2xl mb-6 flex items-center gap-2">
                       <Calendar size={24}/> Orçamento & Data
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                            <p className="text-[9px] font-black uppercase text-white/50 mb-1 tracking-widest">Valor</p>
                            <p className="text-3xl font-black italic tracking-tighter">{active.price ? `${active.price}€` : "A DEFINIR"}</p>
                        </div>
                        <div className="bg-black/20 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                            <p className="text-[9px] font-black uppercase text-white/50 mb-1 tracking-widest">Agendamento</p>
                            <p className="text-lg font-black italic leading-none uppercase">
                                {active.date ? new Date(active.date).toLocaleDateString() : 'A VALIDAR'}<br/>
                                <span className="text-sm text-blue-200">{active.date ? new Date(active.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '--:--'}h</span>
                            </p>
                        </div>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="border border-white/5 bg-white/[0.02] rounded-3xl p-8 text-center border-dashed">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">
                  O Armindo está a analisar o seu pedido.<br/>
                  <span className="text-blue-600">Receberá os detalhes aqui em breve.</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* NOTAS TÉCNICAS */}
        <div className="p-8 bg-[#0a0c10] border border-white/5 rounded-[2rem] flex items-start gap-6">
            <div className="bg-blue-600/10 p-4 rounded-2xl">
                <Gauge className="text-blue-600" size={24} />
            </div>
            <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Histórico / Descrição</h4>
                <p className="text-xs font-bold uppercase italic text-slate-400 leading-relaxed tracking-wide">
                   {active.description || "Nenhuma nota adicional fornecida pelo cliente."}
                </p>
            </div>
        </div>
        
      </div>
    </div>
  );
}