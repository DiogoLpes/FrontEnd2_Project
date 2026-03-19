"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, ChevronRight, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

export default function AgendaClient({ userVehicles }: { userVehicles: any[] }) {
  const searchParams = useSearchParams();
  const plateFromUrl = searchParams.get("plate") || "";

  // Estados
  const [selectedPlate, setSelectedPlate] = useState(plateFromUrl);
  const [servico, setServico] = useState("");
  const [subOpcao, setSubOpcao] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  const getCarDisplayName = () => {
    const car = userVehicles.find(v => v.plate === selectedPlate);
    return car ? `${car.brand} ${car.model}` : "Selecione a Viatura";
  };

  const handleFinalSubmit = () => {
    if (!selectedPlate || !servico || !data || !hora) {
      return Swal.fire({
        title: "Campos Incompletos",
        text: "Por favor, selecione a viatura, o serviço principal e o horário desejado.",
        icon: "info",
        confirmButtonColor: "#2563eb",
        background: "#0d0f14",
        color: "#fff"
      });
    }

    const resumo = `*TS PNEUS - NOVA RESERVA*%0A%0A🚗 *Viatura:* ${selectedPlate}%0A🛠️ *Serviço:* ${servico}${subOpcao ? ` (${subOpcao})` : ""}${extraInfo ? `%0A📝 *Obs:* ${extraInfo}` : ""}%0A📅 *Data:* ${data}%0A⏰ *Hora:* ${hora}`;
    
    window.open(`https://wa.me/351912345678?text=${resumo}`, "_blank");
    // Aqui redirecionas para o status depois de guardar na DB
  };

  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-4 font-sans text-white relative selection:bg-blue-600/30">
      {/* Background Decorativo - Suave */}
      <div className="absolute top-0 right-0 w-full h-[700px] opacity-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000" className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070a]/80 to-[#05070a]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Sistema de Agendamento</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            WORK <span className="text-blue-600 text-outline-sm">ORDER</span>
          </h1>
        </div>

        <div className="bg-[#0d0f14]/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* 0. SELEÇÃO DE VIATURA */}
          <div className="p-10 border-b border-white/5">
            <div className="flex items-center justify-between mb-6">
               <label className="text-blue-500 font-black uppercase text-[11px] tracking-[0.3em]">01. UNIDADE DE PERFORMANCE</label>
               {selectedPlate && <span className="text-[10px] font-mono text-slate-500">{getCarDisplayName()}</span>}
            </div>
            <div className="relative group">
              <select 
                value={selectedPlate}
                onChange={(e) => setSelectedPlate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white font-bold uppercase tracking-widest outline-none focus:border-blue-600/50 focus:bg-white/10 appearance-none cursor-pointer transition-all"
              >
                <option value="" disabled className="bg-[#0d0f14]">Selecione um carro da sua garagem...</option>
                {userVehicles.map((v) => (
                  <option key={v.id} value={v.plate} className="bg-[#0d0f14]">
                    {v.brand} {v.model} — [{v.plate}]
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-600 group-hover:scale-110 transition-transform" size={20} />
            </div>
          </div>

          {/* 1. SELEÇÃO DE SERVIÇO COM IMAGENS */}
          <div className="p-10 border-b border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
            <label className="text-blue-500 font-black uppercase text-[11px] tracking-[0.3em] block mb-8 text-center md:text-left">02. SELECIONAR INTERVENÇÃO</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'PNEUS', label: 'Pneus / Alinhamento', img: '/assets/pneus.jpg' }, // AJUSTA OS CAMINHOS AQUI
                { id: 'REVISAO', label: 'Óleo / Filtros', img: '/assets/oleo.png' },
                { id: 'TRAVOES', label: 'Travagem', img: '/assets/travoes.jpg' },
                { id: 'ELETRONICA', label: 'Eletrónica', img: '/assets/luzes.jpg' },
                { id: 'OUTRO', label: 'Outro Problema', img: '/assets/outro.jpg' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setServico(item.id); setSubOpcao(""); }}
                  className={`relative group h-28 rounded-2xl overflow-hidden border-2 transition-all flex flex-col items-center justify-center ${
                    servico === item.id 
                    ? 'border-blue-600 scale-[1.03] shadow-[0_0_30px_rgba(37,99,235,0.3)]' 
                    : 'border-white/5 hover:border-white/20 opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
                  }`}
                >
                  {/* IMAGEM DE FUNDO DO CARD */}
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                  
                  {/* OVERLAY ESCURO PARA LEITURA */}
                  <div className={`absolute inset-0 transition-colors ${servico === item.id ? 'bg-blue-900/70' : 'bg-black/60 group-hover:bg-black/50'}`} />
                  
                  {/* TEXTO DO SERVIÇO */}
                  <span className="relative z-10 font-black uppercase italic text-[12px] tracking-tight text-white text-center px-2">
                    {item.label}
                  </span>

                  {/* ÍCONE DE SELEÇÃO */}
                  {servico === item.id && <CheckCircle2 className="absolute top-2 right-2 text-blue-400 z-10" size={18} />}
                </button>
              ))}
            </div>

            {/* SUB-OPÇÕES DETALHADAS */}
            {servico && (
              <div className="mt-8 p-8 bg-black/40 rounded-3xl border border-white/5 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-outline-sm">Configuração de Serviço Técnico</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {servico === 'PNEUS' && ['Michelin', 'Continental', 'Bridgestone', 'Pirelli', 'Opção Económica', 'Alinhamento 3D', 'Equilibragem'].map(p => (
                    <button key={p} onClick={() => setSubOpcao(p)} className={`p-4 rounded-xl text-[10px] font-black uppercase border transition-all ${subOpcao === p ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-500'}`}>{p}</button>
                  ))}

                  {servico === 'REVISAO' && ['0W20 - Performance', '5W30 - Premium', '10W40 - Standard', '15W40 - Diesel/Heavy', 'Filtro de Óleo', 'Check-up'].map(o => (
                    <button key={o} onClick={() => setSubOpcao(o)} className={`p-4 rounded-xl text-[10px] font-black uppercase border transition-all ${subOpcao === o ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-500'}`}>{o}</button>
                  ))}

                  {servico === 'ELETRONICA' && ['Luzes Dianteiras', 'Luzes Traseiras', 'Diagnóstico OBD2', 'Bateria', 'Alternador', 'Sensores'].map(e => (
                    <button key={e} onClick={() => setSubOpcao(e)} className={`p-4 rounded-xl text-[10px] font-black uppercase border transition-all ${subOpcao === e ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-500'}`}>{e}</button>
                  ))}

                  {(servico === 'OUTRO' || servico === 'TRAVOES') && (
                    <textarea 
                      placeholder="Descreva aqui o sintoma ou peça necessária..." 
                      className="col-span-full w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-xs font-bold outline-none focus:border-blue-600/50 min-h-[120px] placeholder:text-slate-700 uppercase tracking-widest"
                      onChange={(e) => setExtraInfo(e.target.value)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 2. PROGRAMAÇÃO DATA/HORA */}
          <div className="p-10 bg-black/40">
            <label className="text-blue-500 font-black uppercase text-[11px] tracking-[0.3em] block mb-8">03. PROGRAMAÇÃO TÉCNICA</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group flex items-center bg-white/5 p-6 rounded-2xl border border-white/10 focus-within:border-blue-600/50 transition-all">
                <Calendar className="text-blue-600 mr-4" size={24} />
                <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="bg-transparent text-white font-black uppercase outline-none w-full text-sm cursor-pointer" />
              </div>
              <div className="relative group flex items-center bg-white/5 p-6 rounded-2xl border border-white/10 focus-within:border-blue-600/50 transition-all">
                <Clock className="text-blue-600 mr-4" size={24} />
                <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} className="bg-transparent text-white font-black uppercase outline-none w-full text-sm cursor-pointer" />
              </div>
            </div>
          </div>

          {/* 3. SUBMISSÃO */}
          <div className="p-10 pt-4">
            <button 
              onClick={handleFinalSubmit}
              className="group relative w-full bg-blue-600 hover:bg-white text-white hover:text-black py-10 rounded-[2rem] font-black uppercase italic text-3xl transition-all flex flex-col items-center justify-center overflow-hidden shadow-[0_15px_40px_rgba(37,99,235,0.4)]"
            >
              <div className="flex items-center gap-4 relative z-10">
                EXECUTAR AGENDAMENTO <ChevronRight className="group-hover:translate-x-2 transition-transform" size={28} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                <span className="h-[1px] w-full bg-white/20"></span>
                <p className="text-[9px] font-black uppercase tracking-[0.5em] whitespace-nowrap">Secure Transmission</p>
                <span className="h-[1px] w-full bg-white/20"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}