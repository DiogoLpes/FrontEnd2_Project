"use server";

import prisma from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { revalidatePath } from "next/cache";

// Alteramos para receber um objeto 'data' (que contém plate, brand, model, color)
export async function addVehicleAction(data: any) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) throw new Error("Sessão expirada. Faça login novamente.");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("Utilizador inválido.");

  // Extraímos os dados do objeto enviado pelo Modal
  const { plate, brand, model, color } = data;

  // Validação extra para não deixar passar matrículas vazias
  if (!plate) throw new Error("A matrícula é obrigatória.");

  const newVehicle = await (prisma.vehicle as any).create({
    data: {
      plate: plate.toUpperCase(), // Gravamos sempre em Maiúsculas
      brand: brand || "Desconhecido",
      model: model || "Desconhecido", 
      color: color || "white", 
      ownerId: user.id,
    },
  });

  // Revalidamos a página da garagem para o carro aparecer logo
  revalidatePath("/garagem"); 
  return newVehicle;
}