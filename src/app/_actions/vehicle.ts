"use server";

import { prisma } from "../lib/prisma"; // Ajusta para o teu caminho do prisma
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function deleteVehicleAction(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Sessão expirada.");

  const userId = Number((session.user as any).id);

  await prisma.vehicle.deleteMany({
    where: {
      id: id,
      userId: userId, // Segurança: só o dono apaga o seu carro
    },
  });

  revalidatePath("/dashboard");
}

export async function addVehicleAction(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Sessão expirada.");

  // O ID da sessão vem como String, o Prisma quer Int
  const userId = Number((session.user as any).id);
  const { plate, brand, model, color, year, fuel } = data;

  try {
    const newVehicle = await prisma.vehicle.create({
      data: {
        plate: plate.toUpperCase(),
        brand,
        model,
        color,
        year: parseInt(year),
        fuel: fuel, 
        userId: userId, // Campo configurado no teu Schema
      },
    });

    revalidatePath("/dashboard");
    return newVehicle;
  } catch (error: any) {
    if (error.code === 'P2002') throw new Error("Esta matrícula já está registada.");
    console.error("Erro Prisma:", error);
    throw new Error("Erro ao salvar veículo no sistema.");
  }
}
