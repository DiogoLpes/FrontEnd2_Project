"use client";

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#05070a] relative overflow-hidden bg-carbon-fiber flex items-center justify-center selection:bg-blue-600/30">
      {/* Camada de Scanline - Fica aqui para não resetar na animação */}
      <div className="auth-scanline pointer-events-none" />
      
      {/* Luz Neon de fundo (Brilho azul subtil no canto) */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Aqui é onde entra o conteúdo da page.tsx (o teu card com o slider) */}
      <div className="w-full h-full flex items-center justify-center p-4 relative z-10">
        {children}
      </div>
    </div>
  );
}