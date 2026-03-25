// 1. FORÇA RENDERIZAÇÃO DINÂMICA (Essencial para o build no Vercel passar)
export const dynamic = "force-dynamic";

import React from "react";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { User, Car, Mail, Calendar, Search, MoreHorizontal } from "lucide-react";

export default async function ClientesAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect("/auth/login");

  // Busca utilizadores e inclui a contagem de veículos e serviços
  // Tipamos como any[] para evitar conflitos com o seu Prisma customizado no build
  const clientes: any[] = await prisma.user.findMany({
    include: {
      vehicles: {
        include: {
          services: true
        }
      }
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* CABEÇALHO DA SECÇÃO */}
      <div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white my-4">
          Base de <span className="text-blue-600">Clientes</span>
        </h1>
        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Controlo de dados de proprietários e as suas frotas.</p>
      </div>

      {/* BARRA DE FERRAMENTAS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 w-full md:max-w-md shadow-inner transition-all focus-within:border-blue-500/50 focus-within:bg-white/[0.05]">
          <Search size={18} className="text-blue-500" />
          <input 
            type="text" 
            placeholder="Procurar condutor..." 
            className="bg-transparent border-none outline-none py-2 px-3 w-full text-sm text-white font-bold uppercase"
          />
        </div>
        <button className="bg-white text-black px-6 py-4 rounded-xl text-[10px] uppercase font-black italic tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg w-full md:w-auto">
          Exportar Lista CSV
        </button>
      </div>

      {/* TABELA DE CLIENTES PREMIUM */}
      <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.01] backdrop-blur-2xl shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-black/40 text-blue-500/80 text-[10px] font-black uppercase tracking-[0.3em]">
                <th className="p-6">Identificação Condutor</th>
                <th className="p-6">Contacto (Email)</th>
                <th className="p-6 text-center">Gestão Frotas</th>
                <th className="p-6 text-center">Visitas Oficina</th>
                <th className="p-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clientes.map((cliente: any) => (
                <tr key={cliente.id} className="hover:bg-blue-600/5 transition-colors group cursor-default">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-black/50 border border-white/10 group-hover:border-blue-500/30 flex items-center justify-center text-white font-black text-lg uppercase italic shadow-inner transition-all">
                        {cliente.name?.substring(0, 2) || 'UK'}
                      </div>
                      <div>
                        <p className="text-sm font-black text-white uppercase tracking-tight">{cliente.name || "Condutor Desconhecido"}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-bold">UID: {String(cliente.id).substring(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-sm text-slate-400 font-bold">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-500/50" />
                      {cliente.email}
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="inline-flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl text-xs font-black italic text-white border border-white/5 group-hover:border-white/20 transition-all shadow-inner">
                      <Car size={14} className="text-blue-500" />
                      {cliente.vehicles?.length || 0} UNI.
                    </span>
                  </td>
                  <td className="p-6 text-center text-sm font-black italic text-blue-500 tracking-tighter text-xl">
                    {cliente.vehicles?.reduce((acc: number, v: any) => acc + (v.services?.length || 0), 0) || 0}
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-slate-500 hover:text-white p-3 hover:bg-white/5 rounded-xl transition-all">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {clientes.length === 0 && (
          <div className="p-24 text-center">
            <User size={48} className="mx-auto text-white/10 mb-4" />
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
              Nenhum motorista registado na base de dados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}