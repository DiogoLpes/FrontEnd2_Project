"use client";

import React, { useState } from "react";
import { Plus, Wrench, ChevronRight, Car } from "lucide-react";
import Link from "next/link";
import AddVehicleModal from "./addcar/page"; 
import { addVehicleAction } from "../_actions/vehicle";
import Swal from "sweetalert2";

interface DashboardClientProps {
  session: any;
  userVehicles: any[];
}

export default function DashboardClient({ session, userVehicles: initialVehicles = [] }: DashboardClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState(initialVehicles);

  // Lógica de deteção de país e formatação para o Card
  const getPlateStyle = (plate: string) => {
    const clean = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
    
    // Portugal: Geralmente 6 caracteres (00AA00)
    if (clean.length === 6) {
      return {
        formatted: clean.match(/.{1,2}/g)?.join("-") || clean,
        country: "P",
        isPT: true
      };
    }
    // Espanha / França / UK: Geralmente 7 caracteres (0000BBB ou AA000AA)
    if (clean.length === 7) {
      return {
        formatted: `${clean.slice(0, 4)} ${clean.slice(4, 7)}`,
        country: "E", // Podes ajustar para "F" ou "UK" conforme a lógica que preferires
        isPT: false
      };
    }
    // Outros formatos
    return {
      formatted: clean,
      country: "",
      isPT: false
    };
  };

  const handleAddVehicle = async (formData: any) => {
    setLoading(true);
    try {
      const newVehicle = await addVehicleAction(formData);
      if (newVehicle) {
        setVehicles([newVehicle, ...vehicles]);
        setIsModalOpen(false);
        Swal.fire({
          title: "Sucesso",
          text: "Viatura registada na garagem!",
          icon: "success",
          background: "#0d0f14",
          color: "#fff",
          confirmButtonColor: "#2563eb"
        });
      }
    } catch (error: any) {
      Swal.fire("Erro", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 text-white overflow-hidden selection:bg-blue-600/30">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1597551681492-10c86e481048?q=80&w=2000')] bg-cover bg-center bg-fixed opacity-20" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#05070a] via-[#05070a]/90 to-[#05070a]" />
      <div className="relative z-10 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* HEADER INDUSTRIAL */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <p className="text-blue-600 font-black uppercase tracking-[0.4em] text-[9px] mb-3">
              GARAGE MANAGEMENT / {session?.user?.name || "PILOT"}
            </p>
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8]">
              MY UNITS<span className="text-blue-600">.</span>
            </h1>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-10 py-5 rounded-full font-black uppercase text-[11px] transition-all flex items-center gap-3 hover:bg-blue-600 hover:text-white active:scale-95 shadow-2xl"
          >
            <Plus size={16} strokeWidth={4} /> REGISTAR UNIDADE
          </button>
        </div>

        {/* LISTAGEM DE VEÍCULOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {vehicles.length > 0 ? (
            vehicles.map((v) => {
              const plateData = getPlateStyle(v.plate);
              return (
                <div 
                  key={v.id} 
                  className="bg-[#0a0c10] border border-white/5 p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[340px] group hover:border-blue-600/40 transition-all duration-700 relative overflow-hidden"
                >
                  {/* Marca em background subtil */}
                  <span className="absolute -right-4 -top-4 text-[130px] font-black italic text-white/[0.02] pointer-events-none uppercase">
                    {v.brand.slice(0, 3)}
                  </span>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-blue-600 font-black text-[10px] tracking-widest uppercase mb-1">
                          {v.brand}
                        </p>
                        <h3 className="text-5xl font-black uppercase italic leading-none tracking-tighter group-hover:text-blue-500 transition-colors">
                          {v.model}
                        </h3>
                      </div>
                      
                      <Link 
                        href={`/agenda?plate=${v.plate}`} 
                        className="bg-[#111318] p-5 rounded-full border border-white/5 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-xl"
                      >
                        <Wrench size={24} />
                      </Link>
                    </div>

                    {/* INFO TÉCNICA LIMPA */}
                    <div className="flex gap-10 mt-10 border-t border-white/5 pt-8">
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Ano</p>
                        <p className="text-sm font-black uppercase">{v.year}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Motor</p>
                        <p className="text-sm font-black uppercase tracking-tight">{v.fuel}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Cor</p>
                        <p className="text-sm font-black uppercase">{v.color}</p>
                      </div>
                    </div>
                  </div>

                  {/* MATRÍCULA DINÂMICA (PT/ES/OUTROS) */}
                  <div className="mt-10 flex items-center gap-4">
                    <div className="inline-flex items-stretch bg-[#f0f0f0] rounded-md overflow-hidden border-2 border-zinc-400 shadow-2xl shadow-black/50">
                      
                      {/* Faixa Azul UE (PT, ES, etc) */}
                      {plateData.country && (
                        <div className="bg-[#003399] px-2.5 flex flex-col items-center justify-center py-1">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mb-1 opacity-80" />
                          <span className="text-[10px] text-white font-black leading-none">
                            {plateData.country}
                          </span>
                        </div>
                      )}

                      <div className="px-6 py-2 flex items-center bg-white">
                        <span className="text-2xl font-mono font-black text-[#1a1a1a] tracking-tighter">
                          {plateData.formatted}
                        </span>
                      </div>

                      {/* Faixa Amarela Lateral (Só Portugal) */}
                      {plateData.isPT && (
                        <div className="w-3 bg-yellow-400 border-l border-black/5" />
                      )}
                    </div>
                    
                    <div className="h-[1px] flex-1 bg-white/5" />
                    
                    <div className="text-right">
                      <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.2em]">Status</p>
                      <p className="text-[10px] font-black text-blue-500 uppercase italic tracking-tighter">Active Unit</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-40 text-center border border-white/5 rounded-[4rem] bg-white/[0.01]">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="text-white/10" size={32} />
               </div>
               <p className="text-slate-600 font-black uppercase tracking-[0.5em] text-[10px]">No units in hangar</p>
            </div>
          )}
        </div>

        <AddVehicleModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddVehicle}
          loading={loading}
        />

      </div>
    </div>
  );
}