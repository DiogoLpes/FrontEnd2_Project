"use server"

import { saveUserAfterLogin } from "../../../hello-prisma/src/services/user-service";
import { redirect } from "next/navigation";

export async function handleLoginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;

  // Guarda na base de dados (Docker)
  const user = await saveUserAfterLogin({ email, name });

  if (user) {
    redirect("/dashboard"); // Leva o cliente para a oficina
  }
}