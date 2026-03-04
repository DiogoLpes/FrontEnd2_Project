import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Se o session for null, o servidor vai imprimir isto no teu terminal (consola do VS Code)
  console.log("SESSÃO NO SERVIDOR:", session ? "LOGADO" : "VAZIA");

  if (!session) {
    // Se o middleware falhar e a sessão for nula, ele volta para o login
    redirect("/auth?mode=login");
  }

  return (
    <div className="pt-32 p-10">
      <h1 className="text-white text-3xl font-black italic uppercase">
        ACESSO <span className="text-blue-600">CONFIRMADO</span>
      </h1>
      <p className="text-slate-400">Bem-vindo, {session.user?.email}</p>
    </div>
  );
}