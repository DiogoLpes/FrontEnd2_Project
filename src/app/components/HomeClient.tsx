"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function HomeClient({ hasVehicles, isLoggedIn }: { hasVehicles: boolean, isLoggedIn: boolean }) {
  const router = useRouter();

  const handleAction = () => {
    if (!isLoggedIn) {
      router.push("/auth"); 
    } else if (!hasVehicles) {
      router.push("/dashboard/addcar"); 
    } else {
      router.push("/agenda"); 
    }
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