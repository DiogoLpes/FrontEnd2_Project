"use client";

import { useState } from "react";
import { Car, Plus, ChevronRight, Trash2 } from "lucide-react";
import Link from "next/link";
import AddVehicleModal from "./addcar/page"; 
import { addVehicleAction, deleteVehicleAction } from "@/app/_actions/vehicle"; 
import Swal from "sweetalert2";

export default function DashboardClient({ initialVehicles }: any) {
  const [vehicles, setVehicles] = useState(initialVehicles || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Formatação correta: 2 caracteres e 1 hífen entre eles (Ex: AA-00-AA)
  const formatPlate = (p: string) => p.replace(/[^A-Z0-9]/g, "").match(/.{1,2}/g)?.join("-") || p;

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Apagar Viatura?",
      text: "Isso removerá os dados permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      background: "#0d0f14", color: "#fff"
    });

    if (result.isConfirmed) {
      await deleteVehicleAction(id);
      setVehicles(vehicles.filter((v: any) => v.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-32 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER SEM NOME DO USER */}
        <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-12 h-[3px] bg-blue-600"></span>
              <p className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px]">TS PNEUS PERFORMANCE</p>
            </div>
            <h1 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
              MINHA <span className="text-blue-600">GARAGEM</span>
            </h1>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xs font-black italic uppercase text-slate-500">Veículos: {vehicles.length}</h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 px-8 py-3 font-black uppercase italic skew-x-[-12deg] flex items-center gap-2">
            <Plus size={20} /> <span className="skew-x-[12deg]">Novo Registo</span>
          </button>
        </div>

        <div className="grid gap-8">
          {vehicles.map((v: any) => (
            <div key={v.id} className="bg-[#0a0c10] border border-white/5 relative group min-h-[300px] flex overflow-hidden">
              <div className="p-8 w-full md:w-1/2 z-20 flex flex-col justify-between bg-gradient-to-r from-[#0d0f14] via-[#0d0f14]/90 to-transparent">
                <div className="space-y-4">
                  <h3 className="text-5xl font-black italic uppercase leading-none">{v.brand} <span className="text-blue-600">{v.model}</span></h3>
                  <div className="inline-block bg-yellow-400 p-1 shadow-[4px_4px_0px_#2563eb]">
                    <div className="bg-white border-2 border-black px-4 py-1 text-black font-mono font-black text-2xl">
                      {formatPlate(v.plate)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Link href={`/agenda?plate=${v.plate}`} className="bg-white text-black px-6 py-3 font-black uppercase italic text-xs flex items-center gap-2">
                    Agendar <ChevronRight size={16} />
                  </Link>
                  <button onClick={() => handleDelete(v.id)} className="p-3 border border-white/10 hover:bg-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* IMAGEM SEM CROSSORIGIN PARA EVITAR BLOQUEIO */}
              <div className="absolute right-0 top-0 w-full md:w-2/3 h-full z-10">
                <img 
                  src={v.imageUrl} 
                  alt={v.model} 
                  className="w-full h-full object-contain object-right opacity-80 group-hover:opacity-100 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f14] to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddVehicleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={async (d: any) => {
        setLoading(true);
        const res = await addVehicleAction(d);
        setVehicles([res, ...vehicles]);
        setIsModalOpen(false);
        setLoading(false);
      }} loading={loading} />
    </div>
  );
}