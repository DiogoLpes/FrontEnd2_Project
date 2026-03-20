import { NextResponse } from "next/server";
import prisma from "../../lib/prisma"; // Ajusta o caminho se necessário

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        vehicle: {
          include: {
            owner: true, 
          },
        },
      },
      orderBy: { createdAt: "desc" }, // Ordenar pelos mais recentes
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Erro ao procurar agendamentos" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, price, date } = body;

    // Construímos o objeto de atualização dinamicamente
    const updateData: any = { status };
    
    // Se o Admin enviou preço, adicionamos ao update
    if (price !== undefined) updateData.price = parseFloat(price);
    
    // Se o Admin enviou data, convertemos para objeto Date do JS
    if (date) updateData.date = new Date(date);

    const updated = await prisma.service.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Erro ao atualizar agendamento" }, { status: 500 });
  }
}