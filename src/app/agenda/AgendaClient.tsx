"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, ChevronRight, Wrench, Car, Settings, ChevronDown } from "lucide-react";

export default function AgendaClient({ userVehicles }: { userVehicles: any[] }) {
  const searchParams = useSearchParams();
  const plateFromUrl = searchParams.get("plate") || "";

  const [selectedPlate, setSelectedPlate] = useState(plateFromUrl);
  const [servico, setServico] = useState("");

  const getCarDisplayName = () => {
    const car = userVehicles.find(v => v.plate === selectedPlate);
    return car ? `${car.brand} ${car.model}` : "Selecione a Viatura";
  };

  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-4 font-sans text-white">
      <div className="absolute top-0 right-0 w-full h-[500px] opacity-20 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000" className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05070a]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
            MARCAR <span className="text-blue-600">VISITA</span>
          </h1>
          <p className="text-slate-400 font-bold mt-4 uppercase tracking-widest text-xs italic">
            {selectedPlate ? `Agendamento: ${getCarDisplayName()}` : "Simples, rápido e sem complicações."}
          </p>
        </div>

        <div className="bg-[#0d0f14] border-2 border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* PASSO 0: SELECT DE VIATURAS */}
          <div className="p-8 border-b border-white/5 bg-blue-600/5">
            <label className="text-blue-600 font-black uppercase text-xs tracking-widest block mb-4">0. Selecionar Viatura</label>
            <div className="relative">
              <select 
                value={selectedPlate}
                onChange={(e) => setSelectedPlate(e.target.value)}
                className="w-full bg-[#14171c] border-2 border-white/10 p-5 rounded-xl text-white font-black uppercase tracking-widest outline-none focus:border-blue-600 appearance-none cursor-pointer"
              >
                <option value="" disabled>Escolha o seu veículo...</option>
                {userVehicles.map((v) => (
                  <option key={v.id} value={v.plate} className="bg-[#0d0f14]">
                    {v.brand} {v.model} — ({v.plate})
                  </option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600"><ChevronDown size={24} /></div>
            </div>
          </div>

          {/* PASSO 1: MOTIVO */}
          <div className="p-8 border-b border-white/5">
            <label className="text-blue-600 font-black uppercase text-xs tracking-widest block mb-6">1. Motivo da visita?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'PNEUS', label: 'Pneus', img: '/assets/pneus.jpg' },
                { id: 'REVISAO', label: 'Revisão / Óleo', img: '/assets/oleo.png' },
                { id: 'TRAVOES', label: 'Travões', img: '/assets/travoes.jpg' },
                { id: 'MECANICA', label: 'Mecânica Geral', img: '/assets/mecanica.jpeg' },
                { id: 'LUZES', label: 'Eletrónica', img: '/assets/luzes.jpg' },
                { id: 'OUTRO', label: 'Outro Problema', img: '/assets/outro.jpg' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setServico(item.id)}
                  className={`relative h-26 rounded-xl overflow-hidden border-2 transition-all ${servico === item.id ? 'border-blue-600 scale-[1.05]' : 'border-transparent opacity-60'}`}
                >
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-black uppercase italic text-sm">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* PASSO 2: HORÁRIO */}
          <div className="p-8 bg-black/20">
            <label className="text-blue-600 font-black uppercase text-xs tracking-widest block mb-6">2. Horário</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-[#14171c] p-4 rounded-xl border border-white/5">
                <Calendar className="text-blue-600" /><input type="date" className="bg-transparent text-white font-bold outline-none w-full" />
              </div>
              <div className="flex items-center gap-4 bg-[#14171c] p-4 rounded-xl border border-white/5">
                <Clock className="text-blue-600" /><input type="time" className="bg-transparent text-white font-bold outline-none w-full" />
              </div>
            </div>
          </div>

          <div className="p-8">
            <button className="w-full bg-blue-600 hover:bg-white text-white hover:text-black py-6 rounded-xl font-black uppercase italic text-xl transition-all shadow-xl flex flex-col items-center justify-center">
                Marcar agendamento <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}