"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
// import { ServiceStatus } from "@prisma/client";
import { ServiceStatus } from "@/generated/prisma";

export async function updateServiceStatusAction(id: string, status: string) {
  try {
    await prisma.service.update({
      where: { 
        id: Number(id) // Converte string para número para o Prisma
      },
      data: { 
        status: status as ServiceStatus // Cast para o Enum do Prisma
      },
    });
    
    revalidatePath("/admin");
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
  }
}

export async function deleteServiceAction(id: string) {
  try {
    await prisma.service.delete({
      where: { 
        id: Number(id) 
      },
    });
    
    revalidatePath("/admin");
  } catch (error) {
    console.error("Erro ao apagar serviço:", error);
  }
}