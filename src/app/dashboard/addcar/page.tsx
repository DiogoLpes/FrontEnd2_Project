"use client";

import { useState, useMemo } from "react";
import { X, ShieldCheck, Fuel, Calendar, Globe } from "lucide-react";
import { carBrandsData, carColors, carBrands } from "../../lib/cardata"; 

const PLATE_STYLES: Record<string, any> = {
  PT: { label: "PT", country: "P", bg: "bg-white", bar: "bg-[#003399]", textColor: "text-black", hasEuro: true, showYellow: true },
  ES: { label: "ES", country: "E", bg: "bg-white", bar: "bg-[#003399]", textColor: "text-black", hasEuro: true },
  FR: { label: "FR", country: "F", bg: "bg-white", bar: "bg-[#003399]", textColor: "text-black", hasEuro: true },
  UK: { label: "UK", country: "", bg: "bg-white", bar: "bg-zinc-200", textColor: "text-black", hasEuro: false },
  INT: { label: "Outra", country: "", bg: "bg-zinc-900", bar: "", textColor: "text-white", hasEuro: false },
};

export default function AddVehicleModal({ isOpen, onClose, onSubmit, loading }: any) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [plateType, setPlateType] = useState<string>("PT");
  const [color, setColor] = useState("Preto");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const brandConfig = useMemo(() => {
    return brand ? carBrandsData[brand as string] : null;
  }, [brand]);

  if (!isOpen) return null;

  const formatPlateDisplay = (val: string, type: string) => {
    const clean = val.replace(/[^A-Z0-9]/g, "");
    if (type === "PT") return clean.match(/.{1,2}/g)?.join("-").substring(0, 8) || clean;
    if (type === "UK" || type === "ES") if (clean.length > 4) return `${clean.slice(0, 4)} ${clean.slice(4, 7)}`;
    return clean;
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const limits: any = { PT: 6, UK: 7, ES: 7, FR: 7, INT: 10 };
    setPlate(cleanValue.substring(0, limits[plateType] || 10));
  };

  const style = PLATE_STYLES[plateType];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="bg-[#0d0f14] border border-white/10 w-full max-w-2xl p-10 relative shadow-2xl overflow-y-auto max-h-[90vh] rounded-[3rem]">
        
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-all"><X size={28} /></button>

        <h2 className="text-5xl font-black italic uppercase text-white mb-10 tracking-tighter leading-none">
          REGISTAR <span className="text-blue-600 text-6xl">.</span>
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit({ brand, model, plate, color, year: parseInt(year), fuel }); }} className="space-y-8">
          
          {/* PAÍS */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(PLATE_STYLES).map((key) => (
              <button 
                key={key} type="button" onClick={() => { setPlateType(key); setPlate(""); }}
                className={`px-4 py-2 rounded-full text-[10px] font-black transition-all border ${plateType === key ? "bg-white text-black border-white" : "bg-white/5 border-white/5 text-slate-500"}`}
              >
                {PLATE_STYLES[key].label}
              </button>
            ))}
          </div>

          {/* MATRÍCULA INTERATIVA */}
          <div className="flex justify-center py-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5">
            <div className={`relative flex ${style.bg} border-[3px] border-zinc-400 rounded-md shadow-2xl min-w-[320px] h-20 overflow-hidden`}>
              {style.hasEuro && (
                <div className={`${style.bar} w-10 flex flex-col items-center justify-between py-2 text-white`}>
                  <div className="grid grid-cols-2 gap-0.5 mt-1">
                    {[...Array(12)].map((_, i) => <div key={i} className="w-0.5 h-0.5 bg-yellow-400 rounded-full" />)}
                  </div>
                  <span className="font-bold text-lg mb-1">{style.country}</span>
                </div>
              )}
              <div className="flex-1 flex items-center justify-center px-4">
                <input required value={formatPlateDisplay(plate, plateType)} onChange={handlePlateChange} placeholder="--- ---"
                  className={`bg-transparent w-full text-center text-5xl font-mono font-bold ${style.textColor} outline-none tracking-tight placeholder:opacity-10`} 
                />
              </div>
              {style.showYellow && <div className="w-3 bg-yellow-400 border-l border-black/5" />}
            </div>
          </div>

          {/* GRID TÉCNICO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#14171c] p-5 rounded-2xl border border-white/5">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Marca</p>
              <select required className="bg-transparent w-full text-white outline-none font-bold text-sm uppercase"
                value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); setFuel(""); }}>
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {carBrands.map((b: any) => <option key={String(b)} value={String(b)} className="bg-[#0d0f14]">{String(b)}</option>)}
              </select>
            </div>

            <div className="bg-[#14171c] p-5 rounded-2xl border border-white/5">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Modelo</p>
              <select required disabled={!brand} className="bg-transparent w-full text-white outline-none font-bold text-sm uppercase disabled:opacity-20"
                value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {brandConfig?.models.map((m: string) => <option key={m} value={m} className="bg-[#0d0f14]">{m}</option>)}
              </select>
            </div>

            <div className="bg-[#14171c] p-5 rounded-2xl border border-white/5 text-white">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Ano</p>
              <input type="number" min={brandConfig?.startYear || 1980} max={2026} value={year} onChange={(e) => setYear(e.target.value)}
                className="bg-transparent w-full text-white outline-none font-bold text-sm" />
            </div>

            <div className="bg-[#14171c] p-5 rounded-2xl border border-white/5">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-2">Motorização</p>
              <select required disabled={!brand} className="bg-transparent w-full text-white outline-none font-bold text-sm uppercase"
                value={fuel} onChange={(e) => setFuel(e.target.value)}>
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {brandConfig?.fuels.map((f: string) => <option key={f} value={f} className="bg-[#0d0f14]">{f}</option>)}
              </select>
            </div>
          </div>

          {/* CORES */}
          <div className="bg-[#14171c] p-8 rounded-[2.5rem] border border-white/5">
             <div className="flex flex-wrap justify-center gap-4">
              {carColors.map((c) => (
                <button key={c.value} type="button" onClick={() => setColor(c.value)} className="group flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full border-2 transition-all ${color === c.value ? "border-blue-600 scale-125 shadow-lg shadow-blue-600/30" : "border-white/10"}`}
                    style={{ backgroundColor: c.hex }} />
                </button>
              ))}
            </div>
          </div>

          <button disabled={loading} className="w-full bg-blue-600 hover:bg-white text-white hover:text-black p-6 font-black uppercase italic transition-all flex items-center justify-center gap-4 rounded-2xl active:scale-95 group">
            {loading ? "A PROCESSAR..." : "CONFIRMAR REGISTO"} <ShieldCheck size={24} className="group-hover:rotate-12 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}