"use server";

import prisma from "../lib/prisma";
import { ServiceType, ServiceStatus } from "@prisma/client"; 
import { revalidatePath } from "next/cache";

export async function createBookingAction(data: {
  plate: string;
  type: string;
  description?: string;
  date?: string; 
  time?: string;
}) {
  // 1. Encontrar o carro
  const vehicle = await prisma.vehicle.findUnique({
    where: { plate: data.plate.toUpperCase() }
  });

  if (!vehicle) throw new Error("Viatura não encontrada.");

  // 2. Criar o serviço com o Status correto do teu Schema
  await prisma.service.create({
    data: {
      type: data.type as ServiceType,
      description: data.description || "Sem descrição adicional",
      // Se não houver data, usamos a atual como placeholder
      date: data.date && data.time 
        ? new Date(`${data.date}T${data.time}:00`) 
        : new Date(), 
      vehicleId: vehicle.id,
      // MUDANÇA AQUI: Usar SOLICITADO em vez de PENDENTE
      status: ServiceStatus.SOLICITADO 
    }
  });

  revalidatePath("/Tracking"); 
  
  return { success: true };
}