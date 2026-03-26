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
import Swal, { Toast } from "@/app/lib/swal";

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
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

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
      title: 'Proposta de Serviço',
      html: `
        <div class="flex flex-col gap-5 text-left mt-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-black uppercase text-blue-500 tracking-widest">Orçamento Final / Previsto (€)</label>
            <input id="swal-price" type="number" step="0.01" class="flex h-12 w-full rounded-xl border border-white/5 bg-[#14171c] px-4 py-3 text-lg font-black text-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors" placeholder="0.00">
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-black uppercase text-blue-500 tracking-widest">Agendamento (Data / Hora)</label>
            <input id="swal-date" type="datetime-local" class="flex h-12 w-full rounded-xl border border-white/5 bg-[#14171c] px-4 py-3 text-sm font-bold text-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'APROVAR ORÇAMENTO',
      cancelButtonText: 'CANCELAR',
      preConfirm: () => {
        const price = (document.getElementById('swal-price') as HTMLInputElement).value;
        const date = (document.getElementById('swal-date') as HTMLInputElement).value;
        if (!price || !date) {
          Swal.showValidationMessage('Preenche o preço e a data para prosseguir!');
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
            text: `O Cliente foi notificado do valor de ${formValues.price}€.`,
            showConfirmButton: false,
            timer: 2500
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
        Toast.fire({ icon: 'success', title: 'Estado do serviço atualizado com sucesso' });
        fetchServices();
      }
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    }
  };

  // Tipamos o parâmetro 's' como ServiceEntry
  const handlePrint = (s: ServiceEntry) => {
    const printContent = `
      <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 40px; color: #111827;">
        
        <!-- Cabecalho Premium -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 4px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 900; font-style: italic; color: #111827; letter-spacing: -1px; text-transform: uppercase;">
              TS <span style="color: #2563eb;">PNEUS</span>
            </h1>
            <p style="margin: 8px 0 0 0; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Oficina Auto Center Especializada</p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #4b5563;">Rua da Oficina, 123 - Viseu | NIF: 500 000 000</p>
            <p style="margin: 2px 0 0 0; font-size: 13px; color: #4b5563;">Tel: +351 912 345 678 | ts@pneuscentro.pt</p>
          </div>
          <div style="text-align: right; background-color: #f3f4f6; padding: 15px 25px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <h2 style="margin: 0; font-size: 18px; font-weight: 800; color: #111827; text-transform: uppercase;">Folha de Obra</h2>
            <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: 900; color: #2563eb;">Ref: OS-${s.id.toString().padStart(5, '0')}</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase;">Data: <span style="font-weight:400;">${s.date ? new Date(s.date).toLocaleDateString('pt-PT', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'}) : new Date().toLocaleDateString('pt-PT')}</span></p>
          </div>
        </div>

        <!-- Info Cliente e Veiculo Grid -->
        <div style="display: flex; gap: 20px; margin-bottom: 30px;">
          <div style="flex: 1; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #f9fafb; padding: 10px 15px; border-bottom: 1px solid #e5e7eb;">
              <h3 style="margin: 0; font-size: 11px; font-weight: 800; color: #4b5563; text-transform: uppercase; letter-spacing: 1px;">Dados do Consignatário</h3>
            </div>
            <div style="padding: 15px;">
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color:#111827;">Nome:</strong> ${s.vehicle?.user?.name || 'Cliente de Balcão'}</p>
              <p style="margin: 0; font-size: 14px;"><strong style="color:#111827;">Contacto:</strong> ${s.vehicle?.user?.phone || 'Não fornecido'}</p>
            </div>
          </div>
          
          <div style="flex: 1; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
             <div style="background-color: #f9fafb; padding: 10px 15px; border-bottom: 1px solid #e5e7eb;">
              <h3 style="margin: 0; font-size: 11px; font-weight: 800; color: #4b5563; text-transform: uppercase; letter-spacing: 1px;">Identificação do Veículo</h3>
            </div>
            <div style="padding: 15px;">
              <div style="display:flex; justify-content:space-between;">
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color:#111827;">Marca/Modelo:</strong> ${s.vehicle?.brand} ${s.vehicle?.model}</p>
                <div style="border: 2px solid #9ca3af; border-radius: 4px; padding: 3px 8px; font-family: monospace; font-weight: bold; font-size: 16px;">
                  ${s.vehicle?.plate}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Serviços / Descrição -->
        <div style="margin-bottom: 30px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 12px 15px; color: #4b5563; font-weight: 800; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e5e7eb;">Serviço Requisitado</th>
                <th style="padding: 12px 15px; color: #4b5563; font-weight: 800; text-align: right; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e5e7eb;">Valor Orçamentado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 20px 15px; font-size: 15px; font-weight: 700; color: #111827;">
                  ${s.type} 
                  <span style="display:inline-block; margin-left:10px; font-size: 10px; padding: 3px 6px; background: #e5e7eb; border-radius: 10px; color: #4b5563;">${s.status}</span>
                </td>
                <td style="padding: 20px 15px; text-align: right; font-size: 18px; font-weight: 900; color: #2563eb;">
                  ${s.price ? Number(s.price).toFixed(2) + ' €' : 'A Avaliar'}
                </td>
              </tr>
            </tbody>
          </table>
          <div style="border-top: 1px dashed #e5e7eb; padding: 20px 15px; background-color: #fff;">
            <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 800; color: #4b5563; text-transform: uppercase; letter-spacing: 1px;">Notas e Diagnóstico:</p>
            <p style="margin: 0; color: #111827; line-height: 1.6; font-size: 14px;">${s.description ? s.description.replace(/\\n/g, '<br>') : "<i>Sem intervenções ou inspeções visuais descritas pelo cliente na submissão.</i>"}</p>
          </div>
        </div>

        <!-- Termos -->
        <div style="margin-top: 40px; border-top: 2px solid #e5e7eb; padding-top: 30px;">
          <p style="margin-bottom: 30px; font-size: 11px; color: #6b7280; text-align: justify; line-height: 1.5;">O Cliente autoriza a TS PNEUS e os seus colaboradores a intervir no veículo supra identificado para efeitos do estipulado no pedido inicial, assim como realizar testes de estrada, se tal for estritamente necessário para garantir o diagnóstico e/ou a reparação fidedigna das anomalias apresentadas. A empresa não se responsabiliza pelo desaparecimento de quaisquer bens de valor ou componentes acessórios que não sejam entregues e deixados sob a responsabilidade declarada do rececionista. Este documento é uma folha de obra temporária e serve de contrato de concordância; não substitui o respetivo documento fiscal.</p>
          
          <div style="display: flex; justify-content: space-around; margin-top: 60px;">
            <div style="text-align: center; width: 35%;">
              <div style="border-top: 1px solid #111827; padding-top: 10px; font-size: 12px; font-weight: 700; text-transform: uppercase;">
                O Responsável (TS PNEUS)
              </div>
            </div>
            <div style="text-align: center; width: 35%;">
              <div style="border-top: 1px solid #111827; padding-top: 10px; font-size: 12px; font-weight: 700; text-transform: uppercase;">
                O Cliente Autorizante
              </div>
              <div style="font-size: 11px; margin-top: 4px; color: #6b7280;">
                ( ${s.vehicle?.user?.name || 'Assinatura'} )
              </div>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 50px; font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">
          Processado por Software TS PNEUS Core System v1.0
        </div>
      </div>
    `;
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`<html><head><title>OS #${s.id} - ${s.vehicle?.plate}</title></head><body>${printContent}</body></html>`);
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
          services.map((s: ServiceEntry) => {
            const isExpanded = expandedIds.includes(s.id);
            const hasLongDescription = s.description && s.description.length > 60;
            
            return (
            <div key={s.id} className="bg-[#09090b] border border-white/10 p-5 rounded-lg flex flex-col xl:flex-row justify-between xl:items-start gap-6 hover:bg-[#101013] transition-colors relative">

              <div className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${s.status === 'PENDENTE' || s.status === 'SOLICITADO' ? 'bg-slate-600' :
                  s.status === 'ORCAMENTADO' ? 'bg-amber-500' :
                    s.status === 'EM_REPARACAO' ? 'bg-blue-500' : 'bg-emerald-500'
                }`}></div>

              <div className="flex gap-4 flex-1 text-white ml-2">
                <div className="w-16 h-16 flex-shrink-0 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-400 shadow-inner mt-1">
                  <Car size={32} />
                </div>
                <div className="flex-1">
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
                    <div className="mt-4">
                      {hasLongDescription ? (
                        <div className="flex flex-col">
                          <button 
                            onClick={() => toggleExpand(s.id)} 
                            className="w-max flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-blue-400 transition-colors tracking-widest bg-white/5 hover:bg-blue-600/10 px-3 py-1.5 rounded-md"
                          >
                            {isExpanded ? "ESCONDER NOTAS DO CLIENTE" : "LER NOTAS DO CLIENTE / SINTOMAS"} 
                          </button>
                          
                          <div className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="p-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[#14171c]/80 bg-blend-soft-light border-l-2 border-blue-600 rounded-r-lg shadow-inner">
                              <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-2 block">Dito pelo Cliente:</span>
                              <p className="text-sm text-slate-300 italic leading-relaxed">
                                "{s.description}"
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                         <div className="px-3 py-2 bg-[#14171c]/50 rounded-md border border-white/5 italic text-slate-500 text-xs">
                           Nenhuma nota adicional preenchida.
                         </div>
                      )}
                    </div>
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
          )})
        )}
      </div>
    </div>
  );
}