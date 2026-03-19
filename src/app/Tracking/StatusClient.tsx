"use client";

import { Lock, ChevronLeft, MessageCircle, Clock, Wrench, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function StatusClient({ booking }: { booking: any }) {
  const { data: session, status } = useSession();

  // 1. ECRÃ DE ERRO SIMPLES (Caso não esteja logado)
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 text-white font-sans">
        <div className="max-w-sm w-full text-center space-y-8 bg-[#0d0f14] p-10 border-2 border-red-600/20 rounded-3xl shadow-2xl">
          <div className="flex justify-center">
            <div className="p-5 bg-red-600/10 rounded-2xl border border-red-600/30">
              <Lock className="text-red-600" size={40} />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-black uppercase italic mb-2 tracking-tighter">Acesso Bloqueado</h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Login Necessário</p>
          </div>

          <div className="space-y-4">
            <Link href="/auth?mode=login" className="block w-full py-4 bg-red-600 hover:bg-white hover:text-black text-white font-black uppercase italic rounded-xl transition-all">
              Entrar no Sistema
            </Link>
            <Link href="/" className="block text-[10px] font-black uppercase tracking-widest text-slate-700 hover:text-blue-500 transition-colors">
              Voltar à página inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. DESIGN DO STATUS (Caso esteja logado)
  return (
    <div className="min-h-screen bg-[#05070a] text-white font-sans relative overflow-hidden p-6">
      {/* Imagem de Fundo Oficina */}
      <div className="absolute inset-0 z-0 opacity-15 grayscale pointer-events-none">
        <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-20">
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center gap-2 text-white/30 hover:text-blue-500 transition-all uppercase text-[10px] font-black tracking-[0.3em]">
            <ChevronLeft size={16} /> Voltar
          </Link>
          <span className="text-[10px] font-black uppercase tracking-widest italic text-blue-500 px-4 py-1 bg-blue-600/10 border border-blue-600/20 rounded-full">
            Unidade: {booking.plate}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card Esquerda */}
          <div className="lg:col-span-4 bg-[#0d0f14]/80 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
            <p className="text-blue-500 text-[9px] font-black uppercase tracking-widest mb-4 italic">Dados da Viatura</p>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-8">{booking.plate}</h2>
            <div className="space-y-4 border-l-2 border-white/10 pl-6">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Serviço: <span className="text-white ml-2 italic">{booking.service}</span></p>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Data: <span className="text-white ml-2 italic">{booking.date}</span></p>
            </div>
            
            <button 
                onClick={() => window.open(`https://wa.me/351912345678?text=Ola, gostaria de saber sobre a matricula ${booking.plate}`)}
                className="w-full mt-10 bg-blue-600 py-6 rounded-2xl flex items-center justify-center gap-3 font-black uppercase italic hover:bg-white hover:text-black transition-all group"
            >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> WhatsApp
            </button>
          </div>

          {/* Card Direita - Progresso */}
          <div className="lg:col-span-8 bg-[#0d0f14]/80 border border-white/5 rounded-[2rem] p-10 backdrop-blur-xl">
            <h3 className="text-2xl font-black italic uppercase mb-10 tracking-tight">Status <span className="text-blue-600">Live</span></h3>
            
            <div className="flex justify-between items-center mb-10">
                <Step icon={<Clock size={20}/>} label="Receção" active={true} done={booking.status !== "PENDENTE"} />
                <div className="h-[2px] w-full bg-white/5 mx-4" />
                <StatusStep icon={<Wrench size={20}/>} label="Trabalho" active={booking.status === "EM_MANUTENCAO"} done={booking.status === "CONCLUIDO"} />
                <div className="h-[2px] w-full bg-white/5 mx-4" />
                <StatusStep icon={<CheckCircle2 size={20}/>} label="Pronto" active={booking.status === "CONCLUIDO"} done={booking.status === "CONCLUIDO"} />
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center italic font-bold text-slate-400 text-sm">
                A sua viatura encontra-se em fase de: <span className="text-blue-500 uppercase ml-2 tracking-widest">{booking.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-componentes auxiliares
function StatusStep({ icon, label, active, done }: any) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${done ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : active ? 'bg-blue-600/10 border-blue-600 text-blue-600 animate-pulse' : 'bg-black/40 border-white/5 text-white/10'}`}>
        {icon}
      </div>
      <p className={`mt-3 text-[10px] font-black uppercase italic tracking-widest ${active || done ? 'text-white' : 'text-slate-800'}`}>{label}</p>
    </div>
  );
}

function Step({ icon, label, active, done }: any) {
    return <StatusStep icon={icon} label={label} active={active} done={done} />
}