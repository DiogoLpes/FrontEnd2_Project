"use server";

import prisma from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";



export async function deleteVehicleAction(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Sessão expirada.");

  const userId = (session.user as any).id;

  await prisma.vehicle.deleteMany({
    where: {
      id,
      userId: Number(userId),
    },
  });

  revalidatePath("/garagem");
}

export async function addVehicleAction(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Sessão expirada.");

  const userId = (session.user as any).id;
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
        userId: Number(userId),
      },
    });

    revalidatePath("/garagem");
    return newVehicle;
  } catch (error: any) {
    if (error.code === 'P2002') throw new Error("Matrícula já registada.");
    throw new Error("Erro ao salvar veículo.");
  }
}