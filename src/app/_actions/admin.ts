"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { ServiceStatus } from "../../generated/prisma";

export async function updateServiceStatusAction(
  id: string,
  status: ServiceStatus
) {
  try {
    await prisma.service.update({
      where: {
        id: Number(id),
      },
      data: {
        status, // já vem tipado corretamente
      },
    });

    revalidatePath("/admin");
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    throw new Error("Falha ao atualizar status");
  }
}

export async function deleteServiceAction(id: string) {
  try {
    await prisma.service.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath("/admin");
  } catch (error) {
    console.error("Erro ao apagar serviço:", error);
    throw new Error("Falha ao apagar serviço");
  }
}