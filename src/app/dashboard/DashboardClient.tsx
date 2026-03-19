"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, ChevronRight, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";
import { createBooking } from "../../app/_actions/booking"; // Certifique-se de criar esta action

export default function AgendaClient({ userVehicles }: { userVehicles: any[] }) {
  const searchParams = useSearchParams();
  const plateFromUrl = searchParams.get("plate") || "";

  // Estados do Formulário
  const [selectedPlate, setSelectedPlate] = useState(plateFromUrl);
  const [servico, setServico] = useState("");
  const [subOpcao, setSubOpcao] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCarDisplayName = () => {
    const car = userVehicles.find(v => v.plate === selectedPlate);
    return car ? `${car.brand} ${car.model}` : "Selecione a Viatura";
  };

  const handleFinalSubmit = async () => {
    if (!selectedPlate || !servico || !data || !hora) {
      return Swal.fire("Atenção", "Preencha a viatura, serviço e horário.", "warning");
    }

    setIsSubmitting(true);
    
    Swal.fire({
      title: "A REGISTAR...",
      text: "A preparar a sua ordem de serviço",
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      const result = await createBooking({
        plate: selectedPlate,
        service: servico,
        subService: subOpcao,
        extraInfo: extraInfo,
        date: data,
        hour: hora
      });

      if (result.success) {
        const msg = `*TS PNEUS - NOVA RESERVA*%0A%0A🚗 *Viatura:* ${selectedPlate}%0A🛠️ *Serviço:* ${servico}${subOpcao ? ` (${subOpcao})` : ""}${extraInfo ? `%0A📝 *Obs:* ${extraInfo}` : ""}%0A📅 *Data:* ${data}%0A⏰ *Hora:* ${hora}`;
        
        await Swal.fire({
          title: "RESERVA REGISTADA!",
          text: "Redirecionando para o WhatsApp para validação.",
          icon: "success",
          confirmButtonColor: "#2563eb"
        });

        window.open(`https://wa.me/351912345678?text=${msg}`, "_blank");
        window.location.href = "/status";
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire("Erro", "Falha ao gravar reserva. Tente novamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-4 font-sans text-white relative">
      {/* BG DECORATIVO */}
      <div className="absolute top-0 right-0 w-full h-[600px] opacity-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000" className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05070a]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            WORK <span className="text-blue-600">ORDER</span>
          </h1>
          <p className="text-slate-400 font-bold mt-4 uppercase tracking-widest text-[10px] italic flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            {selectedPlate ? `Viatura: ${getCarDisplayName()}` : "Selecione a sua unidade"}
            <span className="w-8 h-[1px] bg-blue-600"></span>
          </p>
        </div>

        <div className="bg-[#0d0f14]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* PASSO 0: VIATURA */}
          <div className="p-8 border-b border-white/5 bg-blue-600/5">
            <label className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] block mb-4">01. IDENTIFICAÇÃO DA UNIDADE</label>
            <div className="relative">
              <select 
                value={selectedPlate}
                onChange={(e) => setSelectedPlate(e.target.value)}
                className="w-full bg-[#14171c] border border-white/10 p-5 rounded-2xl text-white font-bold uppercase tracking-widest outline-none focus:border-blue-600 appearance-none cursor-pointer transition-all"
              >
                <option value="" disabled>Escolha o veículo...</option>
                {userVehicles.map((v) => (
                  <option key={v.id} value={v.plate} className="bg-[#0d0f14]">{v.brand} {v.model} — [{v.plate}]</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600"><ChevronDown size={24} /></div>
            </div>
          </div>

          {/* PASSO 1: SERVIÇOS COM AS TUAS FOTOS */}
          <div className="p-8 border-b border-white/5">
            <label className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] block mb-6">02. ESPECIFICAÇÃO DO SERVIÇO</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { id: 'PNEUS', label: 'Pneus', img: '/assets/pneus.jpg' },
                { id: 'REVISAO', label: 'Óleo', img: '/assets/oleo.png' },
                { id: 'TRAVOES', label: 'Travões', img: '/assets/travoes.jpeg' },
                { id: 'ELETRONICA', label: 'Luzes', img: '/assets/luzes.jpg' },
                { id: 'OUTRO', label: 'Outro', img: '/assets/outro.jpg' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setServico(item.id); setSubOpcao(""); }}
                  className={`relative h-28 rounded-2xl overflow-hidden border-2 transition-all group ${servico === item.id ? 'border-blue-600 scale-[1.05] shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'border-transparent opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}
                >
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                  <div className={`absolute inset-0 ${servico === item.id ? 'bg-blue-900/60' : 'bg-black/60'}`} />
                  <div className="absolute inset-0 flex items-center justify-center p-2 text-center font-black uppercase italic text-[10px] leading-none z-10">{item.label}</div>
                  {servico === item.id && <CheckCircle2 className="absolute top-2 right-2 text-blue-400 z-20" size={16} />}
                </button>
              ))}
            </div>

            {/* SUB-OPÇÕES */}
            {servico && (
              <div className="mt-8 p-6 bg-white/5 rounded-3xl border border-white/5 animate-in fade-in slide-in-from-top-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-4">Detalhes Técnicos</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {servico === 'PNEUS' && ['Michelin', 'Continental', 'Alinhamento 3D', 'Equilibragem'].map(p => (
                    <button key={p} onClick={() => setSubOpcao(p)} className={`p-3 rounded-xl text-[10px] font-bold uppercase border transition-all ${subOpcao === p ? 'bg-blue-600 border-blue-600' : 'border-white/10 text-slate-500'}`}>{p}</button>
                  ))}
                  {servico === 'REVISAO' && ['5W30 Premium', '10W40 Standard', '15W40 Heavy', 'Filtros'].map(o => (
                    <button key={o} onClick={() => setSubOpcao(o)} className={`p-3 rounded-xl text-[10px] font-bold uppercase border transition-all ${subOpcao === o ? 'bg-blue-600 border-blue-600' : 'border-white/10 text-slate-500'}`}>{o}</button>
                  ))}
                  {servico === 'ELETRONICA' && ['Luzes Dianteiras', 'Luzes Traseiras', 'Bateria', 'Diagnóstico'].map(e => (
                    <button key={e} onClick={() => setSubOpcao(e)} className={`p-3 rounded-xl text-[10px] font-bold uppercase border transition-all ${subOpcao === e ? 'bg-blue-600 border-blue-600' : 'border-white/10 text-slate-500'}`}>{e}</button>
                  ))}
                  {servico === 'OUTRO' && (
                    <textarea 
                      placeholder="ESPECIFIQUE O PROBLEMA..." 
                      className="col-span-full w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[10px] font-bold outline-none focus:border-blue-600 min-h-[80px] uppercase"
                      onChange={(e) => setExtraInfo(e.target.value)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PASSO 2: DATA/HORA */}
          <div className="p-8 bg-black/20">
            <label className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] block mb-6">03. PROGRAMAÇÃO TÉCNICA</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-[#14171c] p-5 rounded-2xl border border-white/10 focus-within:border-blue-600 transition-all">
                <Calendar className="text-blue-600" />
                <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="bg-transparent text-white font-bold uppercase outline-none w-full text-sm" />
              </div>
              <div className="flex items-center gap-4 bg-[#14171c] p-5 rounded-2xl border border-white/10 focus-within:border-blue-600 transition-all">
                <Clock className="text-blue-600" />
                <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} className="bg-transparent text-white font-bold uppercase outline-none w-full text-sm" />
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="p-8">
            <button 
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="group relative w-full bg-blue-600 hover:bg-white text-white hover:text-black py-8 rounded-[2rem] font-black uppercase italic text-2xl transition-all shadow-[0_15px_40px_rgba(37,99,235,0.3)] flex items-center justify-center gap-4 overflow-hidden disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isSubmitting ? "A PROCESSAR..." : "CONFIRMAR AGENDAMENTO"} <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}