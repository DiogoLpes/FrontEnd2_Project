"use server";

import prisma from "../lib/prisma"; 
import bcrypt from "bcryptjs";

export async function registerUser(data: any) {
  try {
    const { name, email, password, plate, phone } = data;

    // 1. Verificar se o utilizador já existe
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) throw new Error("Utilizador já existe");
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone, 
        plate,

        vehicles: {
          create: {
            plate: plate,
            brand: "Padrão", 
            model: "Padrão",
          }
        }
      },
    });

    return user;
  } catch (error: any) {
    console.error("Erro no registo:", error);
    throw new Error(error.message || "Erro ao criar conta");
  }
}