import { prisma } from "../lib/prisma";
import StatusClient from "./StatusClient";

export default async function StatusPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ plate?: string }> 
}) {
  // CORREÇÃO NEXT.JS 15+: Unwrapping searchParams
  const resolvedParams = await searchParams;
  const plate = resolvedParams.plate;

  // Busca na base de dados
  const lastBooking = await prisma.booking.findFirst({
    where: plate ? { plate: plate } : {},
    orderBy: { createdAt: "desc" },
  }).catch(() => null);

  // Exemplo para a apresentação
  const demoBooking = {
    id: "DEMO-123",
    plate: plate || "ab-12-cd",
    service: "REVISÃO GERAL",
    date: "2026-05-20",
    hour: "14:30",
    status: "EM_MANUTENCAO",
  };

  return <StatusClient booking={lastBooking || demoBooking} />;
}