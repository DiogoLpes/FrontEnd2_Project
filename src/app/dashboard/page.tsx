export const dynamic = "force-dynamic";

import { prisma } from "../lib/prisma"; // Ajusta se o teu for ../lib/prisma
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth"; // Ajusta o caminho do teu authOptions
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth");
  }

  // Busca o utilizador e os seus veículos no Postgres
  const userWithVehicles = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { 
      vehicles: {
        orderBy: { createdAt: 'desc' }
      } 
    }
  });

  // Sanitização de dados para evitar erro de serialização de Datas
  const vehicles = JSON.parse(JSON.stringify(userWithVehicles?.vehicles || []));

  return (
    <DashboardClient 
      session={session} 
      userVehicles={vehicles} 
    />
  );
}   