"use client";

import { useState, useEffect } from "react";
import { Car, Plus, AlertCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import AddVehicleModal from "./addcar/page"; 
import { addVehicleAction } from "@/app/_actions/vehicle"; 
import { carColors } from "../lib/cardata";
import Swal from "sweetalert2";
import { useSearchParams, useRouter } from "next/navigation"; 

export default function DashboardClient({ session, initialVehicles }: any) {
  const [vehicles, setVehicles] = useState(initialVehicles || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sincroniza o estado se o servidor enviar novos dados
  useEffect(() => {
    setVehicles(initialVehicles);
  }, [initialVehicles]);

  // Abre o modal via URL se necessário
  useEffect(() => {
    const openModal = searchParams.get("openModal");
    if (openModal === "true") setIsModalOpen(true);
  }, [searchParams]);

  const handleAddCar = async (data: any) => {
    setLoading(true);
    try {
      const newCar = await addVehicleAction(data);
      
      // Feedback visual imediato
      setVehicles([newCar, ...vehicles]);
      setIsModalOpen(false);
      
      // Atualiza os dados do Server Component
      router.refresh(); 
      
      Swal.fire({
        title: "GARAGEM ATUALIZADA",
        text: `${data.brand} registado com sucesso no sistema.`,
        icon: "success",
        background: "#0d0f14",
        color: "#fff",
        confirmButtonColor: "#2563eb",
        customClass: { popup: 'border border-white/10' }
      });
    } catch (err) {
      Swal.fire("Erro", "Não foi possível processar o registo.", "error");
    } finally {
      setLoading(false);
    }
  };

  const formatPlate = (plate: string) => {
    return plate.toUpperCase().replace(/(.{2})(?=.+)/g, '$1-').replace(/-$/, '');
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-32 pb-12 px-6 relative overflow-hidden font-sans">
      {/* Background Cinematográfico */}
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000')] bg-cover opacity-[0.02] grayscale pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* HEADER ESTILO TERMINAL */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-12 h-[3px] bg-blue-600"></span>
              <p className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px]">TS PNEUS PERFORMANCE</p>
            </div>
            <h1 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
              MINHA <span className="text-blue-600 text-outline">GARAGEM</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6 bg-[#0a0c10]/80 backdrop-blur-md p-5 border border-white/5 shadow-2xl skew-x-[-10deg]">
             <div className="skew-x-[10deg] flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 flex items-center justify-center font-black italic text-xl border border-white/20">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">User_Session</p>
                  <p className="font-black italic uppercase text-sm tracking-tight">{session?.user?.name}</p>
                </div>
             </div>
          </div>
        </div>

        {/* CONTROLO DA LISTA */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-black italic uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <Car size={14} className="text-blue-600" /> Veículos em Parque: {vehicles.length}
            </h2>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group bg-blue-600 hover:bg-white text-white hover:text-black px-8 py-3 font-black uppercase italic text-[11px] transition-all flex items-center gap-3 skew-x-[-12deg] border border-blue-500/50"
          >
            <Plus size={18} className="skew-x-[12deg]" /> 
            <span className="skew-x-[12deg]">Novo Registo</span>
          </button>
        </div>

        {/* GRID DE VIATURAS */}
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {vehicles.map((vehicle: any) => (
              <div key={vehicle.id} className="bg-[#0a0c10] border border-white/5 group relative hover:border-blue-600/40 transition-all duration-700 shadow-2xl overflow-hidden">
                <div className="bg-[#0d0f14] p-0 md:p-1 relative min-h-[320px] flex">
                  
                  {/* LADO ESQUERDO: INFO */}
                  <div className="w-full md:w-3/5 p-8 relative z-20 flex flex-col justify-between bg-gradient-to-r from-[#0d0f14] via-[#0d0f14]/90 to-transparent">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_#2563eb] animate-pulse"></span>
                         <p className="text-blue-500 font-black uppercase text-[9px] tracking-[0.3em]">Status: Ready for Service</p>
                      </div>
                      
                      <div>
                        <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none mb-4 group-hover:translate-x-2 transition-transform duration-500">
                          {vehicle.brand} <br />
                          <span className="text-blue-600">{vehicle.model}</span>
                        </h3>

                        {/* Matrícula Estilo Real */}
                        <div className="inline-block bg-[#f3c623] p-0.5 shadow-[6px_6px_0px_#2563eb] rotate-[-1deg] group-hover:rotate-0 transition-all duration-500">
                          <div className="bg-white border-[2px] border-black px-6 py-2 flex items-center gap-4">
                             <div className="w-4 h-7 bg-blue-700 rounded-sm flex items-center justify-center text-white text-[6px] font-bold">P</div>
                             <span className="text-3xl font-mono font-black text-black tracking-tighter">
                               {formatPlate(vehicle.plate)}
                             </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 mt-8">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Cor Original</span>
                        <div className="flex items-center gap-2">
                           <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: carColors.find(c => c.value === vehicle.color)?.hex }} />
                           <span className="text-xs font-bold uppercase italic text-slate-300">{vehicle.color}</span>
                        </div>
                      </div>
                      <Link 
                        href={`/agendar?plate=${vehicle.plate}`} 
                        className="bg-white text-black px-8 py-4 font-black uppercase italic text-xs hover:bg-blue-600 hover:text-white transition-all skew-x-[-12deg] flex items-center gap-2 group/btn"
                      >
                        <span className="skew-x-[12deg]">Agendar Agora</span>
                        <ChevronRight size={18} className="skew-x-[12deg] group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* LADO DIREITO: IMAGEM IA */}
                  <div className="absolute right-0 top-0 w-full md:w-3/4 h-full z-10">
                    {vehicle.imageUrl ? (
                      <div className="relative w-full h-full group">
                        <img 
                          src={vehicle.imageUrl} 
                          alt={vehicle.model}
                          className="w-full h-full object-cover object-center md:object-right opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                        />
                        {/* Overlay para fusão com o fundo preto */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f14] via-[#0d0f14]/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-blue-900/5 flex items-center justify-center">
                         <Car size={120} className="text-white/5 rotate-12" />
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white/5 p-32 text-center bg-[#0a0c10]/40 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <AlertCircle size={64} className="mx-auto text-blue-600/20 mb-6" />
            <h3 className="text-white font-black uppercase italic text-3xl mb-3 tracking-tighter">Garagem Vazia</h3>
            <p className="text-slate-500 text-xs mb-10 uppercase font-bold tracking-[0.3em]">Nenhum motor registado no sistema central.</p>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-blue-600 text-white px-12 py-5 font-black uppercase italic text-sm hover:bg-white hover:text-black transition-all skew-x-[-12deg] shadow-[0_0_30px_rgba(37,99,235,0.3)]"
            >
              <span className="skew-x-[12deg] inline-block">Registar Primeira Viatura</span>
            </button>
          </div>
        )}
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