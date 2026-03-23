import { prisma } from "@/app/lib/prisma";
import StatusClient from "./StatusClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Car } from "lucide-react";

export default async function StatusPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ plate?: string }> 
}) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await searchParams;
  const plate = resolvedParams.plate?.toUpperCase();
  const userIdParsed = session?.user ? Number((session.user as any).id) : undefined;

  // Procurar todas as intervenções relacionadas (pela matrícula ou pelo utilizador)
  const bookings = await prisma.service.findMany({
    where: {
      OR: [
        { vehicle: { plate: plate } },
        ...(userIdParsed ? [{ vehicle: { userId: userIdParsed } }] : [])
      ]
    },
    include: { 
      vehicle: true 
    },
    orderBy: { 
      createdAt: "desc" 
    },
    take: 5 // Mostra as 5 mais recentes
  });

  // Se não houver nada, mostra ecrã de vazio com estilo
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-[#05070a] text-white flex flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="w-24 h-24 bg-blue-600/5 rounded-full flex items-center justify-center border border-blue-600/20 animate-pulse">
            <Car className="text-blue-600" size={48} />
        </div>
        <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Sem Ordens Ativas</h2>
            <p className="text-slate-500 text-[10px] mt-2 uppercase font-black tracking-[0.2em]">Não encontramos registos para: <span className="text-white">{plate || "Esta conta"}</span></p>
        </div>
        <Link href="/agenda" className="bg-blue-600 px-10 py-4 rounded-2xl font-black uppercase italic text-xs hover:bg-white hover:text-black transition-all shadow-lg shadow-blue-600/20">
            Nova Marcação
        </Link>
      </div>
    );
  }

  // Formatar os dados para o Componente de Cliente
  const formattedBookings = bookings.map((b: any) => ({
    id: b.id,
    plate: b.vehicle.plate,
    brand: b.vehicle.brand,
    model: b.vehicle.model,
    type: b.type,
    status: b.status,
    description: b.description,
    date: b.date ? b.date.toISOString() : null,
    price: (b as any).price || null
  }));

  return <StatusClient bookings={formattedBookings} />;
}