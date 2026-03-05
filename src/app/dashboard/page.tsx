import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth"; 
import { redirect } from "next/navigation";
import prisma from "../lib/prisma";
import { Car, Wrench, History, Plus, AlertCircle, Gauge, Settings, Fuel } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth?mode=login");

  // Procurar veículos e incluir os campos brand e model
  const userVehicles = await prisma.vehicle.findMany({
    where: { owner: { email: session.user?.email as string } },
    orderBy: { id: 'desc' } // O mais recente aparece primeiro
  });

  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-32 pb-12 px-6 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')] bg-cover opacity-[0.03] grayscale pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* HEADER */}
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
              {session.user?.name?.charAt(0)}
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase text-[9px]">Cliente Autenticado</p>
              <p className="font-black italic uppercase text-sm tracking-tight">{session.user?.name}</p>
            </div>
          </div>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LISTA DE VEÍCULOS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2 text-slate-400">
                <Car className="text-blue-600" size={18} /> Frota Pessoal ({userVehicles.length})
              </h2>
              
              <Link 
                href="/dashboard/addcar" 
                className="bg-blue-600 hover:bg-white text-white hover:text-black px-4 py-2 font-black uppercase italic text-[10px] transition-all flex items-center gap-2 skew-x-[-12deg] shadow-[4px_4px_0px_rgba(37,99,235,0.2)]"
              >
                <span className="skew-x-[12deg] flex items-center gap-2">
                  <Plus size={14} /> Registar Viatura
                </span>
              </Link>
            </div>

            {userVehicles.length > 0 ? (
              userVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-[#0a0c10] border border-white/5 p-1 group relative hover:border-blue-600/50 transition-all duration-500">
                  <div className="bg-[#0d0f14] p-8 relative overflow-hidden">
                    
                    {/* Marca de Água no Fundo do Card */}
                    <div className="absolute -bottom-6 -right-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                      <Car size={180} className="-rotate-12" />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                      <div className="space-y-6">
                        <div>
                          {/* Marca e Modelo */}
                          <p className="text-blue-600 font-black uppercase italic text-[10px] tracking-[0.2em] mb-1">
                            {vehicle.brand && vehicle.brand !== "Desconhecido" ? `${vehicle.brand} ${vehicle.model}` : "Especificação Pendente"}
                          </p>
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-4">
                            Viatura #{vehicle.id.toString().padStart(3, '0')}
                          </h3>
                          
                          {/* MATRÍCULA REALISTA */}
                          <div className="inline-block bg-[#f3c623] p-1 shadow-[6px_6px_0px_#000] rotate-[-1deg] group-hover:rotate-0 transition-transform">
                            <div className="bg-white border-2 border-black px-6 py-2 flex items-center gap-4">
                               <div className="w-4 h-6 bg-blue-700 rounded-sm flex flex-col items-center justify-center">
                                  <span className="text-[5px] text-white font-bold">P</span>
                               </div>
                               <span className="text-3xl font-mono font-black text-black tracking-tighter">
                                {vehicle.plate}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-slate-500">
                            <Settings size={14} />
                            <span className="text-[10px] font-bold uppercase">Check-up OK</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <Fuel size={14} />
                            <span className="text-[10px] font-bold uppercase">Diesel/Gasolina</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end gap-6">
                        <div className="flex gap-2">
                           <button className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-all">
                              <History size={18} />
                           </button>
                           <button className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-all">
                              <Wrench size={18} />
                           </button>
                        </div>
                        
                        <Link href="/Agenda" className="bg-white text-black px-6 py-3 font-black uppercase italic text-xs hover:bg-blue-600 hover:text-white transition-all skew-x-[-12deg]">
                          <span className="skew-x-[12deg] inline-block">Marcar Revisão</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* ESTADO VAZIO */
              <div className="border-2 border-dashed border-white/5 p-24 text-center bg-[#0a0c10]/50 backdrop-blur-sm">
                <AlertCircle size={48} className="mx-auto text-slate-800 mb-6" />
                <h3 className="text-white font-black uppercase italic text-xl mb-2">Sem Viaturas no Sistema</h3>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-8">É necessário registar um veículo para aceder aos serviços.</p>
                <Link href="/dashboard/adicionar-carro" className="bg-blue-600 text-white px-8 py-4 font-black uppercase italic text-xs hover:bg-white hover:text-black transition-all">
                  Registar Primeira Viatura
                </Link>
              </div>
            )}
          </div>

          {/* SIDEBAR TÉCNICA */}
          <div className="space-y-6">
             {/* Card de Imagem Estilizado */}
             <div className="relative h-64 overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?q=80&w=800" 
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                  alt="Oficina TS Pneus" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <span className="bg-blue-600 w-fit text-[8px] font-black px-2 py-1 uppercase mb-2">Performance Center</span>
                  <p className="text-lg font-black italic uppercase leading-tight text-white">Especialistas em <br/><span className="text-blue-600">Alta Cilindrada</span></p>
                </div>
             </div>
             
             {/* Estatísticas Rápidas */}
             <div className="bg-[#0a0c10] border border-white/5 p-6 shadow-xl">
                <h4 className="font-black italic uppercase text-[10px] mb-6 flex items-center gap-2 border-b border-white/5 pb-4 text-blue-600 tracking-widest">
                  <Gauge size={14} /> Performance Log
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white/5 p-4 border-l-2 border-blue-600">
                    <span className="text-[9px] font-black uppercase text-slate-400">Total Serviços</span>
                    <span className="text-white font-black italic text-lg">0</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 border-l-2 border-slate-700">
                    <span className="text-[9px] font-black uppercase text-slate-400">Pontos TS</span>
                    <span className="text-blue-500 font-black italic text-lg">150</span>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}