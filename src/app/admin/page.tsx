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
        <Card className="lg:col-span-2 bg-[#09090b] border-white/10 shadow-none rounded-xl overflow-hidden">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-sm font-semibold tracking-tight text-slate-200">
              Pedidos de Serviço (7 dias)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[250px] flex items-end justify-between gap-2">
              {[50, 80, 40, 95, 70, 85, 30].map((h, i) => (
                <div key={i} className="flex-1 group relative h-full flex items-end">
                  <div style={{ height: `${h}%` }} className="bg-blue-600 hover:bg-blue-500 transition-colors rounded-t-sm w-full z-10"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-medium text-slate-500">
              <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
            </div>
          </CardContent>
        </Card>

        {/* ÚLTIMAS ENTRADAS */}
        <Card className="bg-[#09090b] border-white/10 shadow-none rounded-xl overflow-hidden">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-sm font-semibold tracking-tight text-slate-200">
              Últimas Atividades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {servicos.slice(0, 5).map((s: any) => (
              <div key={s.id} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-white">{s.vehicle?.plate || "S/ MATRÍCULA"}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.type}</p>
                </div>
                <div className="text-xs font-medium text-slate-400">
                  {s.status === 'PENDENTE' ? 'Aguardando' : 'Ativo'}
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
    blue: "text-slate-400",
    amber: "text-amber-500",
    emerald: "text-slate-400",
  };
  
  return (
    <div className={`bg-[#09090b] border ${alert ? 'border-amber-500/50' : 'border-white/10'} p-6 rounded-xl hover:bg-[#101013] transition-colors`}>
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <div className={colors[color]}>
          {React.cloneElement(icon, { size: 16 })}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className={`text-2xl font-bold ${alert ? 'text-amber-500' : 'text-white'}`}>{value}</h2>
        {alert && <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/10 rounded text-amber-500 font-semibold uppercase tracking-wider">Atenção</span>}
      </div>
    </div>
  );
}