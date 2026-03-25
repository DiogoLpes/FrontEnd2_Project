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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0a0c10] border border-white/10 w-full max-w-md p-6 relative shadow-[0_0_50px_rgba(37,99,235,0.1)] overflow-y-auto max-h-[90vh] rounded-3xl animate-in zoom-in-95 duration-300">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-all bg-white/5 p-2 rounded-full"><X size={18} /></button>

        <div className="mb-6 border-l-4 border-blue-600 pl-4">
          <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">Registrar Unidade</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Configuração Técnica</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit({ brand, model, plate, color, year: parseInt(year), fuel }); }} className="space-y-5">
          
          {/* PAÍS */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(PLATE_STYLES).map((key) => (
              <button 
                key={key} type="button" onClick={() => { setPlateType(key); setPlate(""); }}
                className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase transition-all border ${plateType === key ? "bg-white text-black border-white shadow-md shadow-white/20" : "bg-white/5 border-white/5 text-slate-500 hover:text-white"}`}
              >
                {PLATE_STYLES[key].label}
              </button>
            ))}
          </div>

          {/* MATRÍCULA INTERATIVA (MUITO MAIS PEQUENA) */}
          <div className="flex justify-center py-4 bg-white/[0.02] rounded-2xl border border-white/5">
            <div className={`relative flex ${style.bg} border-2 border-zinc-400 rounded shadow-lg min-w-[200px] h-12 overflow-hidden`}>
              {style.hasEuro && (
                <div className={`${style.bar} w-6 flex flex-col items-center justify-between py-1 text-white`}>
                  <div className="grid grid-cols-2 gap-[1px]">
                    {[...Array(12)].map((_, i) => <div key={i} className="w-[1px] h-[1px] bg-yellow-400 rounded-full" />)}
                  </div>
                  <span className="font-black text-[8px] leading-none mb-0.5">{style.country}</span>
                </div>
              )}
              <div className="flex-1 flex items-center justify-center px-2">
                <input required value={formatPlateDisplay(plate, plateType)} onChange={handlePlateChange} placeholder="--- ---"
                  className={`bg-transparent w-full text-center text-2xl font-mono font-black tracking-tighter ${style.textColor} outline-none placeholder:opacity-10`} 
                />
              </div>
              {style.showYellow && <div className="w-2 bg-yellow-400 border-l border-black/10" />}
            </div>
          </div>

          {/* GRID TÉCNICO (COMPACTO) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#14171c] px-3 py-2 rounded-xl border border-white/5 focus-within:border-blue-600 transition-colors">
              <p className="text-[8px] font-black text-blue-500 uppercase">Marca</p>
              <select required className="bg-transparent w-full text-white outline-none font-bold text-xs uppercase"
                value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); setFuel(""); }}>
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {carBrands.map((b: any) => <option key={String(b)} value={String(b)} className="bg-[#0d0f14]">{String(b)}</option>)}
              </select>
            </div>

            <div className="bg-[#14171c] px-3 py-2 rounded-xl border border-white/5 focus-within:border-blue-600 transition-colors">
              <p className="text-[8px] font-black text-blue-500 uppercase">Modelo</p>
              <select required disabled={!brand} className="bg-transparent w-full text-white outline-none font-bold text-xs uppercase disabled:opacity-30"
                value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {brandConfig?.models.map((m: string) => <option key={m} value={m} className="bg-[#0d0f14]">{m}</option>)}
              </select>
            </div>

            <div className="bg-[#14171c] px-3 py-2 rounded-xl border border-white/5 focus-within:border-blue-600 transition-colors">
              <p className="text-[8px] font-black text-blue-500 uppercase">Ano Fabrico</p>
              <input type="number" min={brandConfig?.startYear || 1980} max={2026} value={year} onChange={(e) => setYear(e.target.value)}
                className="bg-transparent w-full text-white outline-none font-bold text-xs" />
            </div>

            <div className="bg-[#14171c] px-3 py-2 rounded-xl border border-white/5 focus-within:border-blue-600 transition-colors">
              <p className="text-[8px] font-black text-blue-500 uppercase">Motor</p>
              <select required disabled={!brand} className="bg-transparent w-full text-white outline-none font-bold text-xs uppercase disabled:opacity-30"
                value={fuel} onChange={(e) => setFuel(e.target.value)}>
                <option value="" className="bg-[#0d0f14]">Selecionar</option>
                {brandConfig?.fuels.map((f: string) => <option key={f} value={f} className="bg-[#0d0f14]">{f}</option>)}
              </select>
            </div>
          </div>

          {/* CORES */}
          <div className="bg-[#14171c] p-4 rounded-xl border border-white/5">
             <div className="flex flex-wrap items-center justify-between gap-2">
              {carColors.map((c) => (
                <button key={c.value} type="button" onClick={() => setColor(c.value)} title={c.value}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${color === c.value ? "border-blue-600 scale-[1.4] shadow-md shadow-blue-600/30" : "border-white/10 opacity-70 hover:opacity-100 hover:scale-110"}`}
                  style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>

          <button disabled={loading} className="w-full bg-blue-600 hover:bg-white text-white hover:text-black py-4 rounded-xl font-black uppercase italic text-xs transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            {loading ? "A PROCESSAR..." : "ADICIONAR UNIDADE"} <ShieldCheck size={16} className="group-hover:rotate-12 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}