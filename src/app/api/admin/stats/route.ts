import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const [totalServices, pendingServices, totalProducts, lowStock, revenueData] = await Promise.all([
      prisma.service.count(),
      prisma.service.count({ where: { status: "PENDENTE" } }),
      prisma.product.count(),
      prisma.product.count({ where: { quantity: { lte: 5 } } }),
      prisma.service.aggregate({
        _sum: { price: true },
        where: { status: "CONCLUIDO" }
      })
    ]);

    return NextResponse.json({
      totalServices,
      pendingServices,
      totalProducts,
      lowStock,
      revenue: revenueData._sum.price || 0
    });
  } catch (error) {
    return NextResponse.json({ error: "Erro nas estatísticas" }, { status: 500 });
  }
}