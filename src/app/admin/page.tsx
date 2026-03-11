import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { updateServiceStatusAction, deleteServiceAction } from "../_actions/admin";
import { 
  Calendar, 
  Car, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Wrench,
  Trash2
} from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect("/auth/login");

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // Só permite entrada a utilizadores com role ADMIN
  if (currentUser?.role !== "ADMIN") redirect("/dashboard");

  const services = await prisma.service.findMany({
    include: {
      vehicle: {
        include: { owner: true },
      },
    },
    orderBy: { date: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-6 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
              PAINEL DE <span className="text-blue-600">CONTROLO</span>
            </h1>
            <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Administração TS Pneus</p>
          </div>
          <div className="bg-[#0d0f14] border border-white/5 p-5 rounded-2xl shadow-xl">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 text-center">Agendamentos</p>
            <p className="text-3xl font-black text-blue-600 text-center">{services.length}</p>
          </div>
        </div>

        {/* TABELA */}
        <div className="bg-[#0d0f14] border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.03] text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="p-6">Viatura & Cliente</th>
                  <th className="p-6">Serviço</th>
                  <th className="p-6">Data / Hora</th>
                  <th className="p-6">Estado</th>
                  <th className="p-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 border border-blue-600/20">
                          <Car size={18} />
                        </div>
                        <div>
                          <p className="font-black uppercase text-sm tracking-tight">{s.vehicle.brand} {s.vehicle.model}</p>
                          <p className="text-xs text-slate-500 font-mono uppercase italic">{s.vehicle.plate}</p>
                          <p className="text-[10px] text-blue-500 font-bold mt-1 uppercase italic">👤 {s.vehicle.owner.name || s.vehicle.owner.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-6">
                      <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-200">
                        <Wrench size={12} className="text-blue-600" />
                        {s.type}
                      </span>
                    </td>

                    <td className="p-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-black text-slate-200">
                          <Calendar size={14} className="text-blue-600" />
                          {new Date(s.date).toLocaleDateString('pt-PT')}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                          <Clock size={14} />
                          {new Date(s.date).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                        s.status === 'PENDENTE' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                        s.status === 'CONCLUIDO' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {s.status}
                      </div>
                    </td>

                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* AÇÃO: CONCLUIR */}
                        {s.status !== "CONCLUIDO" && (
                          <form action={updateServiceStatusAction.bind(null, String(s.id), "CONCLUIDO")}>
                            <button className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20">
                              <CheckCircle size={18} />
                            </button>
                          </form>
                        )}
                        
                        {/* AÇÃO: APAGAR */}
                        <form action={deleteServiceAction.bind(null, String(s.id))}>
                          <button className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20">
                            <Trash2 size={18} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}