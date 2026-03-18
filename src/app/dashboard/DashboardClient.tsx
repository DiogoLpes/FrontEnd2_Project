"use client";

import { useState, useEffect } from "react";
import { Plus, ChevronRight, Trash2, Fuel, Calendar, Palette, Zap } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import AddVehicleModal from "./addcar/page"; 
import { addVehicleAction, deleteVehicleAction } from "@/app/_actions/vehicle"; 
import Swal from "sweetalert2";

export default function DashboardClient({ initialVehicles }: any) {
  const [vehicles, setVehicles] = useState(initialVehicles || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // CENÁRIO B: Detetar se o user foi mandado para aqui porque não tinha carros
  useEffect(() => {
    if (searchParams.get("reason") === "booking") {
      setIsModalOpen(true);
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        background: "#14171c",
        color: "#fff"
      });
      toast.fire({
        icon: 'info',
        title: 'Registe um veículo para agendar'
      });
    }
  }, [searchParams]);

  const formatPlate = (p: string) => p.replace(/[^A-Z0-9]/g, "").match(/.{1,2}/g)?.join("-") || p;

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "REMOVER VIATURA?",
      text: "Esta ação não pode ser revertida.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#1f2937",
      background: "#0d0f14", 
      color: "#fff"
    });

    if (result.isConfirmed) {
      await deleteVehicleAction(id);
      setVehicles(vehicles.filter((v: any) => v.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-32 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER */}
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
          <h2 className="text-xs font-black italic uppercase text-slate-500 underline decoration-blue-600 underline-offset-8 decoration-2">
            Frota Ativa: {vehicles.length} unidades
          </h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 px-8 py-4 font-black uppercase italic skew-x-[-12deg] flex items-center gap-3 hover:bg-white hover:text-black transition-all group">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            <span className="skew-x-[12deg]">Novo Registo</span>
          </button>
        </div>

        {/* LISTAGEM DE CARROS */}
        <div className="grid gap-6">
          {vehicles.length === 0 ? (
            <div className="py-20 border-2 border-dashed border-white/5 text-center">
              <p className="text-slate-600 uppercase font-black italic">Nenhum veículo registado no sistema.</p>
            </div>
          ) : (
            vehicles.map((v: any) => (
              <div key={v.id} className="bg-[#0a0c10] border border-white/5 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-blue-600/30 transition-all relative overflow-hidden">
                <div className="space-y-4 flex-1">
                  <h3 className="text-5xl font-black italic uppercase leading-none tracking-tighter">
                    {v.brand} <span className="text-blue-600">{v.model}</span>
                  </h3>

                  <div className="flex flex-wrap gap-8 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Fuel size={14} className="text-blue-600" />
                      <span className="text-[10px] font-black uppercase italic">{v.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-white/10 pl-8">
                      <Calendar size={14} className="text-blue-600" />
                      <span className="text-[10px] font-black uppercase italic">{v.year}</span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-white/10 pl-8">
                      <Palette size={14} className="text-blue-600" />
                      <span className="text-[10px] font-black uppercase italic">{v.color}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-5 min-w-[220px]">
                  <div className="bg-yellow-400 p-1 shadow-[4px_4px_0px_#2563eb]">
                    <div className="bg-white border-2 border-black px-6 py-2 text-black font-mono font-black text-3xl tracking-tight">
                      {formatPlate(v.plate)}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full">
                    <Link href={`/agendamento?plate=${v.plate}`} className="flex-1 bg-white text-black px-4 py-3 font-black uppercase italic text-[10px] flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                      Agendar <ChevronRight size={14} />
                    </Link>
                    <button onClick={() => handleDelete(v.id)} className="p-3 border border-white/10 hover:bg-red-600 transition-colors text-white">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddVehicleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={async (d: any) => {
          setLoading(true);
          try {
            const res = await addVehicleAction(d);
            // Redirecionamento inteligente:
            if (searchParams.get("reason") === "booking") {
              router.push(`/agendamento?plate=${res.plate}`);
            } else {
              setVehicles([res, ...vehicles]);
              setIsModalOpen(false);
              Swal.fire({ title: "SUCESSO", text: "Viatura registada.", icon: "success", background: "#0d0f14", color: "#fff" });
            }
          } catch (err: any) {
            Swal.fire("ERRO", err.message, "error");
          } finally {
            setLoading(false);
          }
        }} 
        loading={loading} 
      />
    </div>
  );
}