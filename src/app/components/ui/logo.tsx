import { Settings } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center group cursor-pointer">
      <div className="relative">
        {/* Hexágono que lembra uma porca de roda */}
        <div className="w-12 h-12 bg-blue-600 rotate-45 flex items-center justify-center border-2 border-white group-hover:rotate-[135deg] transition-all duration-500">
          <Settings className="text-white -rotate-45 group-hover:-rotate-[135deg] transition-all" size={24} />
        </div>
      </div>
      <div className="ml-4 flex flex-col leading-none">
        <span className="text-3xl font-black italic tracking-tighter text-metal uppercase">
          TS <span className="text-blue-600">PNEUS</span>
        </span>
        <div className="h-1 w-full bg-blue-600 mt-1" />
        <span className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-1">Automotive Care Hub</span>
      </div>
    </div>
  );
}