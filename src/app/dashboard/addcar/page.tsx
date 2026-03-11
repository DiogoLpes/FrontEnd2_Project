"use client";

import { useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { carBrands, carColors } from "../../lib/cardata";

export default function AddVehicleModal({ isOpen, onClose, onSubmit, loading }: any) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("Branco"); // Valor inicial em Português como no teu carColors

  if (!isOpen) return null;

  // Limpamos a matrícula para enviar apenas letras/números
  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").substring(0, 6);
    setPlate(value);
  };

  // Função visual para mostrar a matrícula com hífens apenas no INPUT
  const displayPlate = (val: string) => {
    return val.match(/.{1,2}/g)?.join("-") || val;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#0d0f14] border border-white/10 w-full max-w-xl p-8 relative shadow-2xl skew-x-[-1deg]">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors skew-x-[1deg]">
          <X size={24} />
        </button>

        <div className="mb-8 skew-x-[1deg]">
          <p className="text-blue-600 font-black uppercase tracking-widest text-[10px] mb-2">Novo Registo Técnico</p>
          <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">CONFIGURAR <span className="text-blue-600">VIATURA</span></h2>
        </div>

        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            // Enviamos os dados limpos para a Action
            onSubmit({ brand, model, plate, color }); 
          }} 
          className="space-y-6 skew-x-[1deg]"
        >
          
          {/* MATRÍCULA ESTILO REAL */}
          <div className="bg-yellow-400 p-1 shadow-[6px_6px_0px_#2563eb] rotate-1">
            <div className="bg-white border-2 border-black p-4 text-center">
              <input 
                required
                value={displayPlate(plate)} // Apenas visual
                onChange={handlePlateChange}
                className="bg-transparent w-full text-center text-5xl font-mono font-black text-black outline-none uppercase placeholder:opacity-10" 
                placeholder="00-AA-00" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* MARCA */}
            <div className="bg-[#14171c] border border-white/5 p-4">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Fabricante</p>
              <select 
                required
                className="bg-transparent w-full text-white outline-none font-black text-sm uppercase cursor-pointer"
                value={brand}
                onChange={(e) => { setBrand(e.target.value); setModel(""); }}
              >
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {Object.keys(carBrands).map(b => <option key={b} value={b} className="bg-[#0d0f14]">{b}</option>)}
              </select>
            </div>

            {/* MODELO */}
            <div className="bg-[#14171c] border border-white/5 p-4">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Série / Modelo</p>
              <select 
                required
                disabled={!brand}
                className="bg-transparent w-full text-white outline-none font-black text-sm uppercase disabled:opacity-20 cursor-pointer"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {brand && carBrands[brand].map(m => <option key={m} value={m} className="bg-[#0d0f14]">{m}</option>)}
              </select>
            </div>
          </div>

          {/* CORES */}
          <div className="space-y-3">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Cor do Acabamento</p>
            <div className="flex flex-wrap gap-4">
              {carColors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-10 h-10 rounded-full border-4 transition-all duration-300 ${color === c.value ? 'border-blue-600 scale-125 shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'border-white/10 hover:border-white/30'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-white text-white hover:text-black p-6 font-black uppercase italic transition-all flex items-center justify-center gap-4 group mt-6 shadow-[0_10px_30px_rgba(37,99,235,0.2)]"
          >
            {loading ? "A GERAR VIATURA IA..." : "VALIDAR NA GARAGEM"} 
            <ShieldCheck size={22} className="group-hover:scale-110 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}