"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight, ChevronDown, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";
import { createBooking } from "../../app/_actions/booking"; 

export default function AgendaClient({ userVehicles = [] }: { userVehicles: any[] }) {
  const searchParams = useSearchParams();
  const [selectedPlate, setSelectedPlate] = useState(searchParams.get("plate") || "");
  const [servico, setServico] = useState("");
  const [subOpcao, setSubOpcao] = useState("");
  const [medidaPneu, setMedidaPneu] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPlate = (plate: string) => {
    const clean = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
    return clean.match(/.{1,2}/g)?.join("-") || clean;
  };

  const handleFinalSubmit = async () => {
    // Apenas Viatura e Serviço são obrigatórios
    if (!selectedPlate || !servico) {
      return Swal.fire({ 
        title: "DADOS EM FALTA", 
        text: "Escolha a viatura e o serviço para podermos avançar.", 
        icon: "warning", 
        background: "#0d0f14", color: "#fff" 
      });
    }

    setIsSubmitting(true);
    
    // CONSTRUÇÃO DA DESCRIÇÃO (Se estiver tudo vazio, envia "Sem notas adicionais")
    let descricaoFinal = "";
    if (medidaPneu) descricaoFinal += `[MEDIDA: ${medidaPneu}] `;
    if (subOpcao) descricaoFinal += `${subOpcao} `;
    if (extraInfo) descricaoFinal += `- ${extraInfo}`;
    
    // Se o cliente não escreveu nada nem selecionou sub-opção
    if (!descricaoFinal.trim()) descricaoFinal = "Análise técnica geral solicitada.";

    try {
      const result = await createBooking({
        plate: selectedPlate,
        type: servico,
        description: descricaoFinal,
      });

      if (result) {
        await Swal.fire({ 
          title: "PEDIDO REGISTADO!", 
          text: "O Armindo já foi notificado e vai analisar o seu pedido.",
          icon: "success", 
          showConfirmButton: false,
          timer: 2000,
          background: "#0d0f14", color: "#fff"
        });
        window.location.href = "/tracking?plate=" + selectedPlate; 
      }
    } catch (error: any) {
      Swal.fire({ title: "Erro", text: "Não foi possível enviar o pedido.", icon: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 text-white overflow-hidden selection:bg-blue-600/30">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1530906358829-e84b2769270f?q=80&w=2000')] bg-cover bg-center bg-fixed opacity-10" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#05070a] via-[#05070a]/95 to-[#05070a]" />
      <div className="relative z-10 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-1000">
        
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            WORK <span className="text-blue-600">ORDER</span>
          </h1>
          <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[9px] mt-2">Check-in Performance</p>
        </div>

        <div className="bg-[#0a0c10] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* 01. VIATURA */}
          <div className="p-8 border-b border-white/5">
            <label className="text-blue-500 font-black uppercase text-[9px] tracking-[0.3em] block mb-4">01. Unidade de Intervenção</label>
            <div className="relative">
              <select 
                value={selectedPlate}
                onChange={(e) => setSelectedPlate(e.target.value)}
                className="w-full bg-[#14171c] border border-white/5 p-4 rounded-xl text-white font-bold uppercase outline-none focus:border-blue-600 appearance-none cursor-pointer"
              >
                <option value="" disabled>Escolher Viatura...</option>
                {userVehicles.map((v: any) => (
                  <option key={v.id} value={v.plate} className="bg-[#0d0f14]">
                    {v.brand} {v.model} — [{formatPlate(v.plate)}]
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
            </div>
          </div>

          {/* 02. SERVIÇOS COM FOTOS */}
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
                  className={`relative h-28 rounded-2xl overflow-hidden border transition-all duration-300 ${servico === item.id ? 'border-blue-600 scale-[1.02]' : 'border-white/5 opacity-40 grayscale hover:opacity-100'}`}
                >
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                  <div className={`absolute inset-0 ${servico === item.id ? 'bg-blue-600/60' : 'bg-black/60'}`} />
                  <span className="relative z-10 font-black uppercase italic text-[10px] px-2">{item.label}</span>
                  {servico === item.id && <CheckCircle2 className="absolute top-2 right-2 text-white" size={16} />}
                </button>
              ))}
            </div>

            {/* OPÇÕES ADICIONAIS (OPCIONAIS) */}
            {servico && (
              <div className="mt-6 p-6 bg-black/40 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-top-2">
                
                {servico === 'OLEO' && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                    {['0W20', '5W30', '5W40', '10W40', '15W40'].map(v => (
                      <button key={v} type="button" onClick={() => setSubOpcao(v)} className={`py-3 rounded-lg text-[10px] font-black border transition-all ${subOpcao === v ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-slate-500 hover:text-white'}`}>{v}</button>
                    ))}
                  </div>
                )}
                
                {servico === 'TRAVOES' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    {['Pastilhas Frente', 'Pastilhas Trás', 'Discos e Pastilhas', 'Óleo de Travões', 'Ruído a Travar', 'Outro'].map(v => (
                      <button key={v} type="button" onClick={() => setSubOpcao(v)} className={`py-3 rounded-lg text-[10px] font-black uppercase border transition-all ${subOpcao === v ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-slate-500 hover:text-white'}`}>{v}</button>
                    ))}
                  </div>
                )}
                
                {servico === 'REVISAO' && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
                    {['Check-up Anual', 'Revisão Oficial (Filtros)', 'Inspeção Periódica (IPO)', 'Diagnóstico de Erros'].map(v => (
                      <button key={v} type="button" onClick={() => setSubOpcao(v)} className={`py-3 rounded-lg text-[10px] font-black uppercase border transition-all ${subOpcao === v ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-slate-500 hover:text-white'}`}>{v}</button>
                    ))}
                  </div>
                )}

                {servico === 'PNEUS' && (
                  <div className="space-y-4 mb-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['Económica', 'Premium', 'Performance', 'Alinhamento'].map(p => (
                        <button key={p} type="button" onClick={() => setSubOpcao(p)} className={`py-3 rounded-lg text-[10px] font-black uppercase border transition-all ${subOpcao === p ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-slate-500 hover:text-white'}`}>{p}</button>
                      ))}
                    </div>
                    
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-4 mb-2">Medidas de Pneu Frequentes</p>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-3">
                        {['205/55 R16', '225/45 R17', '195/65 R15', '225/40 R18', '215/55 R17', 'Outra'].map(m => (
                          <button key={m} type="button" onClick={() => setMedidaPneu(m === 'Outra' ? '' : m)} className={`py-2 rounded-md text-[10px] font-bold border transition-all ${m !== 'Outra' && medidaPneu === m ? 'bg-blue-600/20 border-blue-600 text-blue-400' : 'border-white/5 text-slate-400 hover:text-white hover:bg-white/5'}`}>{m}</button>
                        ))}
                      </div>
                      <input type="text" placeholder="ESCREVA A MEDIDA (EX: 205/55 R16)" value={medidaPneu} className="w-full bg-[#14171c] border border-white/5 p-4 rounded-xl text-[11px] font-black uppercase outline-none focus:border-blue-600 text-white" onChange={(e) => setMedidaPneu(e.target.value)} />
                    </div>
                  </div>
                )}

                <textarea 
                  placeholder="OBSERVAÇÕES ADICIONAIS (OPCIONAL)..." 
                  className="w-full bg-[#14171c] border border-white/5 rounded-xl p-4 text-[11px] font-black uppercase outline-none focus:border-blue-600 min-h-[80px]" 
                  onChange={(e) => setExtraInfo(e.target.value)} 
                />
              </div>
            )}
          </div>

          <div className="p-8 bg-[#0d0f14]">
            <button 
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-white text-white hover:text-black py-5 rounded-2xl font-black uppercase italic text-sm transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {isSubmitting ? "A ENVIAR..." : "FINALIZAR ORDEM DE SERVIÇO"} 
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}