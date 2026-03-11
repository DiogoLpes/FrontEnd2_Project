"use server";

import prisma from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { revalidatePath } from "next/cache";

export async function addVehicleAction(data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Sessão expirada.");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("Utilizador inválido.");

  const { plate, brand, model, color } = data;

  // Tradução para Inglês (O Unsplash funciona melhor assim)
  const colorMap: { [key: string]: string } = {
    "Preto": "black", "Branco": "white", "Cinzento": "grey",
    "Vermelho": "red", "Azul": "blue", "Amarelo": "yellow"
  };
  const colorEng = colorMap[color] || "";

  // Criamos um URL de pesquisa do Unsplash Source (Grátis e sem Auth complexa)
  // Ele vai buscar uma foto profissional do carro exato que definires
  const imageUrl = `https://source.unsplash.com/featured/1024x768?${encodeURIComponent(colorEng + " " + brand + " " + model + " car")}`;

  try {
    const newVehicle = await prisma.vehicle.create({
      data: {
        plate: plate.toUpperCase(),
        brand,
        model,
        color,
        imageUrl,
        ownerId: user.id,
      },
    });

    revalidatePath("/dashboard");
    return newVehicle;
  } catch (error: any) {
    if (error.code === 'P2002') throw new Error("Matrícula já registada.");
    throw new Error("Erro ao salvar veículo.");
  }
}

export async function deleteVehicleAction(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Sessão expirada.");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("Utilizador inválido.");

  try {
    await prisma.vehicle.deleteMany({
      where: {
        id,
        ownerId: user.id,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error("Erro ao apagar veículo.");
  }
}