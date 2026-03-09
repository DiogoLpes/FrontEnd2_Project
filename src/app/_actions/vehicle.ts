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

  // CRIAR O PROMPT PARA A IA
  // Exemplo: "A professional studio photo of a metallic Blue BMW M3, 45 degree angle, high quality, 8k"
  const imagePrompt = `A professional studio automotive photography of a ${color} ${brand} ${model}, clean background, cinematic lighting, 8k resolution, highly detailed`;

  // Aqui simulamos a chamada à API de geração (Substituir pela tua API de imagem se tiveres)
  // Por agora, vamos gerar uma placeholder ou URL da API
  const generatedImageUrl = `https://pollinations.ai/p/${encodeURIComponent(imagePrompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}`;

  const newVehicle = await (prisma.vehicle as any).create({
    data: {
      plate: plate.toUpperCase(),
      brand,
      model,
      color,
      imageUrl: generatedImageUrl, // Guardamos o link da imagem gerada
      ownerId: user.id,
    },
  });

  revalidatePath("/dashboard");
  return newVehicle;
}