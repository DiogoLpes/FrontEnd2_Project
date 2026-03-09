"use client";

import { useState } from "react";
import { X, Car, ShieldCheck } from "lucide-react";
import { carBrands, carColors } from "../../lib/cardata";

export default function AddVehicleModal({ isOpen, onClose, onSubmit, loading }: any) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("white");

  if (!isOpen) return null;

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (value.length > 6) value = value.slice(0, 6);
    const formatted = value.match(/.{1,2}/g)?.join("-") || "";
    setPlate(formatted);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0d0f14] border border-white/10 w-full max-w-xl p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="mb-8">
          <p className="text-blue-600 font-black uppercase tracking-widest text-[10px] mb-2">Novo Registo Técnico</p>
          <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">CONFIGURAR <span className="text-blue-600">VIATURA</span></h2>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit({ brand, model, plate, color }); }} className="space-y-6">
          
          {/* MATRÍCULA */}
          <div className="bg-yellow-400 p-1 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] rotate-1">
            <div className="bg-white border-2 border-black p-4 text-center">
              <input 
                required
                value={plate}
                onChange={handlePlateChange}
                className="bg-transparent w-full text-center text-4xl font-mono font-black text-black outline-none uppercase" 
                placeholder="00-AA-00" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* MARCA */}
            <div className="bg-[#14171c] border border-white/5 p-3">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Marca</p>
              <select 
                required
                className="bg-transparent w-full text-white outline-none font-bold text-xs uppercase"
                value={brand}
                onChange={(e) => { setBrand(e.target.value); setModel(""); }}
              >
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {Object.keys(carBrands).map(b => <option key={b} value={b} className="bg-[#0d0f14]">{b}</option>)}
              </select>
            </div>

            {/* MODELO */}
            <div className="bg-[#14171c] border border-white/5 p-3">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Modelo</p>
              <select 
                required
                disabled={!brand}
                className="bg-transparent w-full text-white outline-none font-bold text-xs uppercase disabled:opacity-20"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {brand && carBrands[brand].map(m => <option key={m} value={m} className="bg-[#0d0f14]">{m}</option>)}
              </select>
            </div>
          </div>

          {/* CORES */}
          <div className="space-y-2">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Cor da Carroçaria</p>
            <div className="flex flex-wrap gap-3">
              {carColors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${color === c.value ? 'border-blue-600 scale-110 shadow-lg shadow-blue-600/20' : 'border-transparent'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-white text-white hover:text-black p-5 font-black uppercase italic transition-all flex items-center justify-center gap-4 group mt-4 shadow-lg shadow-blue-600/20"
          >
            {loading ? "A PROCESSAR..." : "CONFIRMAR REGISTO"} 
            <ShieldCheck size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}