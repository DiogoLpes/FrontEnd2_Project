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
    user?: {
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
      title: '<h3 class="text-xl font-semibold text-white">Proposta de Serviço</h3>',
      background: "#09090b",
      color: "#f8fafc",
      customClass: {
        popup: 'border border-slate-800 rounded-lg p-4',
        confirmButton: 'bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 w-full py-2.5 mt-2',
        cancelButton: 'text-slate-400 hover:text-white rounded-md text-sm font-medium hover:bg-slate-800 w-full py-2.5 mt-2'
      },
      html: `
        <div class="flex flex-col gap-4 text-left mt-2">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-slate-400">Orçamento Final (€)</label>
            <input id="swal-price" type="number" step="0.01" class="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="0.00">
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-slate-400">Agendamento (Data / Hora)</label>
            <input id="swal-date" type="datetime-local" class="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'APROVAR ORÇAMENTO',
      cancelButtonText: 'CANCELAR',
      buttonsStyling: false,
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
            <p><strong>CLIENTE:</strong> ${s.vehicle?.user?.name || 'Desconhecido'}</p>
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Pedidos de Serviço</h1>
          <p className="text-sm text-slate-500">Tracking e Agendamento de intervenções técnicas.</p>
        </div>
      </div>

      {/* LISTAGEM */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center p-20 text-blue-500 text-sm font-medium">Extraindo dados...</div>
        ) : (
          services.map((s: ServiceEntry) => (
            <div key={s.id} className="bg-[#09090b] border border-white/10 p-5 rounded-lg flex flex-col xl:flex-row justify-between xl:items-center gap-6 hover:bg-[#101013] transition-colors relative">

              <div className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${s.status === 'PENDENTE' || s.status === 'SOLICITADO' ? 'bg-slate-600' :
                  s.status === 'ORCAMENTADO' ? 'bg-amber-500' :
                    s.status === 'EM_REPARACAO' ? 'bg-blue-500' : 'bg-emerald-500'
                }`}></div>

              <div className="flex gap-4 flex-1 text-white ml-2">
                <div className="w-16 h-16 flex-shrink-0 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-400 shadow-inner">
                  <Car size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-lg">
                      {s.vehicle?.brand} {s.vehicle?.model}
                    </span>
                    <span className="bg-slate-800 border border-slate-700 px-2 py-0.5 text-slate-300 font-mono text-xs rounded-md">
                      {s.vehicle?.plate}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
                      <User size={14} className="text-slate-500" />
                      Proprietário: <span className="text-white">{s.vehicle?.user?.name || "Desconhecido"}</span>
                    </p>
                    <p className="text-slate-500 text-xs italic mt-1.5 line-clamp-2">
                      {s.description ? `"${s.description}"` : "Sem descrição remetida."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:items-end min-w-[150px]">
                <span className="text-xs font-medium text-blue-500 uppercase tracking-wider flex items-baseline gap-1.5 mb-1">
                  <Wrench size={10} /> {s.type}
                </span>
                {s.price ? (
                  <div className="flex items-center gap-1 text-white font-bold text-2xl">
                    {Number(s.price).toFixed(2)}€
                  </div>
                ) : (
                  <div className="flex items-center mt-2">
                    <span className="text-slate-500 text-[10px] font-medium uppercase bg-slate-800/50 px-2 py-1 rounded inline-block">Aguardando Avaliação</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 w-full xl:w-72">
                <div className="flex-1">
                  {s.status === 'PENDENTE' || s.status === 'SOLICITADO' ? (
                    <button
                      onClick={() => handleDarOrcamento(s.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium py-2 px-3 transition-colors flex items-center justify-center gap-2"
                    >
                      <Euro size={14} /> Elaborar Orçamento
                    </button>
                  ) : (
                    <div className="relative">
                      <select
                        value={s.status}
                        onChange={(e) => updateStatus(s.id, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-md text-xs font-medium py-2.5 px-3 outline-none cursor-pointer appearance-none text-slate-200 focus:border-blue-600 hover:border-slate-700 transition-all"
                      >
                        <option value="ORCAMENTADO">Orçamentado</option>
                        <option value="EM_REPARACAO">Em Reparação</option>
                        <option value="CONCLUIDO">Concluído</option>
                      </select>
                    </div>
                  )}
                </div>
                <button onClick={() => handlePrint(s)} className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-md transition-colors" title="Imprimir OS">
                  <Printer size={16} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}