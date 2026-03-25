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
    <div className="relative min-h-screen pt-28 pb-20 px-4 text-white font-sans selection:bg-blue-600 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')] bg-cover bg-center bg-fixed opacity-20" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/80 to-[#05070a]" />
      <div className="relative z-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-right-8 duration-700">
        
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
        <div className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden mb-6">
          {/* Decoração de Fundo */}
          <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none select-none mix-blend-overlay">
            <h1 className="text-[14rem] font-black italic leading-none">TS</h1>
          </div>

          {/* Cabeçalho */}
          <div className="p-10 pb-6 relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <div className="h-[3px] w-12 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
               <span className="text-blue-400 font-black uppercase text-[11px] tracking-[0.5em]">Tracking System</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-white">
              {active.brand} <br/><span className="text-blue-500" style={{WebkitTextStroke: '1px rgba(255,255,255,0.1)'}}>{active.model}</span>
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-4">
                <div className="bg-black/50 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/10 shadow-inner">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Unidade</p>
                    <p className="text-2xl font-black italic text-white tracking-tight">{active.plate}</p>
                </div>
                <div className="bg-black/50 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/10 shadow-inner">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Intervenção</p>
                    <p className="text-2xl font-black italic text-blue-400 tracking-tight">{active.type}</p>
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
          <div className="p-8 bg-gradient-to-t from-black/80 to-transparent relative z-10 border-t border-white/5 mt-4">
            {active.status === "ORCAMENTADO" ? (
              <div className="bg-blue-600 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-[0_20px_50px_rgba(37,99,235,0.4)]">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                 <div className="relative z-10">
                    <h3 className="font-black italic uppercase text-2xl mb-6 flex items-center gap-3">
                       <Calendar size={28}/> Proposta Comercial
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white/10 hover:bg-black/40 transition-colors">
                            <p className="text-[10px] font-black uppercase text-white/50 mb-2 tracking-[0.3em]">Valor Final</p>
                            <p className="text-4xl font-black italic tracking-tighter text-white">{active.price ? `${active.price}€` : "A DEFINIR"}</p>
                        </div>
                        <div className="bg-black/30 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white/10 hover:bg-black/40 transition-colors">
                            <p className="text-[10px] font-black uppercase text-white/50 mb-2 tracking-[0.3em]">Agendamento Aprovado</p>
                            <p className="text-2xl font-black italic leading-none uppercase text-white">
                                {active.date ? new Date(active.date).toLocaleDateString() : 'A VALIDAR'}<br/>
                                <span className="text-base text-blue-200 opacity-80">{active.date ? new Date(active.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '--:--'}h</span>
                            </p>
                        </div>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="border border-white/10 bg-black/40 backdrop-blur-md rounded-[2rem] p-10 text-center border-dashed">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 italic leading-relaxed">
                  O Armindo está a analisar a sua viatura.<br/>
                  <span className="text-blue-500 mt-2 block">Receberá os detalhes técnicos aqui em breve.</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* NOTAS TÉCNICAS */}
        <div className="p-8 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex flex-col md:flex-row items-start gap-8 shadow-2xl">
            <div className="bg-blue-600/20 p-5 rounded-3xl border border-blue-500/30">
                <Gauge className="text-blue-400" size={32} />
            </div>
            <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500 mb-3">Reporte Técnico</h4>
                <p className="text-sm font-bold uppercase italic text-slate-300 leading-relaxed tracking-wider border-l-2 border-white/10 pl-4">
                   {active.description || "Nenhuma nota técnica preenchida até ao momento. Aguarde atualizações da oficina."}
                </p>
            </div>
        </div>
        
      </div>
    </div>
  );
}