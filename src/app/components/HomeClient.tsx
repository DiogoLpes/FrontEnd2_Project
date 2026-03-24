"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface HomeClientProps {
  hasVehicles: boolean;
  isLoggedIn: boolean;
}

export default function HomeClient({ hasVehicles, isLoggedIn }: HomeClientProps) {
  const router = useRouter();

  const handleAction = () => {
    // 1. Se não está logado, vai para Auth
    if (!isLoggedIn) {
      router.push("/auth");
      return;
    }

    // 2. Se está logado mas não tem carros, vai para AddCar
    if (!hasVehicles) {
      router.push("/dashboard/addcar");
      return;
    }

    // 3. Se está logado e tem carros, vai para Agenda
    router.push("/agenda");
  };

  return (
    <Button 
      onClick={handleAction}
      size="lg" 
      className="bg-blue-600 text-white font-black px-10 h-20 text-xl hover:bg-blue-700 w-full md:w-auto uppercase italic"
    >
      FAZER MARCAÇÃO
    </Button>
  );
}