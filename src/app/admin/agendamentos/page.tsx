"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, 
  Car, 
  User, 
  Clock, 
  AlertCircle,
  Wrench,
  Search,
  Printer,
  Euro
} from "lucide-react";
import Swal from "sweetalert2";

// 1. DEFINIÇÃO DE TIPOS (Para o TypeScript não reclamar)
interface ServiceEntry {
  id: number;
  type: string;
  description: string | null;
  status: string;
  price: number | null;
  date: string | null;
  vehicle: {
    plate: string;
    brand: string;
    model: string;
    owner?: {
      name: string;
      phone: string;
    }
  }
}

export default function AdminAgendamentos() {
  // Tipamos o estado como uma array de ServiceEntry
  const [services, setServices] = useState<ServiceEntry[]>([]);
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

  const handleDarOrcamento = async (serviceId: number) => {
    const { value: formValues } = await Swal.fire({
      title: '<span class="text-white font-black italic uppercase tracking-tighter text-3xl">Proposta de Serviço</span>',
      background: "rgba(10, 12, 16, 0.95)",
      color: "#fff",
      customClass: {
        popup: 'border border-blue-500/20 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.9)] backdrop-blur-3xl p-6',
        confirmButton: 'rounded-xl uppercase font-black italic text-xs tracking-widest hover:scale-105 transition-transform'
      },
      html: `
        <div class="flex flex-col gap-5 p-2 text-left mt-4">
          <div class="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
            <label class="text-[9px] font-black uppercase text-blue-500 tracking-[0.3em] mb-3 block">Orçamento Final (€)</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-black text-xl">€</span>
              <input id="swal-price" type="number" step="0.01" class="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-3xl font-black italic tracking-tighter focus:border-blue-500 focus:bg-black/60 outline-none transition-all shadow-inner" placeholder="0.00">
            </div>
          </div>
          <div class="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
            <label class="text-[9px] font-black uppercase text-blue-500 tracking-[0.3em] mb-3 block">Agendamento (Data / Hora)</label>
            <input id="swal-date" type="datetime-local" class="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white text-sm font-bold uppercase tracking-wider focus:border-blue-500 focus:bg-black/60 outline-none transition-all shadow-inner">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'APROVAR & NOTIFICAR CLIENTE',
      confirmButtonColor: '#2563eb',
      cancelButtonText: 'CANCELAR',
      cancelButtonColor: 'transparent',
      preConfirm: () => {
        const price = (document.getElementById('swal-price') as HTMLInputElement).value;
        const date = (document.getElementById('swal-date') as HTMLInputElement).value;
        if (!price || !date) {
          Swal.showValidationMessage('Preenche o preço e a data para continuar!');
        }
        return { price, date };
      }
    });

    if (formValues) {
      try {
        const res = await fetch("/api/services", {
          method: "PATCH",
          body: JSON.stringify({ 
            id: serviceId, 
            status: "ORCAMENTADO", 
            price: parseFloat(formValues.price), 
            date: formValues.date 
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          Swal.fire({ 
            icon: 'success', 
            title: 'ORÇAMENTO DEFINIDO', 
            text: `Valor de ${formValues.price}€ registado.`,
            background: "#0d1117", 
            color: "#fff",
            timer: 2000
          });
          fetchServices();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/services", {
        method: "PATCH",
        body: JSON.stringify({ id, status: newStatus }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.ok) {
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

  // Tipamos o parâmetro 's' como ServiceEntry
  const handlePrint = (s: ServiceEntry) => {
    const printContent = `
      <div style="font-family: sans-serif; padding: 40px; color: #000;">
        <h1 style="text-transform: uppercase; font-style: italic; border-bottom: 2px solid #000; padding-bottom: 10px;">TS PNEUS - Guia de Oficina</h1>
        <div style="display: flex; justify-content: space-between; margin-top: 30px;">
          <div>
            <p><strong>CLIENTE:</strong> ${s.vehicle?.owner?.name || 'N/D'}</p>
            <p><strong>VIATURA:</strong> ${s.vehicle?.brand} ${s.vehicle?.model}</p>
            <p><strong>MATRÍCULA:</strong> ${s.vehicle?.plate}</p>
            <p><strong>VALOR:</strong> ${s.price ? s.price + '€' : 'A definir'}</p>
          </div>
          <div style="text-align: right;">
            <p><strong>DATA:</strong> ${s.date ? new Date(s.date).toLocaleDateString() : 'N/D'}</p>
            <p><strong>SERVIÇO:</strong> ${s.type}</p>
            <p><strong>STATUS:</strong> ${s.status}</p>
          </div>
        </div>
        <div style="margin-top: 40px; border: 1px solid #ccc; padding: 20px; min-height: 150px;">
          <p><strong>DESCRIÇÃO:</strong></p>
          <p>${s.description || "Sem notas adicionais."}</p>
        </div>
      </div>
    `;
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`<html><head><title>Imprimir - ${s.vehicle?.plate}</title></head><body>${printContent}</body></html>`);
      win.document.close();
      win.print();
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
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Painel Administrativo TS PNEUS</p>
        </div>
      </div>

      {/* LISTAGEM */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center p-20 text-blue-600 animate-pulse font-black uppercase italic">A sincronizar com a base de dados...</div>
        ) : (
          services.map((s: ServiceEntry) => (
            <div key={s.id} className="bg-[#0d1117] border border-white/5 p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:border-blue-600/30 transition-all group relative overflow-hidden">
              
              <div className={`absolute left-0 top-0 h-full w-1 ${
                s.status === 'PENDENTE' || s.status === 'SOLICITADO' ? 'bg-white/20' : 
                s.status === 'ORCAMENTADO' ? 'bg-orange-500' : 
                s.status === 'EM_REPARACAO' ? 'bg-blue-500' : 'bg-green-500'
              }`}></div>

              <div className="flex gap-5 flex-1 text-white">
                <div className={`w-14 h-14 flex items-center justify-center border transition-colors ${
                  s.status === 'PENDENTE' ? 'bg-white/5 border-white/10 text-white' :
                  s.status === 'ORCAMENTADO' ? 'bg-orange-500/5 border-orange-500/20 text-orange-500' : 
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
                    <span className="bg-blue-600 px-2 py-0.5 text-white font-mono text-[10px] font-bold">
                      {s.vehicle?.plate}
                    </span>
                  </div>
                  <div className="mt-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-inner">
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-1.5 flex items-center gap-2">
                      <User size={14} /> Detalhes do Condutor: <span className="text-white text-xs">{s.vehicle?.owner?.name || "Desconhecido"}</span>
                    </p>
                    <p className="text-slate-300 text-[11px] font-bold uppercase italic leading-relaxed tracking-wider border-l-2 border-white/10 pl-3 mt-3">
                      {s.description ? `"${s.description}"` : "Nenhum reporte adicional assinalado."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:items-end min-w-[150px]">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1">
                    <Wrench size={10} /> {s.type}
                  </span>
                  {s.price && (
                    <div className="flex items-center gap-1 text-green-500 font-black text-xl italic tracking-tighter mt-1">
                       {Number(s.price).toFixed(2)}€
                    </div>
                  )}
              </div>

              <div className="flex items-center gap-3 w-full lg:w-80">
                <div className="flex-1">
                  {s.status === 'PENDENTE' || s.status === 'SOLICITADO' ? (
                    <button 
                      onClick={() => handleDarOrcamento(s.id)}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase p-3 transition-all flex items-center justify-center gap-2"
                    >
                      <Euro size={14} /> Dar Orçamento
                    </button>
                  ) : (
                    <div className="relative">
                      <select 
                        value={s.status}
                        onChange={(e) => updateStatus(s.id, e.target.value)}
                        className="w-full bg-black/40 border border-white/10 text-[10px] font-black uppercase p-3 outline-none cursor-pointer appearance-none text-white"
                      >
                        <option value="ORCAMENTADO">ORÇAMENTADO</option>
                        <option value="EM_REPARACAO">EM REPARAÇÃO</option>
                        <option value="CONCLUIDO">CONCLUÍDO</option>
                      </select>
                    </div>
                  )}
                </div>
                <button onClick={() => handlePrint(s)} className="p-3 bg-white/5 border border-white/10 text-slate-400 rounded-sm">
                  <Printer size={18} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}