import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar  from "./components/navbar"; 
import Footer from "./components/footer"; 
import { Providers } from "./providers"; // Importa o que criámos acima

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
      <body className={`${barlow.variable} font-sans bg-[#05070a] text-white min-h-screen flex flex-col`}>
        {/* Camada de grão/ruído para textura de asfalto */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] z-50"></div>
        
        {/* ENVOLVER TUDO COM PROVIDERS */}
        <Providers>
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}