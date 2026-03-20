"use client";

import { useState } from "react";
import { X, ShieldCheck, Zap } from "lucide-react";

const carBrands: any = {
  "BMW": ["Série 1", "Série 3", "X5", "M4"],
  "Mercedes-Benz": ["Classe A", "Classe C", "GLE", "AMG GT"],
  "Audi": ["A3", "A4", "Q5", "RS6"],
  "Volkswagen": ["Golf", "Polo", "Tiguan"],
  "Tesla": ["Model 3", "Model Y", "Model S"],
  "Outra": ["Modelo Genérico"]
};

export default function AddVehicleModal({ isOpen, onClose, onSubmit, loading }: any) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("Preto");
  const [year, setYear] = useState("2024");
  const [fuel, setFuel] = useState("DIESEL");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Passamos o objeto limpo para o DashboardClient tratar a Action
    onSubmit({ brand, model, plate, color, year, fuel });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="bg-[#0d0f14] border border-white/10 w-full max-w-2xl p-10 relative shadow-2xl skew-x-[-1deg]">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors skew-x-[1deg]">
          <X size={28} />
        </button>

        <div className="mb-10 skew-x-[1deg]">
          <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter leading-none">
            NOVA <span className="text-blue-600">UNIDADE</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 skew-x-[1deg]">
          {/* MATRÍCULA */}
          <div className="bg-yellow-400 p-1.5 shadow-[8px_8px_0px_#2563eb] rotate-1">
            <div className="bg-white border-4 border-black p-4 text-center">
              <input 
                required 
                value={plate} 
                onChange={(e) => setPlate(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                placeholder="MATRÍCULA"
                className="bg-transparent w-full text-center text-5xl font-mono font-black text-black outline-none placeholder:opacity-10" 
              />
            </div>
          </div>

          {/* MARCA E MODELO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#14171c] border border-white/5 p-4">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Marca</p>
              <select required className="bg-transparent w-full text-white outline-none font-black text-sm uppercase"
                value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); }}>
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {Object.keys(carBrands).map(b => <option key={b} value={b} className="bg-[#0d0f14]">{b}</option>)}
              </select>
            </div>

            <div className="bg-[#14171c] border border-white/5 p-4">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Modelo</p>
              <select required disabled={!brand} className="bg-transparent w-full text-white outline-none font-black text-sm uppercase disabled:opacity-20"
                value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {brand && carBrands[brand].map((m: string) => <option key={m} value={m} className="bg-[#0d0f14]">{m}</option>)}
              </select>
            </div>
          </div>

          <button 
            disabled={loading} 
            className="w-full bg-blue-600 hover:bg-white text-white hover:text-black p-6 font-black uppercase italic transition-all flex items-center justify-center gap-4 group"
          >
            {loading ? "A SINCRONIZAR..." : "REGISTAR NA GARAGEM"} 
            <ShieldCheck size={24} className="group-hover:rotate-12 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}