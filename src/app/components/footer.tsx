"use client";

import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#020617] border-t border-slate-100 dark:border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
              <span className="text-xl font-bold tracking-tight">TS<span className="text-blue-600">PNEUS</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Redefinindo a manutenção automóvel com transparência e tecnologia. A sua oficina de confiança, agora 100% digital.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Empresa</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Sobre Nós</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Serviços</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Preçário</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-slate-500"><MapPin size={16} className="text-blue-600" /> Faro, Portugal</li>
              <li className="flex items-center gap-3 text-sm text-slate-500"><Phone size={16} className="text-blue-600" /> +351 912 345 678</li>
              <li className="flex items-center gap-3 text-sm text-slate-500"><Mail size={16} className="text-blue-600" /> hello@tspneus.pt</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Social</h4>
            <div className="flex gap-3">
              <Link href="#" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium">
          <p>© {new Date().getFullYear()} TSPneus. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-blue-600">Privacidade</Link>
            <Link href="#" className="hover:text-blue-600">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}