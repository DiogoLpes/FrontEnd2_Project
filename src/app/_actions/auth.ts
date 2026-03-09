"use server";

import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(data: any) {
  try {
    // Removemos o 'plate' daqui, pois não vem mais do formulário
    const { name, email, password, phone } = data;

    // 1. Verificar se o e-mail já está registado
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error("Este e-mail já está associado a uma conta.");
    }

    // 2. Encriptar a password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Criar apenas o utilizador
    // Removemos a parte de 'vehicles: { create: ... }'
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      },
    });

    // Retornamos o utilizador (sem veículos por enquanto)
    return user;

  } catch (error: any) {
    console.error("Erro no registo:", error);
    // Se for um erro do Prisma ou um erro lançado por nós, passamos a mensagem
    throw new Error(error.message || "Erro interno ao processar o registo.");
  }
}