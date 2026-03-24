import { Settings } from "lucide-react";
import { Button } from "./components/ui/button";
import Location from "./components/ui/localizacao";
import Link from "next/link";
import prisma from "./lib/prisma"; // Confirma se é 'import prisma' ou '{ prisma }'
import HomeClient from "./components/HomeClient"; 
import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  // 1. Busca a sessão do utilizador
  const session = await getServerSession(authOptions);

  // 2. Lógica de Servidor: Verifica se o utilizador LOGADO tem carros
  let hasCars = false;
  if (session?.user?.email) {
    const userWithVehicles = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { vehicles: true }
    });
    hasCars = (userWithVehicles?.vehicles?.length ?? 0) > 0;
  }

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-sans selection:bg-blue-600/30">
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b-4 border-blue-600">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-[#05070a]" />

        <div className="container relative z-10 px-6 mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-blue-600 text-xs font-black uppercase italic text-white">
              <Settings className="animate-spin-slow" size={14} /> Especialistas em Pneus e Mecânica
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-none tracking-tighter mb-6 text-white">
              TS <span className="text-blue-600">PNEUS</span> <br />
              <span className="text-transparent border-white/20" style={{ WebkitTextStroke: '1.5px white' }}>PERFORMANCE</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 max-w-xl font-medium border-l-4 border-blue-600 pl-6">
              Tecnologia de ponta e mãos de mestre. A confiança de quem conhece o seu carro.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* Agora passamos os dados reais para o botão */}
              <HomeClient hasVehicles={hasCars} isLoggedIn={!!session} />

              <Link href="/tracking" className="w-full md:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white font-black px-10 h-20 text-xl hover:bg-white hover:text-black w-full text-white uppercase italic"
                >
                  VER STATUS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECÇÃO DE SERVIÇOS */}
      <section className="py-32 bg-[#080a0f] border-t border-blue-600/20">
        <div className="container mx-auto px-10">
          <h2 className="text-5xl font-black italic uppercase mb-16 border-l-8 border-blue-600 pl-6">Nossas <span className="text-blue-600">Soluções</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: '01', title: 'Manutenção Preventiva', specs: ['Óleo & Filtros', 'Revisão Geral', 'Correias'] },
              { id: '02', title: 'Travagem & Segurança', specs: ['Pastilhas', 'Discos', 'Sangramento ABS'] },
              { id: '03', title: 'Diagnóstico & Avarias', specs: ['Eletrónica', 'Suspensão', 'Baterias'] },
            ].map((s) => (
              <div key={s.id} className="relative bg-[#0d0f14] border-t-4 border-blue-600 p-10 hover:bg-blue-600/5 transition-all group">
                <span className="absolute -right-4 -bottom-4 text-8xl font-black text-white/5 italic">{s.id}</span>
                <h3 className="text-2xl font-black italic uppercase text-white mb-8 group-hover:text-blue-600">{s.title}</h3>
                <ul className="space-y-4">
                  {s.specs.map((spec) => (
                    <li key={spec} className="flex items-center text-slate-400 font-bold text-sm tracking-wide">
                      <div className="w-2 h-2 bg-blue-600 mr-3 rotate-45" /> {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECÇÃO DE LOCALIZAÇÃO */}
      <section className="py-24 bg-[#05070a] border-t-4 border-blue-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">VISITE A NOSSA <br/><span className="text-blue-600 text-outline-sm">OFICINA</span></h2>
              <div className="space-y-4 text-lg font-bold italic border-l-2 border-white/10 pl-6">
                 <p>Olhos de Água, Faro</p>
                 <p>289 360 294</p>
                 <p className="text-blue-600 font-black">Seg-Sex: 08:30 - 19:00</p>
              </div>
            </div>
            <div className="lg:col-span-7 h-[500px] border border-white/5 rounded-3xl overflow-hidden">
               <Location />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}