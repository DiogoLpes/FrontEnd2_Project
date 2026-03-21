"use client";

import React from "react";
import { Lock, ChevronLeft, MessageCircle, Clock, Wrench, CheckCircle2, Wallet, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function StatusClient({ booking }: { booking: any }) {
  const { status: authStatus } = useSession();

  if (authStatus === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 text-white font-sans">
        <div className="max-w-sm w-full text-center space-y-8 bg-[#0d0f14] p-10 border-2 border-red-600/20 rounded-3xl shadow-2xl">
          <Lock className="mx-auto text-red-600" size={40} />
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Acesso Restrito</h2>
          <Link href="/auth?mode=login" className="block w-full py-4 bg-red-600 text-white font-black uppercase italic rounded-xl">Entrar</Link>
        </div>
      </div>
    );
  }

  // Mapeamento de Status para Labels amigáveis
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "SOLICITADO": return { label: "Pedido Recebido", desc: "Aguardamos triagem técnica.", color: "text-blue-500" };
      case "ORCAMENTADO": return { label: "Orçamento Pronto", desc: "Verifique os valores e datas abaixo.", color: "text-yellow-500" };
      case "EM_REPARACAO": return { label: "Na Bancada", desc: "A viatura está em intervenção.", color: "text-orange-500" };
      case "CONCLUIDO": return { label: "Finalizado", desc: "Pode levantar a sua viatura.", color: "text-green-500" };
      default: return { label: status, desc: "Em processamento...", color: "text-white" };
    }
  };

  const info = getStatusInfo(booking.status);

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-sans relative overflow-hidden p-6 pt-24">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="flex items-center gap-2 text-white/30 hover:text-blue-500 uppercase text-[10px] font-black tracking-[0.3em]">
            <ChevronLeft size={16} /> Home
          </Link>
          <div className="bg-blue-600/10 border border-blue-600/20 px-6 py-2 rounded-full font-black italic text-blue-500 text-[10px]">
            MATRÍCULA: {booking.plate}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card Esquerda - Detalhes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0d0f14] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <p className="text-blue-500 text-[9px] font-black uppercase tracking-[0.3em] mb-2 italic">Unidade Ativa</p>
              <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">{booking.plate}</h2>
              
              <div className="space-y-6 border-l-2 border-blue-600/30 pl-6">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Serviço Solicitado</p>
                  <p className="text-xl font-bold italic uppercase leading-tight">{booking.type}</p>
                </div>
                
                {booking.price && (
                  <div className="animate-pulse">
                    <p className="text-[10px] text-yellow-500 uppercase font-black tracking-[0.2em] mb-1">Orçamento Estimado</p>
                    <p className="text-4xl font-black italic text-yellow-500">{booking.price}€</p>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => window.open(`https://wa.me/351912345678?text=Olá, sobre a matrícula ${booking.plate}...`)}
              className="w-full bg-blue-600 py-6 rounded-2xl flex items-center justify-center gap-3 font-black uppercase italic hover:bg-white hover:text-black transition-all"
            >
              <MessageCircle size={20} /> Suporte Oficina
            </button>
          </div>

          {/* Card Direita - Timeline */}
          <div className="lg:col-span-7 bg-[#0d0f14] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-xl font-black italic uppercase mb-12 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
              Estado da <span className="text-blue-600 text-2xl ml-1">Ordem</span>
            </h3>

            {/* Timeline Horizontal */}
            <div className="flex justify-between items-center mb-16 relative px-2">
              <StatusStep icon={<Clock />} label="Solicitado" active={booking.status === "SOLICITADO"} done={booking.status !== "SOLICITADO"} />
              <div className="h-[2px] flex-1 bg-white/5 mx-2" />
              <StatusStep icon={<Wallet />} label="Orçado" active={booking.status === "ORCAMENTADO"} done={["EM_REPARACAO", "CONCLUIDO"].includes(booking.status)} />
              <div className="h-[2px] flex-1 bg-white/5 mx-2" />
              <StatusStep icon={<Wrench />} label="Oficina" active={booking.status === "EM_REPARACAO"} done={booking.status === "CONCLUIDO"} />
              <div className="h-[2px] flex-1 bg-white/5 mx-2" />
              <StatusStep icon={<CheckCircle2 />} label="Pronto" active={booking.status === "CONCLUIDO"} done={booking.status === "CONCLUIDO"} />
            </div>

            {/* Card Agendamento Dinâmico */}
            <div className={`p-8 rounded-3xl border transition-all ${booking.status === 'SOLICITADO' ? 'bg-white/[0.02] border-white/5 opacity-50' : 'bg-blue-600/10 border-blue-600/30'}`}>
              {booking.status === 'SOLICITADO' ? (
                <div className="text-center py-4 italic font-bold text-slate-500 text-sm uppercase tracking-widest">
                   A aguardar confirmação de data...
                </div>
              ) : (
                <div className="flex flex-col md:flex-row justify-around items-center gap-8">
                  <div className="text-center">
                    <CalendarIcon className="mx-auto mb-2 text-blue-500 opacity-50" size={20} />
                    <p className="text-[9px] uppercase font-black text-slate-500 tracking-[0.2em] mb-1">Data Agendada</p>
                    <p className="text-2xl font-black italic">{new Date(booking.date).toLocaleDateString('pt-PT')}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="mx-auto mb-2 text-blue-500 opacity-50" size={20} />
                    <p className="text-[9px] uppercase font-black text-slate-500 tracking-[0.2em] mb-1">Hora Marcada</p>
                    <p className="text-2xl font-black italic">{booking.hour || "09:00"}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 p-5 bg-blue-600 rounded-2xl text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-1">{info.label}</p>
               <p className="text-sm font-bold italic">{info.desc}</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// Subcomponente de Step
function StatusStep({ icon, label, active, done }: any) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 ${done ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30 scale-90' : active ? 'bg-blue-600/20 border-blue-600 text-blue-600 scale-110 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-black/40 border-white/5 text-white/10'}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <p className={`mt-4 text-[9px] font-black uppercase italic tracking-tighter ${active || done ? 'text-white' : 'text-slate-800'}`}>{label}</p>
    </div>
  );
}