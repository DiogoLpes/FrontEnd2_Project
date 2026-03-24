export const dynamic = "force-dynamic";

import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import AgendaClient from "./AgendaClient";
import { Suspense } from "react";

export default async function AgendarPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-black uppercase italic tracking-widest">
        Sessão Expirada. Por favor, faça login.
      </div>
    );
  }

  // Busca os dados no servidor (onde o Prisma funciona)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { vehicles: true }
  });

  const vehicles = user?.vehicles || [];

  return (
    <Suspense fallback={<div className="bg-[#05070a] h-screen" />}>
      {/* Enviamos os dados do servidor para o componente de cliente */}
      <AgendaClient userVehicles={vehicles} />
    </Suspense>
  );
}