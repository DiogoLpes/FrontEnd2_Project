"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RefreshHandler() {
  const router = useRouter();

  useEffect(() => {
    // Atualiza os dados a cada 30 segundos
    const interval = setInterval(() => {
      router.refresh();
    }, 30000); 
    return () => clearInterval(interval);
  }, [router]);

  return null;
}