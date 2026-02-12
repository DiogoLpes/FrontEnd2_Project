"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-slate-800 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="flex flex-col">
            <span className="text-3xl font-black italic uppercase text-white mb-6">TS<span className="text-primary">PNEUS</span></span>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Elevamos o padrão da manutenção automóvel em Portugal. Tecnologia, transparência e performance.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-3 bg-slate-900 rounded-full text-white hover:bg-primary hover:text-black transition-all"><Instagram size={18} /></Link>
              <Link href="#" className="p-3 bg-slate-900 rounded-full text-white hover:bg-primary hover:text-black transition-all"><Facebook size={18} /></Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase italic mb-8 tracking-widest">Serviços</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-bold uppercase tracking-tighter">
              <li><Link href="#" className="hover:text-primary transition-colors">Troca de Pneus</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Revisão Oficial</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Diagnóstico OBD</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase italic mb-8 tracking-widest">Oficina</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-bold uppercase tracking-tighter">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-primary" /> Faro, Portugal</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-primary" /> +351 912 345 678</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-primary" /> info@tspneus.pt</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase italic mb-8 tracking-widest">Horário</h4>
            <div className="text-slate-500 text-sm font-bold uppercase tracking-tighter space-y-2">
              <div className="flex justify-between"><span>Seg - Sex:</span> <span className="text-white">08:00 - 19:00</span></div>
              <div className="flex justify-between"><span>Sábado:</span> <span className="text-white">09:00 - 13:00</span></div>
              <div className="flex justify-between"><span>Domingo:</span> <span className="text-primary uppercase">Fechado</span></div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase font-black text-slate-600 tracking-[0.3em]">
            © {new Date().getFullYear()} TSPNEUS PERFORMANCE HUB. Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-[10px] uppercase font-black text-slate-600 tracking-[0.2em]">
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}