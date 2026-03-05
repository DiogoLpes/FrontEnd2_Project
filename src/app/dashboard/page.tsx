import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth"; // Se criaste o lib/auth, usa este. Se não, usa o da rota.
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Se o middleware estiver a funcionar, quando o código chega aqui, o user JÁ ESTÁ logado.
  const session = await getServerSession(authOptions);

  // Apenas uma verificação de segurança extra
  if (!session) redirect("/auth?mode=login");

  return (
    <div className="pt-32 p-10 text-white">
      <h1 className="text-3xl font-black uppercase italic">Painel de <span className="text-blue-600">Controlo</span></h1>
      <p className="mt-4 opacity-50 uppercase font-bold text-xs">Acesso Garantido: {session.user?.email}</p>
    </div>
  );
}