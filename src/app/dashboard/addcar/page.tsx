"use client";

import { useState } from "react";
import { X, ShieldCheck, Zap, Fuel, Calendar, Car } from "lucide-react";

// Mock de dados (Podes mover para um ficheiro externo lib/cardata.ts)
const carBrands: any = {
  "BMW": ["Série 1", "Série 3", "X5", "M4"],
  "Mercedes-Benz": ["Classe A", "Classe C", "GLE", "AMG GT"],
  "Audi": ["A3", "A4", "Q5", "RS6"],
  "Volkswagen": ["Golf", "Polo", "Tiguan"],
  "Tesla": ["Model 3", "Model Y", "Model S"],
  "Outra": ["Modelo Genérico"]
};

const carColors = [
  { label: "Preto", hex: "#000000", value: "Preto" },
  { label: "Branco", hex: "#ffffff", value: "Branco" },
  { label: "Cinzento", hex: "#4b5563", value: "Cinzento" },
  { label: "Azul", hex: "#1e40af", value: "Azul" },
  { label: "Vermelho", hex: "#991b1b", value: "Vermelho" }
];

export default function AddVehicleModal({ isOpen, onClose, onSubmit, loading }: any) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("Preto");
  const [year, setYear] = useState("2024");
  const [fuel, setFuel] = useState("DIESEL");

  if (!isOpen) return null;

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").substring(0, 6);
    setPlate(value);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-[#0d0f14] border border-white/10 w-full max-w-2xl p-10 relative shadow-2xl skew-x-[-1deg]">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors skew-x-[1deg]">
          <X size={28} />
        </button>

        <div className="mb-10 skew-x-[1deg]">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={12} className="text-blue-600 fill-blue-600" />
            <p className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Portal de Performance</p>
          </div>
          <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter leading-none">
            REGISTO DE <span className="text-blue-600">UNIDADE</span>
          </h2>
        </div>

        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            onSubmit({ brand, model, plate, color, year, fuel }); 
          }} 
          className="space-y-6 skew-x-[1deg]"
        >
          {/* MATRÍCULA DE IMPACTO */}
          <div className="bg-yellow-400 p-1.5 shadow-[8px_8px_0px_#2563eb] rotate-1">
            <div className="bg-white border-4 border-black p-4 text-center">
              <input 
                required 
                value={plate.match(/.{1,2}/g)?.join("-") || plate} 
                onChange={handlePlateChange}
                placeholder="00-AA-00"
                className="bg-transparent w-full text-center text-6xl font-mono font-black text-black outline-none uppercase placeholder:opacity-5" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#14171c] border border-white/5 p-4 focus-within:border-blue-600 transition-colors">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Marca do Fabricante</p>
              <select 
                required 
                className="bg-transparent w-full text-white outline-none font-black text-sm uppercase cursor-pointer"
                value={brand} 
                onChange={(e) => { setBrand(e.target.value); setModel(""); }}
              >
                <option value="" className="bg-[#0d0f14]">Selecionar Marca</option>
                {Object.keys(carBrands).map(b => <option key={b} value={b} className="bg-[#0d0f14]">{b}</option>)}
              </select>
            </div>

            <div className="bg-[#14171c] border border-white/5 p-4 focus-within:border-blue-600 transition-colors">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Modelo / Série</p>
              <select 
                required 
                disabled={!brand} 
                className="bg-transparent w-full text-white outline-none font-black text-sm uppercase disabled:opacity-20 cursor-pointer"
                value={model} 
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="" className="bg-[#0d0f14]">Selecionar Modelo</option>
                {brand && carBrands[brand].map((m: string) => <option key={m} value={m} className="bg-[#0d0f14]">{m}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#14171c] border border-white/5 p-4 flex items-center gap-4">
              <Calendar size={20} className="text-blue-600" />
              <div className="flex-1">
                <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Ano</p>
                <input required type="number" min="1970" max="2026" className="bg-transparent w-full text-white outline-none font-black text-sm"
                  value={year} onChange={(e) => setYear(e.target.value)} />
              </div>
            </div>

            <div className="bg-[#14171c] border border-white/5 p-4 flex items-center gap-4">
              <Fuel size={20} className="text-blue-600" />
              <div className="flex-1">
                <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Motorização</p>
                <select className="bg-transparent w-full text-white outline-none font-black text-sm uppercase cursor-pointer"
                  value={fuel} onChange={(e) => setFuel(e.target.value)}>
                  <option value="GASOLINA" className="bg-[#0d0f14]">Gasolina</option>
                  <option value="DIESEL" className="bg-[#0d0f14]">Diesel</option>
                  <option value="HIBRIDO" className="bg-[#0d0f14]">Híbrido</option>
                  <option value="ELETRICO" className="bg-[#0d0f14]">Elétrico</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Esquema de Cores</p>
            <div className="flex flex-wrap gap-5">
              {carColors.map((c) => (
                <button 
                  key={c.value} 
                  type="button" 
                  onClick={() => setColor(c.value)}
                  className={`w-12 h-12 rounded-none rotate-45 border-2 transition-all ${color === c.value ? 'border-blue-600 scale-110 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'border-white/10'}`}
                  style={{ backgroundColor: c.hex }} 
                />
              ))}
            </div>
          </div>

          <button 
            disabled={loading} 
            className="w-full bg-blue-600 hover:bg-white text-white hover:text-black p-6 font-black uppercase italic tracking-tighter transition-all flex items-center justify-center gap-4 group mt-8"
          >
            {loading ? "A SINCRONIZAR COM O SISTEMA..." : "FINALIZAR REGISTO NA GARAGEM"} 
            <ShieldCheck size={24} className="group-hover:rotate-12 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}