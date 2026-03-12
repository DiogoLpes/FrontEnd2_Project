import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { User, Car, Mail, Calendar, Search, MoreHorizontal } from "lucide-react";

export default async function ClientesAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect("/auth/login");

  // Busca utilizadores e inclui a contagem de veículos e serviços
  const clientes = await prisma.user.findMany({
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
    <div className="space-y-8">
      {/* CABEÇALHO DA SECÇÃO */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Clientes</h1>
        <p className="text-slate-500 text-sm">Gerencie a base de dados de proprietários e as suas frotas.</p>
      </div>

      {/* BARRA DE FERRAMENTAS */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center bg-[#09090b] border border-white/10 rounded-lg px-3 py-1 max-w-sm">
          <Search size={18} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Procurar cliente..." 
            className="bg-transparent border-none outline-none py-2 px-3 w-full text-sm text-slate-300"
          />
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all">
          Exportar CSV
        </button>
      </div>

      {/* TABELA DE CLIENTES ESTILO SHADCN */}
      <div className="rounded-xl border border-white/5 bg-[#09090b] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02] text-slate-400 text-[11px] font-bold uppercase tracking-wider">
              <th className="p-4">Cliente</th>
              <th className="p-4">Contacto</th>
              <th className="p-4 text-center">Veículos</th>
              <th className="p-4 text-center">Total Serviços</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                      {cliente.name?.substring(0, 2) || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{cliente.name || "Sem Nome"}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-tighter">ID: {String(cliente.id).substring(0, 8)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-600" />
                    {cliente.email}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md text-xs font-bold text-slate-300 border border-white/5">
                    <Car size={12} />
                    {cliente.vehicles.length}
                  </span>
                </td>
                <td className="p-4 text-center text-sm font-bold text-blue-500">
                  {cliente.vehicles.reduce((acc, v) => acc + v.services.length, 0)}
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-500 hover:text-white p-2">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {clientes.length === 0 && (
          <div className="p-20 text-center text-slate-500 text-sm italic">
            Nenhum cliente registado no sistema.
          </div>
        )}
      </div>
    </div>
  );
}