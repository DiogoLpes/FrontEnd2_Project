"use server";

import { prisma } from "../lib/prisma"; 
import { revalidatePath } from "next/cache";

export async function createBooking(data: {
  plate: string;
  service: string;
  subService?: string;
  medidaPneu?: string; // <--- ADICIONADO: Agora o TS já não reclama no Frontend
  extraInfo?: string;
  date: string;
  hour: string;
}) {
  try {
    // 1. Criamos a reserva
    // Nota: Se o teu Model no Prisma ainda não tiver o campo 'medidaPneu', 
    // vamos concatená-lo na extraInfo para não quebrar a Base de Dados
    
    const finalExtraInfo = data.medidaPneu 
      ? `[MEDIDA: ${data.medidaPneu}] ${data.extraInfo || ""}`
      : data.extraInfo;

    const newBooking = await prisma.booking.create({
      data: {
        plate: data.plate,
        service: data.service,
        subService: data.subService,
        extraInfo: finalExtraInfo, // Guardamos a medida aqui dentro
        date: data.date,
        hour: data.hour,
        status: "PENDENTE",
      },
    });

    // 2. Limpa a cache das páginas
    revalidatePath("/status");
    revalidatePath("/admin");

    return { success: true, bookingId: newBooking.id };
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return { success: false, error: "Falha ao gravar no sistema." };
  }
}