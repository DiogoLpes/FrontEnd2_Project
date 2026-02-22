import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar"; 
import Footer from "./components/footer"; 

// Fonte Barlow Condensed para cabeçalhos e menus (estilo racing/industrial)
const barlow = Barlow_Condensed({ 
  subsets: ["latin"], 
  weight: ["400", "700", "900"],
  variable: "--font-barlow"
});

export const metadata: Metadata = {
  title: "TS Pneus | Performance & Automotive Care",
  description: "Especialistas em pneus e mecânica em Olhos de Água.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className={`${barlow.variable} font-sans bg-garage-dark text-white bg-garage-texture min-h-screen flex flex-col`}>
        {/* Camada de grão/ruído para textura de asfalto (opcional mas premium) */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] z-50"></div>
        
        <Navbar />
        
        {/* Main content - flex-grow garante que o footer fique sempre no fundo */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}