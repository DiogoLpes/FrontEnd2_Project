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
      title: '<span class="text-white font-black italic uppercase tracking-tighter">Enviar Orçamento</span>',
      background: "#0d1117",
      color: "#fff",
      html: `
        <div class="flex flex-col gap-4 p-2 text-left">
          <div>
            <label class="text-[10px] font-black uppercase text-blue-500 tracking-widest">Valor do Serviço (€)</label>
            <input id="swal-price" type="number" step="0.01" class="swal2-input !m-0 !mt-1 !w-full !bg-black/40 !border-white/10 !text-white !text-sm focus:!border-blue-600 outline-none" placeholder="Ex: 50.00">
          </div>
          <div>
            <label class="text-[10px] font-black uppercase text-blue-500 tracking-widest">Data Sugerida</label>
            <input id="swal-date" type="datetime-local" class="swal2-input !m-0 !mt-1 !w-full !bg-black/40 !border-white/10 !text-white !text-sm focus:!border-blue-600 outline-none">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'ENVIAR PARA CLIENTE',
      confirmButtonColor: '#2563eb',
      cancelButtonText: 'VOLTAR',
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
                  <p className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1.5">
                    <User size={12} className="text-slate-600" /> {s.vehicle?.owner?.name || "N/D"} 
                  </p>
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