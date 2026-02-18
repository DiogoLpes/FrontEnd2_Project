"use client";

import { Clock, ShieldCheck, Wrench, ArrowRight, Star, Settings, History, Fuel, Gauge } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import heroImage from "@/assets/hero-image.jpg"; 

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0c10]">
      
      {/* HERO SECTION - INDUSTRIAL DESIGN */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background com efeito de profundidade */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10] via-[#0a0c10]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] z-10" />
          <img 
            src={heroImage.src} 
            className="w-full h-full object-cover scale-105 animate-pulse-slow" 
            alt="Oficina"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[2px] w-12 bg-primary" />
              <span className="text-primary font-black uppercase tracking-[0.3em] text-sm">Oficina de Alta Performance</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] uppercase italic mb-8 tracking-tighter">
              TECNOLOGIA <br />
              <span className="text-transparent stroke-text">DOMINANTE.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl font-medium leading-relaxed border-l-4 border-primary pl-6">
              Não somos apenas uma oficina. Somos o centro tecnológico onde o seu veículo recupera a potência original. Agendamento digital e transparência total.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="h-20 px-12 text-xl font-black uppercase italic tracking-tighter rounded-none bg-primary text-black hover:bg-yellow-500 skew-x-[-12deg]" asChild>
                <Link href="/agendar" className="flex items-center gap-3">
                   <span className="skew-x-[12deg]">Agendar Serviço</span>
                   <ArrowRight className="skew-x-[12deg] w-6 h-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-20 px-12 text-xl font-black uppercase italic tracking-tighter rounded-none border-2 border-white text-white hover:bg-white hover:text-black skew-x-[-12deg]" asChild>
                <Link href="/status">
                  <span className="skew-x-[12deg]">Rastrear Matrícula</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* INDICADORES LATERAIS */}
        <div className="absolute right-10 bottom-20 hidden xl:flex flex-col gap-10">
          <div className="flex flex-col items-end">
            <Gauge className="text-primary w-10 h-10 mb-2" />
            <span className="text-white font-black text-3xl italic tracking-tighter">100%</span>
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Precisão Digital</span>
          </div>
          <div className="flex flex-col items-end">
            <Fuel className="text-primary w-10 h-10 mb-2" />
            <span className="text-white font-black text-3xl italic tracking-tighter">24H</span>
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Suporte Agendado</span>
          </div>
        </div>
      </section>

      {/* SERVICES GRID - CARDS MAIS TRABALHADOS */}
      <section className="py-32 relative bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-slate-800">
            {[
              { icon: <Wrench className="w-10 h-10" />, title: "Mecânica Avançada", desc: "Motores, transmissões e sistemas complexos analisados por especialistas." },
              { icon: <ShieldCheck className="w-10 h-10" />, title: "Segurança Ativa", desc: "Pneus e travões testados sob condições extremas de performance." },
              { icon: <History className="w-10 h-10" />, title: "Cloud Garagem", desc: "Histórico completo da sua viatura disponível em qualquer lugar." },
            ].map((s, i) => (
              <div key={i} className="p-16 border-slate-800 border hover:bg-primary transition-all duration-500 group">
                <div className="text-primary mb-10 group-hover:text-black transition-colors">{s.icon}</div>
                <h3 className="text-3xl font-black uppercase italic mb-6 group-hover:text-black transition-colors leading-none">{s.title}</h3>
                <p className="text-slate-400 group-hover:text-black/80 transition-colors font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}