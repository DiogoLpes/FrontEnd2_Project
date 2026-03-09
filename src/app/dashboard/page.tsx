"use client";

import { useState, useEffect } from "react"; // Adicionado useEffect
import { useSearchParams } from "next/navigation"; // Adicionado para ler o URL
import { Car, Plus, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import AddVehicleModal from "./addcar/page"; 
import { addVehicleAction } from "@/app/_actions/vehicle"; 
import { carColors } from "../lib/cardata";
import Swal from "sweetalert2";

export default function DashboardPage({ session, initialVehicles }: any) {
  const [vehicles, setVehicles] = useState(initialVehicles || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const searchParams = useSearchParams();

  // LÓGICA MÁGICA: Abre o modal se o utilizador vier "empurrado" da reserva
  useEffect(() => {
    const openModal = searchParams.get("openModal");
    if (openModal === "true") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleAddCar = async (data: any) => {
    setLoading(true);
    try {
      const newCar = await addVehicleAction(data);
      setVehicles([newCar, ...vehicles]);
      setIsModalOpen(false);
      
      Swal.fire({
        title: "REGISTADO",
        text: "Viatura adicionada com sucesso. Já podes fazer a tua reserva!",
        icon: "success",
        background: "#0d0f14",
        color: "#fff",
        confirmButtonColor: "#2563eb"
      });
    } catch (err) {
      Swal.fire("Erro", "Falha ao registar viatura.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-32 pb-12 px-6 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')] bg-cover opacity-[0.03] grayscale pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* HEADER COM PROTEÇÃO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-blue-600"></span>
              <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">Terminal TS PNEUS</p>
            </div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter">
              MINHA <span className="text-blue-600">GARAGEM</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0 bg-[#0a0c10] p-4 border border-white/5 shadow-2xl">
            <div className="w-10 h-10 bg-blue-600 flex items-center justify-center font-black italic text-lg border border-white/10">
              {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase text-[9px]">Cliente Autenticado</p>
              <p className="font-black italic uppercase text-sm tracking-tight">
                {session?.user?.name || "Utilizador"}
              </p>
            </div>
          </div>
        </div>

        {/* LISTAGEM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2 text-slate-400">
                <Car className="text-blue-600" size={18} /> Frota Pessoal ({vehicles.length})
              </h2>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-white text-white hover:text-black px-4 py-2 font-black uppercase italic text-[10px] transition-all flex items-center gap-2 skew-x-[-12deg]"
              >
                <span className="skew-x-[12deg] flex items-center gap-2">
                  <Plus size={14} /> Registar Viatura
                </span>
              </button>
            </div>

            {vehicles.length > 0 ? (
              vehicles.map((vehicle: any) => (
                <div key={vehicle.id} className="bg-[#0a0c10] border border-white/5 p-1 group relative hover:border-blue-600/50 transition-all duration-500">
                  <div className="bg-[#0d0f14] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl pointer-events-none" 
                         style={{ backgroundColor: carColors.find(c => c.value === vehicle.color)?.hex || '#2563eb' }} />

                    <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                      <div className="space-y-6">
                        <div>
                          <p className="text-blue-600 font-black uppercase italic text-[10px] tracking-[0.2em] mb-1">
                            {vehicle.brand} {vehicle.model}
                          </p>
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-4">
                            Viatura #{vehicle.id.toString().slice(-3)}
                          </h3>
                          
                          <div className="inline-block bg-[#f3c623] p-1 shadow-[6px_6px_0px_#000] rotate-[-1deg] group-hover:rotate-0 transition-transform">
                            <div className="bg-white border-2 border-black px-6 py-2 flex items-center gap-4">
                               <div className="w-4 h-6 bg-blue-700 rounded-sm flex items-center justify-center text-white text-[5px] font-bold">P</div>
                               <span className="text-3xl font-mono font-black text-black tracking-tighter">{vehicle.plate}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-end items-end">
                        <Link href={`/agendar/${vehicle.id}`} className="bg-white text-black px-6 py-3 font-black uppercase italic text-xs hover:bg-blue-600 hover:text-white transition-all skew-x-[-12deg]">
                          <span className="skew-x-[12deg] inline-block">Marcar Revisão</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-2 border-dashed border-white/5 p-24 text-center bg-[#0a0c10]/50 backdrop-blur-sm">
                <AlertCircle size={48} className="mx-auto text-slate-800 mb-6" />
                <h3 className="text-white font-black uppercase italic text-xl mb-2">Sem Viaturas Registadas</h3>
                <p className="text-slate-500 text-xs mb-8 uppercase font-bold">É necessário um veículo para aceder aos serviços técnicos.</p>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-8 py-4 font-black uppercase italic text-xs hover:bg-white hover:text-black transition-all">
                  Registar Primeira Viatura
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddVehicleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddCar}
        loading={loading}
      />
    </div>
  );
}