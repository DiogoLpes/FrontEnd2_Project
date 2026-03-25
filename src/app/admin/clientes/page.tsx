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
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* CABEÇALHO DA SECÇÃO */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Clientes</h1>
        <p className="text-sm text-slate-500">Gestão da base de dados de proprietários e suas frotas.</p>
      </div>

      {/* BARRA DE FERRAMENTAS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center bg-[#09090b] border border-white/10 rounded-md px-3 py-1 w-full md:max-w-md focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
          <Search size={16} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Procurar cliente..." 
            className="bg-transparent border-none outline-none py-1.5 px-3 w-full text-sm text-slate-200"
          />
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-200 transition-colors w-full md:w-auto">
          Exportar Lista CSV
        </button>
      </div>

      {/* TABELA DE CLIENTES PREMIUM */}
      <div className="rounded-lg border border-white/10 bg-[#09090b] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-[#101013] text-slate-400 text-xs font-semibold tracking-wide">
                <th className="px-6 py-4">Identificação</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4 text-center">Frotas</th>
                <th className="px-6 py-4 text-center">Serviços</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clientes.map((cliente: any) => (
                <tr key={cliente.id} className="hover:bg-[#101013] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center text-sm font-semibold">
                        {cliente.name?.substring(0, 2)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{cliente.name || "Sem Nome"}</p>
                        <p className="text-xs text-slate-500 mt-0.5">ID: {String(cliente.id).substring(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-500" />
                      {cliente.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 bg-slate-800/50 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300">
                      <Car size={12} />
                      {cliente.vehicles?.length || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-slate-300">
                    {cliente.vehicles?.reduce((acc: number, v: any) => acc + (v.services?.length || 0), 0) || 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-slate-300 p-2 rounded-md hover:bg-slate-800 transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
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
    </div>
  );
}