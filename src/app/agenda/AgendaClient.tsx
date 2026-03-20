"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, ChevronRight, ChevronDown, CheckCircle2, Droplets, Wrench } from "lucide-react";
import Swal from "sweetalert2";
import { createBooking } from "../../app/_actions/booking"; 

export default function AgendaClient({ userVehicles = [] }: { userVehicles: any[] }) {
  const searchParams = useSearchParams();
  const plateFromUrl = searchParams.get("plate") || "";

  // Estados do Formulário
  const [selectedPlate, setSelectedPlate] = useState(plateFromUrl);
  const [servico, setServico] = useState("");
  const [subOpcao, setSubOpcao] = useState("");
  const [medidaPneu, setMedidaPneu] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCarDisplayName = () => {
    const car = (userVehicles || []).find(v => v.plate === selectedPlate);
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
        medidaPneu: medidaPneu,
        extraInfo: extraInfo,
        date: data,
        hour: hora
      });

      if (result.success) {
        const msg = `*TS PNEUS - NOVA RESERVA*%0A%0A🚗 *Viatura:* ${selectedPlate}%0A🛠️ *Serviço:* ${servico}${subOpcao ? ` (${subOpcao})` : ""}${medidaPneu ? `%0A📏 *Medida:* ${medidaPneu}` : ""}${extraInfo ? `%0A📝 *Obs:* ${extraInfo}` : ""}%0A📅 *Data:* ${data}%0A⏰ *Hora:* ${hora}`;
        
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
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            WORK <span className="text-blue-600">ORDER</span>
          </h1>
          <p className="text-slate-400 font-bold mt-4 uppercase tracking-widest text-[10px] italic">
            {selectedPlate ? `Unidade: ${getCarDisplayName()}` : "Selecione a sua unidade de performance"}
          </p>
        </div>

        <div className="bg-[#0d0f14]/60 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
          
          {/* 01. VIATURA (Com correção para o erro .map) */}
          <div className="p-8 border-b border-white/5 bg-blue-600/5">
            <label className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] block mb-4">01. IDENTIFICAÇÃO DA UNIDADE</label>
            <div className="relative">
              <select 
                value={selectedPlate}
                onChange={(e) => setSelectedPlate(e.target.value)}
                className="w-full bg-[#14171c] border border-white/10 p-5 rounded-2xl text-white font-bold uppercase outline-none focus:border-blue-600 appearance-none cursor-pointer"
              >
                <option value="" disabled>Escolha o veículo...</option>
                {(userVehicles || []).map((v) => (
                  <option key={v.id} value={v.plate} className="bg-[#0d0f14]">{v.brand} {v.model} — [{v.plate}]</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600"><ChevronDown size={24} /></div>
            </div>
          </div>

          {/* 02. SERVIÇOS (CARDS MAIORES) */}
          <div className="p-8 border-b border-white/5">
            <label className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] block mb-6">02. ESPECIFICAÇÃO DO SERVIÇO</label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 'PNEUS', label: 'Pneus / Alinhamento', img: '/assets/pneus.jpg' },
                { id: 'OLEO', label: 'Mudança de Óleo', img: '/assets/oleo.png' },
                { id: 'REVISAO', label: 'Revisão Completa', img: '/assets/mecanica.jpeg' },
                { id: 'TRAVOES', label: 'Sistema Travagem', img: '/assets/travoes.jpg' },
                { id: 'ELETRONICA', label: 'Eletrónica / Luzes', img: '/assets/eletronico.jpg' },
                { id: 'OUTRO', label: 'Outro Problema', img: '/assets/outro.jpg' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setServico(item.id); setSubOpcao(""); setMedidaPneu(""); }}
                  className={`relative h-40 rounded-3xl overflow-hidden border-2 transition-all group ${servico === item.id ? 'border-blue-600 scale-[1.02] shadow-[0_0_30px_rgba(37,99,235,0.2)]' : 'border-white/5 opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}
                >
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                  <div className={`absolute inset-0 ${servico === item.id ? 'bg-blue-900/70' : 'bg-black/70'}`} />
                  <span className="relative z-10 font-black uppercase italic text-xs px-4 text-center">{item.label}</span>
                  {servico === item.id && <CheckCircle2 className="absolute top-4 right-4 text-blue-400" size={20} />}
                </button>
              ))}
            </div>

            {/* DETALHES DINÂMICOS */}
            {servico && (
              <div className="mt-8 p-8 bg-black/40 rounded-[2rem] border border-white/5 animate-in fade-in slide-in-from-top-4">
                
                {/* Se for ÓLEO: Escolha Viscosidade */}
                {servico === 'OLEO' && (
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase text-blue-400 flex items-center gap-2"><Droplets size={14}/> Viscosidade do Óleo</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['0W20', '5W30', '5W40', '10W40', '15W40'].map(v => (
                        <button key={v} onClick={() => setSubOpcao(v)} className={`p-4 rounded-xl text-[10px] font-bold border transition-all ${subOpcao === v ? 'bg-blue-600 border-blue-600' : 'border-white/10 text-slate-500'}`}>{v}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Se for PNEUS: Escolha Gama e Medida */}
                {servico === 'PNEUS' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Económica', 'Premium', 'Performance', 'Alinhamento'].map(p => (
                        <button key={p} onClick={() => setSubOpcao(p)} className={`p-4 rounded-xl text-[10px] font-bold uppercase border transition-all ${subOpcao === p ? 'bg-blue-600 border-blue-600' : 'border-white/10 text-slate-500'}`}>{p}</button>
                      ))}
                    </div>
                    <input 
                      type="text" 
                      placeholder="MEDIDA (EX: 225/45 R17)" 
                      className="w-full bg-[#14171c] border border-white/10 p-5 rounded-xl text-xs font-bold uppercase outline-none focus:border-blue-600"
                      onChange={(e) => setMedidaPneu(e.target.value)}
                    />
                  </div>
                )}

                {/* Outros Serviços / Notas */}
                {(servico === 'REVISAO' || servico === 'TRAVOES' || servico === 'ELETRONICA' || servico === 'OUTRO') && (
                  <textarea 
                    placeholder="DESCREVA O QUE PRECISA OU O SINTOMA DA VIATURA..." 
                    className="w-full bg-[#14171c] border border-white/10 rounded-2xl p-6 text-xs font-bold uppercase outline-none focus:border-blue-600 min-h-[120px]"
                    onChange={(e) => setExtraInfo(e.target.value)}
                  />
                )}
              </div>
            )}
          </div>

          {/* 03. DATA E HORA */}
          <div className="p-8 bg-black/20 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 bg-[#14171c] p-5 rounded-2xl border border-white/10 focus-within:border-blue-600">
              <Calendar className="text-blue-600" />
              <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="bg-transparent text-white font-bold uppercase outline-none w-full text-sm" />
            </div>
            <div className="flex items-center gap-4 bg-[#14171c] p-5 rounded-2xl border border-white/10 focus-within:border-blue-600">
              <Clock className="text-blue-600" />
              <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} className="bg-transparent text-white font-bold uppercase outline-none w-full text-sm" />
            </div>
          </div>

          {/* SUBMIT BUTTON (Equilibrado) */}
          <div className="p-10 text-center">
            <button 
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="group relative w-full md:w-2/3 mx-auto bg-blue-600 hover:bg-white text-white hover:text-black py-6 rounded-2xl font-black uppercase italic text-xl transition-all shadow-2xl flex items-center justify-center gap-4 overflow-hidden disabled:opacity-50"
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