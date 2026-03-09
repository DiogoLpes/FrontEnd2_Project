import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth"; // Verifica se o caminho está certo no teu projeto
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth"); // Manda para o login se não houver sessão
  }

  // 1. BUSCA REAL NO POSTGRES (Via Prisma)
  // Isto garante que quando fazes refresh, os carros estão lá!
  const userWithVehicles = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { 
      vehicles: {
        orderBy: { createdAt: 'desc' }
      } 
    }
  });

  // 2. PASSAMOS OS DADOS PARA A INTERFACE (Client Component)
  return (
    <DashboardClient 
      session={session} 
      initialVehicles={JSON.parse(JSON.stringify(userWithVehicles?.vehicles || []))} 
    />
  );
}