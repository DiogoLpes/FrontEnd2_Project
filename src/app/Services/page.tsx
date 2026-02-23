// app/servicos/page.tsx
const services = [
  { id: '01', title: 'Pneus & Alinhamento', specs: ['Equilíbrio 3D', 'Pressão Azoto', 'Convergência'] },
  { id: '02', title: 'Mecânica Geral', specs: ['Óleos & Filtros', 'Distribuição', 'Embraiagens'] },
  { id: '03', title: 'Diagnóstico Pro', specs: ['Leitura de Erros', 'Reset de Service', 'Baterias'] },
];

export default function ServicosPage() {
  return (
    <div className="min-h-screen pt-32 bg-garage-dark bg-checkerboard">
      <div className="container mx-auto px-6">
        <h2 className="text-6xl font-black italic uppercase text-white mb-16 border-l-8 border-blue-600 pl-6">Nossas <span className="text-blue-600">Soluções</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(s => (
            <div key={s.id} className="bg-slate-900/80 border-t-4 border-blue-600 p-8 hover:translate-y-[-10px] transition-all group">
              <span className="text-5xl font-black text-slate-800 group-hover:text-blue-600/20 transition-colors">{s.id}</span>
              <h3 className="text-2xl font-black italic uppercase text-white mt-4 mb-6">{s.title}</h3>
              <ul className="space-y-3">
                {s.specs.map(spec => (
                  <li key={spec} className="flex items-center text-slate-400 font-bold text-sm">
                    <div className="w-2 h-2 bg-blue-600 mr-3" /> {spec}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}