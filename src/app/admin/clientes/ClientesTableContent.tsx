"use client";

import React, { useState, useCallback, useMemo } from "react";
import { User, Car, Mail, Phone, MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react";

interface ClientesTableContentProps {
  clientes: any[];
}

export default function ClientesTableContent({ clientes }: ClientesTableContentProps) {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

  const toggleExpand = useCallback((id: string | number) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  return (
    <div className="rounded-lg border border-white/10 bg-[#09090b] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-blue-600/20 bg-[#14171c] text-blue-500 text-[10px] font-black uppercase tracking-widest">
              <th className="px-6 py-5 rounded-tl-lg">Identificação</th>
              <th className="px-6 py-5">Telefone</th>
              <th className="px-6 py-5 text-center">Frotas</th>
              <th className="px-6 py-5 text-center">Serviços</th>
              <th className="px-6 py-5 text-right rounded-tr-lg">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {clientes.map((cliente: any) => {
              const isExpanded = expandedId === cliente.id;
              
              return (
                <React.Fragment key={cliente.id}>
                  <tr 
                    onClick={() => toggleExpand(cliente.id)}
                    className={`cursor-pointer transition-all border-b border-white/5 last:border-0 group ${
                      isExpanded ? 'bg-[#14171c] shadow-[inset_4px_0_0_#2563eb]' : 'hover:bg-[#14171c] hover:shadow-[inset_4px_0_0_#2563eb]/50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center text-sm font-black italic shadow-inner group-hover:bg-blue-600/20 transition-colors">
                          {cliente.name?.substring(0, 2)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-200">{cliente.name || "Sem Nome"}</p>
                            {cliente.role === 'ADMIN' ? (
                              <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider">Staff</span>
                            ) : (
                              <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider">Cliente</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                            <Mail size={12} className="text-slate-600" />
                            {cliente.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-blue-500" />
                        {cliente.phone ? (
                          <span className="font-mono font-medium">{cliente.phone}</span>
                        ) : (
                          <span className="text-slate-600 italic text-xs">Sem contacto</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 bg-slate-800/50 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 transition-colors group-hover:bg-slate-800">
                        <Car size={12} className="text-blue-500" />
                        {cliente.vehicles?.length || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-slate-300">
                      {cliente.vehicles?.reduce((acc: number, v: any) => acc + (v.services?.length || 0), 0) || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isExpanded ? (
                          <ChevronUp size={16} className="text-blue-500" />
                        ) : (
                          <ChevronDown size={16} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                        )}
                        <button className="text-slate-500 hover:text-slate-300 p-2 rounded-md hover:bg-slate-800 transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* EXPANSION ROW */}
                  {isExpanded && (
                    <tr className="bg-[#0c0d11] animate-in slide-in-from-top-1 duration-200">
                      <td colSpan={5} className="px-6 py-6 border-b border-blue-600/10">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest italic">Frota Registada:</span>
                            <div className="h-px flex-1 bg-blue-600/10"></div>
                          </div>
                          
                          {cliente.vehicles && cliente.vehicles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {cliente.vehicles.map((v: any) => (
                                <div key={v.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#14171c] border border-white/5 hover:border-blue-500/30 transition-all shadow-sm group/car">
                                  <div className="flex-shrink-0 w-10 h-10 rounded bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover/car:bg-blue-600/20">
                                    <Car size={18} />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-mono text-sm font-black text-white tracking-widest bg-blue-600/10 px-1.5 rounded uppercase border border-blue-600/20">
                                      {v.plate}
                                    </span>
                                    <span className="text-xs text-slate-400 font-bold italic uppercase mt-0.5">
                                      {v.brand} - {v.model}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs text-slate-500 italic py-2">
                              Este cliente ainda não tem veículos associados no sistema.
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {clientes.length === 0 && (
        <div className="p-20 text-center">
          <User size={32} className="mx-auto text-slate-700 mb-3" />
          <p className="text-slate-500 text-sm font-medium">
            Nenhum motorista registado na base de dados.
          </p>
        </div>
      )}
    </div>
  );
}
