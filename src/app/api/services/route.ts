import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Ajusta o @/ conforme o teu projeto

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const plate = searchParams.get("plate");


    if (plate) {
      const service = await prisma.service.findFirst({
        where: { vehicle: { plate: plate.toUpperCase() } },
        include: { vehicle: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(service);
    }

    const services = await prisma.service.findMany({
      include: {
        vehicle: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);

  } catch (error: any) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, price, date } = body;

    const updateData: any = { status };
    
    // parseFloat garante que o preço é gravado como Float no Postgres
    if (price !== undefined && price !== "") {
      updateData.price = parseFloat(price);
    }
    
    if (date) {
      updateData.date = new Date(date);
    }

    const updated = await prisma.service.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}