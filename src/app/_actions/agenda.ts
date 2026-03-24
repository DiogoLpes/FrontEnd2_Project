"use server";

import prisma from "../lib/prisma";
import { ServiceType, ServiceStatus } from "../../generated/prisma"; 
import { revalidatePath } from "next/cache";

export async function createBookingAction(data: {
  plate: string;
  type: string;
  description?: string;
  date?: string; 
  time?: string;
}) {

  const vehicle = await prisma.vehicle.findUnique({
    where: { plate: data.plate.toUpperCase() }
  });

  if (!vehicle) throw new Error("Viatura não encontrada.");

  await prisma.service.create({
    data: {
      type: data.type as ServiceType,
      description: data.description || "Sem descrição adicional",
      

      date: data.date && data.time 
        ? new Date(`${data.date}T${data.time}:00`) 
        : new Date(), 
      
      vehicleId: vehicle.id,
      status: ServiceStatus.PENDENTE // Usando o Enum importado corretamente
    }
  });

  // Revalida a página para o cliente ver o novo serviço na lista
  revalidatePath("/Tracking"); 
  
  return { success: true };
}