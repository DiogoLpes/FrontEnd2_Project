// 1. FORÇA RENDERIZAÇÃO DINÂMICA (Essencial para o build no Vercel passar)
export const dynamic = "force-dynamic";

import React from "react";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { User, Car, Mail, Calendar, Search, MoreHorizontal, Phone } from "lucide-react";

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
              <tr className="border-b border-blue-600/20 bg-[#14171c] text-blue-500 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-5 rounded-tl-lg">Identificação</th>
                <th className="px-6 py-5">Telefone</th>
                <th className="px-6 py-5 text-center">Frotas</th>
                <th className="px-6 py-5 text-center">Serviços</th>
                <th className="px-6 py-5 text-right rounded-tr-lg">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clientes.map((cliente: any) => (
                <tr key={cliente.id} className="hover:bg-[#14171c] transition-all hover:shadow-[inset_4px_0_0_#2563eb] border-b border-white/5 last:border-0 group">
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