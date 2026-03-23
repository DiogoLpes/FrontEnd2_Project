"use server";

import prisma from "../lib/prisma";
import { ServiceType, ServiceStatus } from "@prisma/client"; 
import { revalidatePath } from "next/cache";

export async function createBooking(data: any) {
  try {
    // 1. Encontrar o carro
    const vehicle = await prisma.vehicle.findUnique({
      where: { plate: data.plate.toUpperCase() }
    });

    if (!vehicle) throw new Error("Viatura não encontrada.");

    // DEBUG: Se der erro outra vez, vais ver no terminal o que está a chegar
    console.log("Dados recebidos no Action:", data);

    // 2. Garantir que o 'type' não é undefined
    // Tentamos buscar de 'service' ou de 'type' (o que vier do frontend)
    const serviceType = (data.service || data.type) as ServiceType;

    if (!serviceType) {
      throw new Error("O tipo de serviço é obrigatório.");
    }

    // 3. Montar a descrição
    const descricaoFinal = `[${data.subService || "Geral"}] ${data.medidaPneu ? `Medida: ${data.medidaPneu}` : ""} - ${data.extraInfo || ""}`;

    // 4. Criar no Prisma
    await prisma.service.create({
      data: {
        type: serviceType,
        description: descricaoFinal,
        date: new Date(), // Data placeholder
        vehicleId: vehicle.id,
        status: ServiceStatus.PENDENTE 
      }
    });

    revalidatePath("/Tracking");
    revalidatePath("/admin");
    
    return { success: true };

  } catch (error: any) {
    console.error("ERRO NO SERVER ACTION:", error.message);
    throw error;
  }
}