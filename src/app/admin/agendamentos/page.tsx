"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, 
  Car, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Wrench,
  Search,
  Filter
} from "lucide-react";
import Swal from "sweetalert2";

export default function AdminAgendamentos() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Erro ao carregar agendamentos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/services", {
        method: "PATCH",
        body: JSON.stringify({ id, status: newStatus }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.ok) {
        // Notificação rápida no canto
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          background: "#0d1117",
          color: "#fff"
        });
        Toast.fire({ icon: 'success', title: 'Estado atualizado' });
        fetchServices();
      }
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase italic text-white tracking-tighter">
            Controlo de <span className="text-blue-600">Oficina</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Gestão de Fluxo e Reparações</p>
        </div>
        
        <div className="flex gap-2">
           <div className="bg-[#0d1117] border border-white/5 p-2 px-4 flex items-center gap-2 text-slate-400 text-xs">
              <Search size={14} />
              <input placeholder="Procurar matrícula..." className="bg-transparent outline-none uppercase font-bold w-32" />
           </div>
        </div>
      </div>

      {/* LISTAGEM DE SERVIÇOS */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center p-20 text-blue-600 animate-pulse font-black uppercase italic">A carregar agendamentos...</div>
        ) : (
          services.map((s: any) => (
            <div key={s.id} className="bg-[#0d1117] border border-white/5 p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:border-blue-600/30 transition-all group relative overflow-hidden">
              
              {/* Barra lateral de estado */}
              <div className={`absolute left-0 top-0 h-full w-1 ${
                s.status === 'PENDENTE' ? 'bg-orange-500' : s.status === 'EM_REPARACAO' ? 'bg-blue-500' : 'bg-green-500'
              }`}></div>

              {/* COLUNA 1: CLIENTE E VEÍCULO */}
              <div className="flex gap-5 flex-1">
                <div className={`w-14 h-14 flex items-center justify-center border transition-colors ${
                  s.status === 'PENDENTE' ? 'bg-orange-500/5 border-orange-500/20 text-orange-500' : 
                  s.status === 'EM_REPARACAO' ? 'bg-blue-500/5 border-blue-500/20 text-blue-500' : 
                  'bg-green-500/5 border-green-500/20 text-green-500'
                }`}>
                  <Car size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-black uppercase italic text-base tracking-tighter">
                      {s.vehicle?.brand} {s.vehicle?.model}
                    </span>
                    <span className="bg-[#161b22] px-2 py-0.5 border border-white/10 text-blue-400 font-mono text-[10px] font-bold">
                      {s.vehicle?.plate}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1.5">
                      <User size={12} className="text-slate-600" /> {s.vehicle?.owner?.name || "N/D"} 
                      <span className="text-slate-700 mx-1">|</span> 
                      <span className="text-slate-500">{s.vehicle?.owner?.phone}</span>
                    </p>
                    <p className="text-slate-500 text-xs mt-2 italic line-clamp-1 border-l border-white/10 pl-3">
                      "{s.description || "Sem notas adicionais"}"
                    </p>
                  </div>
                </div>
              </div>

              {/* COLUNA 2: TIPO E DATA */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end gap-6 lg:gap-1 border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0 w-full lg:w-auto">
                <div className="flex flex-col lg:items-end">
                   <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1">
                    <Wrench size={10} /> {s.type}
                   </span>
                   <div className="flex items-center gap-2 text-white font-mono text-sm mt-1">
                     <Calendar size={14} className="text-slate-600" />
                     {new Date(s.date).toLocaleDateString()}
                   </div>
                </div>
              </div>

              {/* COLUNA 3: AÇÕES (SELECT) */}
              <div className="flex items-center gap-3 w-full lg:w-64">
                <div className="flex-1 relative">
                  <select 
                    value={s.status}
                    onChange={(e) => updateStatus(s.id, e.target.value)}
                    className={`w-full bg-[#161b22] border border-white/10 text-[10px] font-black uppercase p-3 pr-8 outline-none cursor-pointer appearance-none transition-all focus:border-blue-600
                      ${s.status === 'PENDENTE' ? 'text-orange-500' : s.status === 'EM_REPARACAO' ? 'text-blue-500' : 'text-green-500'}`}
                  >
                    <option value="PENDENTE">🟡 AGUARDAR</option>
                    <option value="EM_REPARACAO">🔵 EM REPARAÇÃO</option>
                    <option value="CONCLUIDO">🟢 CONCLUÍDO</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                    <Clock size={12} />
                  </div>
                </div>
              </div>

            </div>
          ))
        )}

        {!loading && services.length === 0 && (
          <div className="text-center py-24 border border-dashed border-white/5 rounded-sm">
             <AlertCircle size={40} className="mx-auto text-slate-800 mb-4" />
             <p className="text-slate-600 uppercase font-black text-xs italic tracking-widest">Sem agendamentos.</p>
          </div>
        )}
      </div>
    </div>
  );
}