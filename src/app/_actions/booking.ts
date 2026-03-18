"use server";

import { prisma } from "../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function handleBookingClick() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth?mode=login");
  }

  const userId = (session.user as any).id;


  const carCount = await prisma.vehicle.count({
    where: { userId: Number(userId) },
  });


  if (carCount === 0) {
    redirect("/dashboard?reason=booking");
  }


  redirect("/agendamento");
}