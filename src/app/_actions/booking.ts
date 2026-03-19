"use server";

import { prisma } from "../lib/prisma"; // Ajusta o caminho para o teu cliente prisma
import { revalidatePath } from "next/cache";

export async function createBooking(data: {
  plate: string;
  service: string;
  subService?: string;
  extraInfo?: string;
  date: string;
  hour: string;
}) {
  try {
    const newBooking = await prisma.booking.create({
      data: {
        plate: data.plate,
        service: data.service,
        subService: data.subService,
        extraInfo: data.extraInfo,
        date: data.date,
        hour: data.hour,
        status: "PENDENTE",
      },
    });

    // Limpa a cache das páginas para os dados novos aparecerem
    revalidatePath("/status");
    revalidatePath("/admin");

    return { success: true, bookingId: newBooking.id };
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return { success: false, error: "Falha ao gravar no sistema." };
  }
}