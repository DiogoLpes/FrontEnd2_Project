"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight, ChevronDown, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";
// Importamos a função com o nome que tens no teu arquivo de Actions
import { createBooking } from "../../app/_actions/booking"; 

export default function AgendaClient({ userVehicles = [] }: { userVehicles: any[] }) {
  const searchParams = useSearchParams();
  const plateFromUrl = searchParams.get("plate") || "";

  const [selectedPlate, setSelectedPlate] = useState(plateFromUrl);
  const [servico, setServico] = useState("");
  const [subOpcao, setSubOpcao] = useState("");
  const [medidaPneu, setMedidaPneu] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formatação visual da matrícula no seletor
  const formatPlate = (plate: string) => {
    const clean = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
    return clean.match(/.{1,2}/g)?.join("-") || clean;
  };

  const handleFinalSubmit = async () => {
    // Agora não validamos data/hora, apenas veículo e serviço
    if (!selectedPlate || !servico) {
      return Swal.fire({ 
        title: "Dados Incompletos", 
        text: "Por favor selecione a viatura e o serviço pretendido.", 
        icon: "warning", 
        background: "#0d0f14", 
        color: "#fff" 
      });
    }

    setIsSubmitting(true);
    Swal.fire({ title: "A ENVIAR PEDIDO...", allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

    // Preparamos a descrição que vai para o campo 'description' do Prisma
    const descricaoTecnica = medidaPneu 
      ? `[MEDIDA: ${medidaPneu}] ${subOpcao} - ${extraInfo}` 
      : `${subOpcao} - ${extraInfo}`;

    try {
      const result = await createBooking({
        plate: selectedPlate,
        type: servico, // Envia o ID do serviço (PNEUS, OLEO, etc)
        description: descricaoTecnica,
      });

      if (result) {
        const msg = `*TS PNEUS - NOVO PEDIDO*%0A🚗 *Viatura:* ${selectedPlate}%0A🛠️ *Serviço:* ${servico}%0A📝 *Obs:* ${descricaoTecnica}`;
        
        await Swal.fire({ 
          title: "PEDIDO ENVIADO!", 
          text: "O técnico irá analisar e propor uma data e orçamento em breve.",
          icon: "success", 
          confirmButtonColor: "#2563eb",
          background: "#0d0f14",
          color: "#fff"
        });

        window.open(`https://wa.me/351912345678?text=${msg}`, "_blank");
        window.location.href = "/tracking?plate=" + selectedPlate; 
      }
    } catch (error: any) {
      Swal.fire({
        title: "Erro no Servidor",
        text: error.message || "Não foi possível registar o pedido.",
        icon: "error",
        background: "#0d0f14",
        color: "#fff"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] pt-24 pb-20 px-4 text-white">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            WORK <span className="text-blue-600">ORDER</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
             <div className="h-px w-8 bg-blue-600"></div>
             <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[9px]">Check-in Performance</p>
             <div className="h-px w-8 bg-blue-600"></div>
          </div>
        </div>

        <div className="bg-[#0a0c10] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          <div className="p-8 border-b border-white/5 bg-gradient-to-b from-blue-600/[0.03] to-transparent">
            <label className="text-blue-500 font-black uppercase text-[9px] tracking-[0.3em] block mb-4">01. Unidade de Intervenção</label>
            <div className="relative">
              <select 
                value={selectedPlate}
                onChange={(e) => setSelectedPlate(e.target.value)}
                className="w-full bg-[#14171c] border border-white/5 p-4 rounded-xl text-white font-bold uppercase outline-none focus:border-blue-600 appearance-none cursor-pointer text-sm"
              >
                <option value="" disabled>Selecionar Viatura da Garagem...</option>
                {userVehicles.map((v: any) => (
                  <option key={v.id} value={v.plate} className="bg-[#0d0f14]">
                    {v.brand} {v.model} — [{formatPlate(v.plate)}]
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="p-8">
            <label className="text-blue-500 font-black uppercase text-[9px] tracking-[0.3em] block mb-6">02. Especificação Técnica</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                  onClick={() => { setServico(item.id); setSubOpcao(""); }}
                  className={`relative h-28 rounded-2xl overflow-hidden border transition-all duration-300 ${servico === item.id ? 'border-blue-600 scale-[1.02] shadow-lg' : 'border-white/5 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}
                >
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                  <div className={`absolute inset-0 ${servico === item.id ? 'bg-blue-600/60' : 'bg-black/60'}`} />
                  <span className="relative z-10 font-black uppercase italic text-[10px] px-2">{item.label}</span>
                  {servico === item.id && <CheckCircle2 className="absolute top-2 right-2 text-white" size={16} />}
                </button>
              ))}
            </div>

            {servico && (
              <div className="mt-6 p-6 bg-black/40 rounded-2xl border border-white/5 animate-in fade-in zoom-in-95">
                {servico === 'OLEO' && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {['0W20', '5W30', '5W40', '10W40', '15W40'].map(v => (
                      <button key={v} type="button" onClick={() => setSubOpcao(v)} className={`py-3 rounded-lg text-[10px] font-black border transition-all ${subOpcao === v ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-slate-500'}`}>{v}</button>
                    ))}
                  </div>
                )}
                {servico === 'PNEUS' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['Económica', 'Premium', 'Performance', 'Alinhamento'].map(p => (
                        <button key={p} type="button" onClick={() => setSubOpcao(p)} className={`py-3 rounded-lg text-[10px] font-black uppercase border transition-all ${subOpcao === p ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-slate-500'}`}>{p}</button>
                      ))}
                    </div>
                    <input type="text" placeholder="MEDIDA EX: 225/45 R17" className="w-full bg-[#14171c] border border-white/5 p-4 rounded-xl text-[11px] font-black uppercase outline-none focus:border-blue-600" onChange={(e) => setMedidaPneu(e.target.value)} />
                  </div>
                )}
                <textarea 
                  placeholder="NOTAS TÉCNICAS OU SINTOMAS..." 
                  className="w-full bg-[#14171c] border border-white/5 rounded-xl p-4 text-[11px] font-black uppercase outline-none focus:border-blue-600 min-h-[80px] mt-4" 
                  onChange={(e) => setExtraInfo(e.target.value)} 
                />
              </div>
            )}
          </div>

          <div className="p-8 bg-[#0d0f14]">
            <button 
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-white text-white hover:text-black py-5 rounded-2xl font-black uppercase italic text-sm transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {isSubmitting ? "A PROCESSAR..." : "FINALIZAR ORDEM DE SERVIÇO"} 
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}