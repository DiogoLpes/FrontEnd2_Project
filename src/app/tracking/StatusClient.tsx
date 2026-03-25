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

  const mappedStatus = active.status === "PENDENTE" ? "SOLICITADO" : active.status;
  const currentIdx = steps.findIndex(s => s.label === mappedStatus);

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
        <div className="relative bg-[#0d0f14] border border-white/10 rounded-3xl shadow-2xl overflow-hidden mb-6">
          {/* Cabeçalho */}
          <div className="p-8 pb-6 relative z-10 border-b border-white/5">
            <div className="flex items-center gap-3 mb-4">
               <div className="h-1.5 w-8 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
               <span className="text-blue-400 font-bold uppercase text-[10px] tracking-[0.2em]">Ticket #00{active.id}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none text-white">
              {active.brand} <span className="text-blue-500/80">{active.model}</span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="bg-black/30 px-6 py-3 rounded-xl border border-white/5">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Matrícula</p>
                    <p className="text-xl font-bold italic text-white tracking-tight">{active.plate}</p>
                </div>
                <div className="bg-black/30 px-6 py-3 rounded-xl border border-white/5">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Intervenção</p>
                    <p className="text-xl font-bold italic text-blue-400 tracking-tight">{active.type}</p>
                </div>
            </div>
          </div>

          {/* STEPPER DINÂMICO */}
          <div className="px-8 py-8 relative">
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
          <div className="p-6 bg-[#07090c] relative z-10 border-t border-white/5">
            {currentIdx >= 1 ? (
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group">
                 <div className="relative z-10">
                    <h3 className="font-bold uppercase text-lg mb-4 text-blue-400 flex items-center gap-2">
                       <Calendar size={18}/> Detalhes Financeiros e de Agendamento
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/50 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] uppercase text-slate-400 mb-1 tracking-wider">Valor Final</p>
                            <p className="text-2xl font-black text-white">{active.price ? `${active.price}€` : "A DEFINIR"}</p>
                        </div>
                        <div className="bg-black/50 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] uppercase text-slate-400 mb-1 tracking-wider">Agendamento Oficial</p>
                            <p className="text-lg font-bold uppercase text-white leading-tight">
                                {active.date ? new Date(active.date).toLocaleDateString() : 'A VALIDAR'}<br/>
                                <span className="text-sm text-blue-300 font-medium">{active.date ? new Date(active.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '--:--'}</span>
                            </p>
                        </div>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="bg-black/40 rounded-2xl p-8 text-center border border-dashed border-white/10">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  O painel aguarda validação da oficina.<br/>
                  <span className="text-blue-500 font-bold mt-1 block">Receberá atualizações aqui em breve.</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* NOTAS TÉCNICAS */}
        <div className="p-6 bg-[#0a0c10] border border-white/10 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-xl">
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