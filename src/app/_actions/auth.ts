"use server";

import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(data: any) {
  try {
    const { name, email, password, phone } = data;

    const userExists = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (userExists) {
      throw new Error("Este e-mail já está associado a uma conta.");
    }

    // Encriptar a password antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword, 
        phone,
        role: "USER",
      },
    });

    return user;
  } catch (error: any) {
    console.error("Erro no registo:", error);
    throw new Error(error.message || "Erro ao processar o registo.");
  }
}