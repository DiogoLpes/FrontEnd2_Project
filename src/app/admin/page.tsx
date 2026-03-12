import prisma from "@/app/lib/prisma";
import { Wrench, Users, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default async function AdminDashboard() {
  // Busca dados para o resumo
  const totalClientes = await prisma.user.count();
  const servicos = await prisma.service.findMany();
  
  const pendentes = servicos.filter(s => s.status === "PENDENTE").length;
  const concluidos = servicos.filter(s => s.status === "CONCLUIDO").length;

  return (
    <div className="space-y-10">
      {/* TÍTULO */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-slate-500 text-sm font-medium">Bem-vindo ao centro de gestão da TS Pneus.</p>
      </div>

      {/* CARDS DE MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Clientes" value={totalClientes} icon={<Users size={20}/>} color="blue" />
        <MetricCard title="Serviços Totais" value={servicos.length} icon={<Wrench size={20}/>} color="indigo" />
        <MetricCard title="Em Espera" value={pendentes} icon={<AlertCircle size={20}/>} color="amber" />
        <MetricCard title="Finalizados" value={concluidos} icon={<CheckCircle size={20}/>} color="emerald" />
      </div>

      {/* ÁREA DE GRÁFICOS (SIMULADA POR AGORA) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#09090b] border border-white/5 p-6 rounded-xl">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-500" /> 
            Atividade Semanal
          </h3>
          <div className="h-[200px] flex items-end justify-between gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-600/20 rounded-t-sm relative group">
                <div style={{ height: `${h}%` }} className="bg-blue-600 w-full rounded-t-sm group-hover:bg-blue-400 transition-all cursor-pointer"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-1">
            <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
          </div>
        </div>

        {/* ÚLTIMOS AGENDAMENTOS (RESUMO) */}
        <div className="bg-[#09090b] border border-white/5 p-6 rounded-xl">
           <h3 className="text-white font-bold mb-6">Próximas Visitas</h3>
           <div className="space-y-4">
              {servicos.slice(0, 4).map((s, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-sm font-medium text-slate-300">{s.type}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono italic">{new Date(s.date).toLocaleDateString()}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

// Componente Interno para os Cards
function MetricCard({ title, value, icon, color }: any) {
  const colors: any = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  };
  
  return (
    <div className="bg-[#09090b] border border-white/5 p-6 rounded-xl">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2 rounded-lg border ${colors[color]}`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
    </div>
  );
}