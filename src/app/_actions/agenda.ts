"use server";

import prisma from "../lib/prisma";
import { ServiceType } from "@prisma/client"; // Importante para o TS
import { revalidatePath } from "next/cache";

export async function createBookingAction(data: {
  plate: string;
  type: string;
  description?: string;
  date: string; // Formato "YYYY-MM-DD"
  time: string; // Formato "HH:mm"
}) {
  // 1. Encontrar o carro
  const vehicle = await prisma.vehicle.findUnique({
    where: { plate: data.plate.toUpperCase() }
  });

  if (!vehicle) throw new Error("Viatura não encontrada.");

  // 2. Criar o serviço
  await prisma.service.create({
    data: {
      type: data.type as ServiceType, // Cast para o Enum do Prisma
      description: data.description,
      date: new Date(`${data.date}T${data.time}:00`),
      vehicleId: vehicle.id,
      status: "PENDENTE" // Valor default do teu Enum ServiceStatus
    }
  });

  revalidatePath("/dashboard");
}