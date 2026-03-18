"use client";

import { Wrench, Gauge, ShieldCheck, ChevronRight, Settings, Zap } from "lucide-react";
import { Button } from "./components/ui/button";
import Location from "./components/ui/localizacao";
import Link from "next/link";
import { handleBookingClick } from "./_actions/booking";

const services = [
  { 
    id: '01', 
    title: 'Manutenção Preventiva', 
    specs: [
      'Mudança de Óleo & Filtros', 
      'Revisão Geral de Segurança', 
      'Substituição de Correias'
    ] 
  },
  { 
    id: '02', 
    title: 'Travagem & Segurança', 
    specs: [
      'Substituição de Pastilhas', 
      'Retificação de Discos', 
      'Sangramento de Circuito ABS'
    ] 
  },
  { 
    id: '03', 
    title: 'Diagnóstico & Avarias', 
    specs: [
      'Deteção de Anomalias', 
      'Reparação de Suspensão', 
      'Substituição de Baterias'
    ] 
  },
];

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
              {/* BOTÃO COM LÓGICA (CENÁRIO A/B) */}
              <Button 
                onClick={async () => {

                  await handleBookingClick();
                }}
                size="lg" 
                className="btn-industrial bg-garage-blue hover:bg-blue-700 text-white font-black px-10 h-16 text-xl transition-all hover:scale-105"
              >
                MARCAR REVISÃO
              </Button>

              {/* LINK DIRETO PARA O STATUS */}
              <Link href="/status">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="btn-industrial border-2 border-white font-black px-10 h-16 text-xl hover:bg-white hover:text-black w-full"
                >
                  VER STATUS
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Indicador de "Scroll" Estilo Industrial */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-1 h-12 bg-garage-blue rounded-full" />
        </div>
      </section>

        
     {/* SECÇÃO DE SERVIÇOS - DESIGN INDUSTRIAL */}
      <section className="py-40 bg-garage-dark/50 relative overflow-hidden border-t border-garage-blue ">
        {/* Fundo decorativo para o estilo checkerboard */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="container mx-auto px-10 relative z-10">
          {/* Título Estilizado */}
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-black italic uppercase text-white border-l-8 border-garage-blue pl-6 tracking-tighter">
              Nossas <span className="text-garage-blue">Soluções</span>
            </h2>
            <p className="text-slate-500 font-bold mt-4 uppercase tracking-[0.3em] text-xs">Performance & Manutenção de Alta Precisão</p>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div 
                key={s.id} 
                className="relative bg-slate-900/40 border-t-4 border-garage-blue p-10 hover:bg-slate-900/80 hover:-translate-y-3 transition-all duration-500 group overflow-hidden"
              >
                {/* Número de fundo gigante */}
                <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-800/20 group-hover:text-garage-blue/10 transition-colors italic">
                  {s.id}
                </span>

                <h3 className="text-2xl font-black italic uppercase text-white mb-8 relative z-10 group-hover:text-garage-blue transition-colors">
                  {s.title}
                </h3>

                <ul className="space-y-4 relative z-10">
                  {s.specs.map((spec) => (
                    <li key={spec} className="flex items-center text-slate-400 font-bold text-sm tracking-wide group-hover:text-slate-200 transition-colors">
                      <div className="w-2 h-2 bg-garage-blue mr-3 rotate-45 group-hover:rotate-180 transition-transform duration-500" /> 
                      {spec}
                    </li>
                  ))}
                </ul>

                {/* Detalhe visual inferior */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-garage-blue group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
        {/* Linha de separação estilo sinalética de solo */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-garage-blue/100" />
      </section>
        

      {/* INFO RÁPIDA - COMO NO GOOGLE MAPS */}
      {/* SECÇÃO DE LOCALIZAÇÃO - DESIGN INDUSTRIAL */}
      <section className="py-24 bg-garage-dark border-t border-white/5 relative overflow-hidden border-garage-blue">
        {/* Elemento Decorativo de Fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-garage-blue/5 blur-[100px] -mr-48 -mt-48" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* TEXTO E INFOS (5 colunas) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-black uppercase italic leading-none tracking-tighter">
                  VISITE A NOSSA <br />
                  <span className="text-garage-blue">OFICINA</span>.
                </h2>
                <div className="h-1.5 w-20 bg-garage-blue" />
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-garage-blue/10 text-garage-blue rounded">
                    <Settings size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-slate-500">Endereço</p>
                    <p className="text-lg font-bold">Olhos de Água, Faro - Portugal</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-black uppercase text-slate-500">Telefone</p>
                    <p className="text-lg font-bold">289 360 294</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-slate-500">Horário</p>
                    <p className="text-lg font-bold italic">Seg-Sex: 08:30 - 19:00</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => window.open('https://maps.google.com/maps?width=500&height=400&hl=en&q=ts%20pneus&t=p&z=14&ie=UTF8&iwloc=B&output=embed', '_blank')}
                className="w-full md:w-auto bg-garage-blue hover:bg-white hover:text-black text-white font-black py-8 px-10 italic transition-all group"
              >
                ABRIR NO GOOGLE MAPS <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            {/* MAPA (7 colunas) */}
            <div className="lg:col-span-7 h-[500px]">
               <Location />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}