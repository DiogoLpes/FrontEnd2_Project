import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        vehicle: {
          include: {
            owner: true // Traz os dados do cliente dono do carro
          }
        }
      },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao procurar agendamentos" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    const updated = await prisma.service.update({
      where: { id: Number(id) },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar estado" }, { status: 500 });
  }
}