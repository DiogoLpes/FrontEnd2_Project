"use server";

import prisma from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { revalidatePath } from "next/cache";

export async function addVehicleAction(plate: string, brand?: string, model?: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) throw new Error("Sessão expirada.");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("Utilizador inválido.");

  const newVehicle = await prisma.vehicle.create({
    data: {
      plate: plate,
      brand: brand || "Desconhecido",
      model: model || "Desconhecido", 
      ownerId: user.id,
    },
  });

  revalidatePath("/dashboard");
  return newVehicle;
}