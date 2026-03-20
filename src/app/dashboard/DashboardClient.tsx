"use client";

import React, { useState } from "react"; // 1. Importar useState
import { Car, Plus, Wrench, ChevronRight } from "lucide-react";
import Link from "next/link";
import AddVehicleModal from "./addcar/page"; // 2. Importar o componente do Modal
import { addVehicleAction } from "../_actions/vehicle";
import Swal from "sweetalert2";

interface DashboardClientProps {
  session: any;
  userVehicles: any[];
}

export default function DashboardClient({ session, userVehicles: initialVehicles = [] }: DashboardClientProps) {
  // 3. Estados para o Modal e Loading
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState(initialVehicles);

  // 4. Função que liga o Modal à Server Action
  const handleAddVehicle = async (formData: any) => {
    setLoading(true);
    try {
      const newVehicle = await addVehicleAction(formData);
      if (newVehicle) {
        setVehicles([newVehicle, ...vehicles]);
        setIsModalOpen(false);
        Swal.fire("Sucesso", "Viatura registada!", "success");
      }
    } catch (error: any) {
      Swal.fire("Erro", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2">
              Painel de Controlo / {session?.user?.name || "Piloto"}
            </p>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              MY <span className="text-blue-600">GARAGE</span>
            </h1>
          </div>
          
          {/* 5. TROCADO LINK POR BUTTON */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-white hover:text-black text-white px-8 py-4 rounded-2xl font-black uppercase text-xs transition-all flex items-center gap-2 shadow-[0_15px_30px_rgba(37,99,235,0.2)] active:scale-95"
          >
            <Plus size={18} /> Registar Viatura
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.length > 0 ? (
            vehicles.map((v) => (
              <div key={v.id} className="bg-[#0d0f14]/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex justify-between items-center group hover:border-blue-600/50 transition-all duration-500 shadow-2xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:animate-ping" />
                    <p className="text-slate-500 font-black text-[10px] tracking-[0.2em] uppercase">{v.brand}</p>
                  </div>
                  <h3 className="text-3xl font-black uppercase italic leading-none group-hover:text-blue-500 transition-colors">{v.model}</h3>
                  <div className="pt-4">
                    <span className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-[11px] font-mono font-bold text-blue-400 tracking-widest uppercase">{v.plate}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link href={`/agenda?plate=${v.plate}`} className="bg-blue-600 p-5 rounded-[1.5rem] hover:scale-110 active:scale-90 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] text-white group-hover:rotate-12">
                    <Wrench size={26} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="text-white/20" size={40} />
              </div>
              <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Nenhuma unidade detectada</p>
              
              {/* 6. TROCADO LINK POR BUTTON AQUI TAMBÉM */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-blue-600 font-black uppercase italic text-sm hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                Configurar primeiro veículo <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* 7. INSERIR O COMPONENTE DO MODAL NO FINAL */}
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