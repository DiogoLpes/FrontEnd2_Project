// src/app/admin/dashboard/page.tsx
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
    <div className="p-6 space-y-8 bg-[#05070a] min-h-screen text-white">
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
        <Card className="lg:col-span-2 bg-[#09090b] border-white/5">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={16} /> Performance Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-end justify-between gap-3 pt-4">
              {[50, 80, 40, 95, 70, 85, 30].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <div style={{ height: `${h}%` }} className="bg-blue-600/20 group-hover:bg-blue-600/40 transition-all rounded-t-lg w-full absolute bottom-0"></div>
                  <div style={{ height: `${h-10}%` }} className="bg-blue-600 w-full rounded-t-lg transition-all absolute bottom-0 shadow-[0_0_15px_rgba(37,99,235,0.3)]"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-black text-slate-600 uppercase">
              <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
            </div>
          </CardContent>
        </Card>

        {/* ÚLTIMAS ENTRADAS */}
        <Card className="bg-[#09090b] border-white/5">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Clock className="text-blue-500" size={16} /> Últimos Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {servicos.slice(0, 5).map((s: any) => (
              <div key={s.id} className="flex items-center justify-between group">
                <div>
                  <p className="text-xs font-bold text-white uppercase">{s.vehicle?.plate}</p>
                  <p className="text-[10px] text-slate-500 uppercase">{s.type}</p>
                </div>
                <div className={`text-[9px] font-black px-2 py-1 rounded ${
                  s.status === 'PENDENTE' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {s.status}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color, alert }: any) {
  const colors: any = {
    blue: "border-blue-600/20 text-blue-600",
    amber: "border-amber-600/20 text-amber-600",
    emerald: "border-emerald-600/20 text-emerald-600",
  };
  return (
    <div className={`bg-[#09090b] border ${alert ? 'border-amber-600/50 animate-pulse' : 'border-white/5'} p-6 rounded-2xl relative overflow-hidden group`}>
      <div className={`absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform ${colors[color]}`}>
        {React.cloneElement(icon, { size: 80 })}
      </div>
      <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h2 className="text-4xl font-black italic tracking-tighter text-white">{value}</h2>
        {alert && <span className="text-[10px] font-bold text-amber-500 italic">ACTION REQ.</span>}
      </div>
    </div>
  );
}