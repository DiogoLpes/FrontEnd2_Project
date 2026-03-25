export const dynamic = "force-dynamic";

import React from "react";
import prisma from "@/app/lib/prisma";
import { Wrench, Users, AlertCircle, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"; // Assumindo que tens shadcn

export default async function AdminDashboard() {
  // 1. Busca dados frescos
  const totalClientes = await prisma.user.count();
  const servicos = await prisma.service.findMany({
    include: { vehicle: true },
    orderBy: { createdAt: 'desc' }
  });
  
  // No teu schema o status inicial é PENDENTE, não SOLICITADO
  const pendentes = servicos.filter((s: any) => s.status === "PENDENTE").length;
  const concluidos = servicos.filter((s: any) => s.status === "CONCLUIDO").length;
  const emReparacao = servicos.filter((s: any) => s.status === "EM_REPARACAO").length;
  return (
    <div className="p-6 space-y-8 min-h-screen text-white relative selection:bg-blue-600/30 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1597551681492-10c86e481048?q=80&w=2000')] bg-cover bg-center bg-fixed opacity-10" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/95 to-[#05070a]" />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
      {/* HEADER DINÂMICO */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Control <span className="text-blue-600">Center</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Monitorização em Tempo Real</p>
        </div>
        <div className="text-right">
            <span className="text-[10px] bg-blue-600/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded-full font-bold animate-pulse">
               LIVE SYSTEM ACTIVE
            </span>
        </div>
      </div>

      {/* MÉTRICAS ESTILO SHADCN + TEU ESTILO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Clientes" value={totalClientes} icon={<Users />} color="blue" />
        <MetricCard title="Em Espera" value={pendentes} icon={<AlertCircle />} color="amber" alert={pendentes > 0} />
        <MetricCard title="Na Oficina" value={emReparacao} icon={<Wrench />} color="blue" />
        <MetricCard title="Concluídos" value={concluidos} icon={<CheckCircle />} color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GRÁFICO SHADCN (SIMULADO COM TAILWIND) */}
        <Card className="lg:col-span-2 bg-white/[0.02] backdrop-blur-2xl border-white/10 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-black/20 border-b border-white/5 py-5">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-3 text-white">
              <TrendingUp className="text-blue-500" size={18} /> Fluxo de Reparações Semanal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[250px] flex items-end justify-between gap-4">
              {[50, 80, 40, 95, 70, 85, 30].map((h, i) => (
                <div key={i} className="flex-1 group relative h-full flex items-end">
                  <div className="absolute inset-0 bg-white/5 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div style={{ height: `${h}%` }} className="bg-gradient-to-t from-blue-600/20 to-blue-500/40 border-t-2 border-blue-400 group-hover:from-blue-600/40 group-hover:to-blue-400/60 transition-all rounded-t-xl w-full z-10 shadow-[0_0_20px_rgba(59,130,246,0.2)]"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
            </div>
          </CardContent>
        </Card>

        {/* ÚLTIMAS ENTRADAS */}
        <Card className="bg-white/[0.02] backdrop-blur-2xl border-white/10 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-black/20 border-b border-white/5 py-5">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-3 text-white">
              <Clock className="text-blue-500" size={18} /> Últimos Registos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {servicos.slice(0, 5).map((s: any) => (
              <div key={s.id} className="flex items-center justify-between group p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-blue-500/30 transition-colors">
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-tight">{s.vehicle?.plate}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{s.type}</p>
                </div>
                <div className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-inner ${
                  s.status === 'PENDENTE' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                }`}>
                  {s.status}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color, alert }: any) {
  const colors: any = {
    blue: "border-blue-500/30 text-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    amber: "border-amber-500/30 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    emerald: "border-emerald-500/30 text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.15)]",
  };
  
  return (
    <div className={`bg-white/[0.02] backdrop-blur-3xl border ${alert ? 'border-amber-500/50 animate-pulse' : 'border-white/10'} p-8 rounded-[2rem] relative overflow-hidden group hover:bg-white/[0.04] transition-all`}>
      <div className={`absolute -right-6 -top-6 opacity-[0.07] group-hover:scale-125 transition-transform duration-700 ${colors[color]}`}>
        {React.cloneElement(icon, { size: 120 })}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{title}</p>
      <div className="flex items-baseline gap-3 relative z-10">
        <h2 className={`text-6xl font-black italic tracking-tighter ${alert ? 'text-amber-500' : 'text-white'}`}>{value}</h2>
        {alert && <span className="text-[9px] px-2 py-1 bg-amber-500/20 rounded border border-amber-500/30 font-black text-amber-500 uppercase tracking-widest">Ação Necessária</span>}
      </div>
    </div>
  );
}