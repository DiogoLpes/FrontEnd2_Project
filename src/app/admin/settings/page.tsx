"use client";

import { useState } from "react";
import { Settings, Save, Smartphone, MapPin, BadgeEuro, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de delay para efeito visual na apresentação
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: "SISTEMA ATUALIZADO",
        text: "As configurações globais da oficina foram replicadas.",
        icon: "success",
        background: "#0d1117",
        color: "#fff",
        confirmButtonColor: "#2563eb"
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black uppercase italic text-white tracking-tighter flex items-center gap-3">
          <Settings className="text-blue-600" size={28} /> Painel de <span className="text-blue-600">Controlo</span>
        </h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Configurações Estruturais do Sistema</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD: IDENTIDADE */}
        <div className="bg-[#0d1117] border border-white/5 p-8 rounded-3xl space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <ShieldCheck size={80} />
          </div>
          
          <h3 className="text-white font-black uppercase italic text-xs tracking-widest border-l-2 border-blue-600 pl-4">Identidade da Marca</h3>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-500 uppercase">Nome da Oficina</label>
              <input defaultValue="TS PNEUS" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white font-bold outline-none focus:border-blue-600" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-500 uppercase">NIF / Registo</label>
              <input defaultValue="500 123 456" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white font-mono outline-none focus:border-blue-600" />
            </div>
          </div>
        </div>

        {/* CARD: CONTACTOS LIVE */}
        <div className="bg-[#0d1117] border border-white/5 p-8 rounded-3xl space-y-6">
          <h3 className="text-white font-black uppercase italic text-xs tracking-widest border-l-2 border-blue-600 pl-4 text-emerald-500">Canais de Comunicação</h3>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-2">
                <Smartphone size={10} /> WhatsApp de Suporte
              </label>
              <input defaultValue="+351 912 345 678" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white font-bold outline-none focus:border-emerald-600" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-2">
                <MapPin size={10} /> Localização GPS
              </label>
              <input defaultValue="Olhos de Água, Faro" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white font-bold outline-none focus:border-blue-600" />
            </div>
          </div>
        </div>

        {/* CARD: TAXAS E VALORES */}
        <div className="bg-[#0d1117] border border-white/5 p-8 rounded-3xl space-y-6 md:col-span-2">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-black uppercase italic text-xs tracking-widest border-l-2 border-blue-600 pl-4">Parâmetros Financeiros</h3>
            <BadgeEuro className="text-blue-600/20" size={24} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1 text-center bg-black/20 p-4 rounded-2xl border border-white/5">
              <label className="text-[9px] font-black text-slate-500 uppercase block mb-2">Mão de Obra / Hora</label>
              <div className="flex items-center justify-center gap-2 font-black italic text-2xl text-white">
                <input defaultValue="45.00" className="bg-transparent w-20 text-center outline-none border-b border-blue-600" />
                <span className="text-blue-600">€</span>
              </div>
            </div>
            {/* Podes adicionar mais aqui */}
          </div>
        </div>

        {/* BOTÃO SUBMIT */}
        <div className="md:col-span-2 pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-white hover:text-black text-white font-black uppercase italic py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/10 flex items-center justify-center gap-3"
          >
            {loading ? "A SINCRONIZAR..." : (
              <><Save size={20} /> Aplicar Alterações no Sistema</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}