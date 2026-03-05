"use server";

import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(data: any) {
  try {
    const { name, email, password, plate, phone } = data;

    // verificar se já existe utilizador
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error("Utilizador já existe");
    }

    // verificar se a matrícula já existe
    const vehicleExists = await prisma.vehicle.findUnique({
      where: { plate },
    });

    if (vehicleExists) {
      throw new Error("Esta matrícula já está registada");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,

        vehicles: {
          create: {
            plate: plate,
            brand: "Padrão",
            model: "Padrão",
          },
        },
      },
      include: {
        vehicles: true,
      },
    });

    return user;
  } catch (error: any) {
    console.error("Erro no registo:", error);
    throw new Error(error.message || "Erro ao criar conta");
  }
}