"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button"; // Ajusta o caminho se necessário
import { ChevronRight } from "lucide-react";

interface HomeClientProps {
  hasVehicles: boolean;
}

export default function HomeClient({ hasVehicles }: HomeClientProps) {
  const router = useRouter();

  const handleBookingClick = () => {
    if (hasVehicles) {
      router.push('/agenda');
    } else {
      router.push('/dashboard/addcar');
    }
  };

  return (
    <Button 
      onClick={handleBookingClick}
      size="lg" 
      className="h-20 px-10 bg-blue-600 hover:bg-white text-white hover:text-black font-black uppercase italic text-xl transition-all shadow-lg group w-full md:w-auto"
    >
      MARCAR REVISÃO <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
    </Button>
  );
}