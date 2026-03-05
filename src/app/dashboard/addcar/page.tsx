"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, ArrowLeft, ShieldCheck, type Icon as LucideIcon } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { addVehicleAction } from "../../../app/_actions/vehicle"; // Ajusta o caminho se necessário

export default function AddCarPage() {
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (value.length > 6) value = value.slice(0, 6);
    const formatted = value.match(/.{1,2}/g)?.join("-") || "";
    setPlate(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (plate.length < 8) {
      Swal.fire("Aviso", "A matrícula deve estar completa (00-AA-00)", "warning");
      return;
    }

    setLoading(true);
    try {
      // Enviamos a plate, e se brand/model estiverem vazios, a Action trata do "Desconhecido"
      await addVehicleAction(plate, brand, model); 
    
      await Swal.fire({
        title: "VIATURA REGISTADA",
        text: "O seu veículo foi adicionado à base de dados técnica.",
        icon: "success",
        background: "#0d0f14",
        color: "#fff",
        confirmButtonColor: "#2563eb",
        customClass: {
          popup: "border border-white/10 font-black italic uppercase"
        }
      });
      
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      Swal.fire("Erro", err.message || "Falha ao registar veículo", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Detalhe estético de fundo */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')] bg-cover opacity-[0.02] grayscale pointer-events-none" />

      <div className="w-full max-w-lg bg-[#0a0c10] border border-white/10 p-10 relative z-10 shadow-2xl">
        <Link href="/dashboard" className="group text-slate-500 flex items-center gap-2 text-[10px] font-black uppercase mb-8 hover:text-blue-600 transition-colors">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Regressar ao Terminal
        </Link>
        
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rotate-3">
                <Car size={18} className="text-white -rotate-3" />
             </div>
             <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Novo Registo Técnico</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter leading-none">
            ADICIONAR <br /><span className="text-blue-600">VIATURA</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CAMPOS MARCA E MODELO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#14171c] border border-white/5 p-4 focus-within:border-blue-600 transition-all">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-1 italic">Marca (Opcional)</p>
              <input 
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="bg-transparent w-full text-white outline-none font-bold text-sm uppercase" 
                placeholder="EX: BMW" 
              />
            </div>
            <div className="bg-[#14171c] border border-white/5 p-4 focus-within:border-blue-600 transition-all">
              <p className="text-[9px] font-black text-blue-600 uppercase mb-1 italic">Modelo (Opcional)</p>
              <input 
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-transparent w-full text-white outline-none font-bold text-sm uppercase" 
                placeholder="EX: SÉRIE 1" 
              />
            </div>
          </div>

          {/* MATRÍCULA - O FOCO PRINCIPAL */}
          <div className="bg-yellow-400 p-1 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                 <div className="w-3 h-5 bg-blue-700 rounded-sm"></div>
                 <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em]">Matrícula Portuguesa</p>
              </div>
              <input 
                required
                value={plate} 
                onChange={handlePlateChange} 
                className="bg-transparent w-full text-center text-5xl font-mono font-black text-black outline-none uppercase placeholder:text-black/10" 
                placeholder="00-AA-00" 
              />
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-blue-600 hover:bg-white text-white hover:text-black p-6 font-black uppercase italic tracking-tighter transition-all flex items-center justify-center gap-4 group mt-8 shadow-lg shadow-blue-600/20"
          >
            {loading ? "A ENVIAR PARA O SISTEMA..." : "CONFIRMAR REGISTO"} 
            <ShieldCheck size={22} className="group-hover:scale-110 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}