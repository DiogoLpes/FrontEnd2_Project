import { prisma } from "../lib/prisma";
import StatusClient from "./StatusClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function StatusPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ plate?: string }> 
}) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await searchParams;
  const plate = resolvedParams.plate;

  // 1. Converter ID para Número para evitar PrismaClientValidationError
  const userIdParsed = session?.user ? Number((session.user as any).id) : undefined;

  // 2. Procurar a intervenção mais recente
  const booking = await prisma.service.findFirst({
    where: {
      OR: [
        { vehicle: { plate: plate?.toUpperCase() } },
        // Só filtramos por userId se ele for um número válido
        ...(userIdParsed ? [{ vehicle: { userId: userIdParsed } }] : [])
      ]
    },
    include: { 
      vehicle: true 
    },
    orderBy: { 
      createdAt: "desc" 
    },
  });

  // 3. Caso não exista nenhuma marcação
  if (!booking) {
    return (
      <div className="min-h-screen bg-[#05070a] text-white flex flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center border border-blue-600/20">
            <span className="text-blue-600 text-4xl">!</span>
        </div>
        <div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">Sem Registos Ativos</h2>
            <p className="text-slate-500 text-sm mt-2 uppercase font-bold tracking-widest">Não encontramos nenhuma intervenção para esta conta.</p>
        </div>
        <Link href="/agenda" className="bg-blue-600 px-8 py-4 rounded-xl font-black uppercase italic text-xs hover:bg-white hover:text-black transition-all">
           Iniciar Ordem de Serviço
        </Link>
      </div>
    );
  }

  // 4. Formatar dados para o componente Client
  const formattedBooking = {
    id: booking.id,
    plate: booking.vehicle.plate,
    type: booking.type,
    description: booking.description,
    status: booking.status,
    // Se o Admin ainda não definiu data, enviamos a atual como fallback visual
    date: booking.date ? booking.date.toISOString() : new Date().toISOString(),
    price: (booking as any).price || null // Caso tenhas o campo price no modelo
  };

  return <StatusClient booking={formattedBooking} />;
}