"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export default function HomeClient({ hasVehicles }: { hasVehicles: boolean }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleAction = () => {
    // 1. Enquanto está a verificar a sessão, não faz nada
    if (status === "loading") return;

    // 2. Se NÃO houver sessão (utilizador deslogado)
    if (status === "unauthenticated") {
      console.log("Status: Não logado -> Redirecionando para /auth");
      router.push("/auth");
      return;
    }

    // 3. Se HÁ sessão (utilizador logado)
    if (status === "authenticated") {
      if (!hasVehicles) {
        console.log("Status: Logado SEM carro -> Redirecionando para addcar");
        router.push("/dashboard/addcar");
      } else {
        console.log("Status: Logado COM carro -> Redirecionando para agenda");
        router.push("/agenda");
      }
    }
  };

  return (
    <Button 
      onClick={handleAction}
      disabled={status === "loading"}
      size="lg" 
      className="bg-blue-600 text-white font-black px-10 h-20 text-xl hover:bg-blue-700 w-full md:w-auto uppercase italic"
    >
      {status === "loading" ? "VERIFICANDO..." : "FAZER MARCAÇÃO"}
    </Button>
  );
}