import { Car, Wrench } from "lucide-react";
import { Button } from "../components/ui/button";

export default function RastreioPage() {
  return (
    <div className="min-h-screen pt-32 bg-slate-950 flex flex-col items-center">
      <div className="w-full max-w-4xl px-6">
        <div className="bg-blue-600 p-8 flex justify-between items-center mb-1">
          <h1 className="text-3xl font-black italic uppercase text-white">Minha Garagem</h1>
          <Button className="bg-black text-white rounded-none uppercase font-black italic px-6 hover:bg-white hover:text-black transition-all">
            + Adicionar Veículo
          </Button>
        </div>
        
        {/* Card do Carro que está na oficina agora */}
        <div className="bg-slate-900 border-x-2 border-b-2 border-slate-800 p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-slate-800 flex items-center justify-center border-2 border-blue-600">
               <Car size={48} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Volkswagen Golf GTI</h2>
              <span className="bg-slate-800 text-blue-400 font-mono px-3 py-1 text-sm border border-blue-600/30">MATRÍCULA: XX-XX-XX</span>
            </div>
          </div>
          
          
          <div className="grid grid-cols-2 gap-4">
             <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Última Atualização</p>
             <p className="text-slate-500 font-bold text-xs uppercase tracking-widest text-right">Estado</p>
             <p className="text-white font-black italic uppercase">Há 15 minutos</p>
             <p className="text-blue-500 font-black italic uppercase text-right">A alinhar direção</p>
          </div>
        </div>
      </div>
    </div>
  );
}