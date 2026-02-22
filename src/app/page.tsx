"use client";

import { Wrench, Gauge, ShieldCheck, ChevronRight, Settings } from "lucide-react";
import { Button } from "./components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-garage-dark text-white bg-garage-texture">
      
      {/* HERO SECTION - IMPACTO VISUAL */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b-4 border-garage-blue">
        {/* Imagem de fundo com overlay pesado para dar profundidade */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-garage-dark via-transparent to-garage-dark" />

        <div className="container relative z-10 px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-garage-blue text-xs font-black uppercase tracking-tighter italic">
              <Settings className="animate-spin-slow" size={14} /> Especialistas em Pneus e Mecânica
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-none tracking-tighter mb-6">
              TS <span className="text-garage-blue">PNEUS</span> <br />
              <span className="text-outline">PERFORMANCE</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 max-w-xl font-medium border-l-4 border-garage-blue pl-6">
              Desde Olhos de Água para a estrada. Tecnologia de ponta, mãos de mestre e a confiança de quem conhece o seu carro.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="btn-industrial bg-garage-blue hover:bg-blue-700 text-white font-black px-10 h-16 text-xl transition-all hover:scale-105">
                MARCAR REVISÃO
              </Button>
              <Button size="lg" variant="outline" className="btn-industrial border-2 border-white font-black px-10 h-16 text-xl hover:bg-white hover:text-black">
                VER STATUS
              </Button>
            </div>
          </div>
        </div>
        
        {/* Indicador de "Scroll" Estilo Industrial */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-1 h-12 bg-garage-blue rounded-full" />
        </div>
      </section>

      {/* SECÇÃO DE SERVIÇOS - CARDS RUGOSOS */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { icon: <Gauge size={40} />, title: "Pneus & Alinhamento", desc: "Segurança máxima em cada curva com as melhores marcas." },
            { icon: <Wrench size={40} />, title: "Mecânica Geral", desc: "Diagnóstico completo e reparação especializada." },
            { icon: <ShieldCheck size={40} />, title: "Check-up Grátis", desc: "Verificamos 25 pontos críticos do seu veículo." }
          ].map((s, i) => (
            <div key={i} className="group p-12 bg-slate-900/50 border border-slate-800 hover:bg-garage-blue transition-all duration-500 cursor-default">
              <div className="text-garage-blue group-hover:text-white mb-6 transition-colors">
                {s.icon}
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{s.title}</h3>
              <p className="text-slate-400 group-hover:text-blue-100 transition-colors mb-6 font-medium">
                {s.desc}
              </p>
              <div className="w-12 h-1 bg-garage-blue group-hover:bg-white transition-all" />
            </div>
          ))}
        </div>
      </section>

      {/* INFO RÁPIDA - COMO NO GOOGLE MAPS */}
      <section className="bg-white text-black py-16">
        <div className="container mx-auto px-6 flex flex-wrap justify-between items-center gap-12">
          <div>
            <h2 className="text-4xl font-black uppercase italic leading-none mb-2">Visite a nossa oficina</h2>
            <p className="font-bold text-slate-600">Olhos de Água, Faro - Portugal</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-xs font-black uppercase text-slate-400">Telefone</p>
              <p className="text-xl font-black">289 360 294</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-black uppercase text-slate-400">Horário</p>
              <p className="text-xl font-black">Seg-Sex: 08:30 - 19:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}