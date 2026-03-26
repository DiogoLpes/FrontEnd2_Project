// 1. FORÇA RENDERIZAÇÃO DINÂMICA (Essencial para o build no Vercel passar)
export const dynamic = "force-dynamic";

import React from "react";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { User, Car, Mail, Calendar, Search, MoreHorizontal, Phone } from "lucide-react";

import ClientesTableContent from "./ClientesTableContent";

export default async function ClientesAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect("/auth/login");

  // Busca utilizadores e inclui a contagem de veículos e serviços
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

      {/* TABELA DE CLIENTES PREMIUM (Componente Interativo) */}
      <ClientesTableContent clientes={clientes} />
    </div>
  );
}