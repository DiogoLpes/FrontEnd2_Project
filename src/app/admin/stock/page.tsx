"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Package, AlertCircle, TrendingUp, DollarSign } from "lucide-react";
import Swal from "sweetalert2";

export default function StockPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      category: formData.get("category"),
      quantity: formData.get("quantity"),
      minStock: formData.get("minStock") || 5,
      price: formData.get("price"),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        Swal.fire({ 
            title: "REGISTADO", 
            text: "Peça inserida no sistema com sucesso.", 
            icon: "success", 
            background: "#0d1117", 
            color: "#fff",
            confirmButtonColor: "#2563eb"
        });
        (e.target as HTMLFormElement).reset();
        fetchProducts();
      }
    } catch (err) {
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cálculos para os Cards
  const totalItems = products.reduce((acc, p: any) => acc + Number(p.quantity), 0);
  const totalValue = products.reduce((acc, p: any) => acc + (Number(p.price) * Number(p.quantity)), 0);
  const lowStockCount = products.filter((p: any) => p.quantity <= p.minStock).length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER & ESTATÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0d1117] border border-white/5 p-6 rounded-sm flex items-center gap-4 shadow-xl">
          <div className="p-3 bg-blue-600/10 rounded-full text-blue-500"><Package size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total de Itens</p>
            <p className="text-2xl font-black text-white italic tracking-tighter">{totalItems}</p>
          </div>
        </div>
        <div className="bg-[#0d1117] border border-white/5 p-6 rounded-sm flex items-center gap-4 shadow-xl">
          <div className="p-3 bg-green-600/10 rounded-full text-green-500"><TrendingUp size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Valor em Stock</p>
            <p className="text-2xl font-black text-white italic tracking-tighter">{totalValue.toFixed(2)}€</p>
          </div>
        </div>
        <div className="bg-[#0d1117] border border-white/5 p-6 rounded-sm flex items-center gap-4 shadow-xl border-l-orange-500/50">
          <div className="p-3 bg-orange-600/10 rounded-full text-orange-500"><AlertCircle size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reposição Crítica</p>
            <p className="text-2xl font-black text-orange-500 italic tracking-tighter">{lowStockCount} Alertas</p>
          </div>
        </div>
      </div>

      {/* FORMULÁRIO DE ENTRADA */}
      <div className="bg-[#0d1117] border border-white/5 p-6 rounded-sm shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 group-hover:w-1.5 transition-all"></div>
        <h2 className="text-white font-black italic uppercase text-sm mb-6 flex items-center gap-2 tracking-tighter">
          <Plus size={16} className="text-blue-600" /> Nova Entrada de Material
        </h2>
        
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-blue-600 uppercase">Descrição da Peça</label>
            <input name="name" placeholder="Ex: Pastilhas Travão" required className="w-full bg-[#161b22] border border-white/10 p-3 text-white text-xs outline-none focus:border-blue-600 transition-all placeholder:text-slate-700" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-blue-600 uppercase">Categoria</label>
            <input name="category" placeholder="Ex: Travões" required className="w-full bg-[#161b22] border border-white/10 p-3 text-white text-xs outline-none focus:border-blue-600 transition-all placeholder:text-slate-700" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-blue-600 uppercase">Quantidade</label>
              <input name="quantity" type="number" placeholder="0" required className="w-full bg-[#161b22] border border-white/10 p-3 text-white text-xs outline-none focus:border-blue-600 transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-blue-600 uppercase">Preço (€)</label>
              <input name="price" type="number" step="0.01" placeholder="0.00" required className="w-full bg-[#161b22] border border-white/10 p-3 text-white text-xs outline-none focus:border-blue-600 transition-all" />
            </div>
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-black uppercase italic text-xs p-3 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10">
              {loading ? "A PROCESSAR..." : "REGISTAR PEÇA"}
            </button>
          </div>
          <input name="minStock" type="hidden" defaultValue="5" />
        </form>
      </div>

      {/* TABELA DE INVENTÁRIO */}
      <div className="bg-[#0d1117] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
        <div className="bg-[#161b22] p-4 border-b border-white/5">
          <h3 className="text-white font-black uppercase italic text-xs flex items-center gap-2">
            <TrendingUp size={14} className="text-blue-600" /> Inventário Atualizado
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-slate-500 uppercase font-black text-[10px] tracking-widest">
                <th className="p-5">Informação do Item</th>
                <th className="p-5">Categoria</th>
                <th className="p-5">Quantidade</th>
                <th className="p-5">Preço Unit.</th>
                <th className="p-5 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {products.map((p: any) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs uppercase group-hover:text-blue-500 transition-colors">{p.name}</span>
                      <span className="text-[9px] text-slate-600 font-mono tracking-tighter">SKU-{p.id.toString().padStart(5, '0')}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="bg-white/5 text-slate-400 text-[9px] px-2 py-1 font-black uppercase border border-white/5">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black ${p.quantity <= p.minStock ? "text-orange-500 animate-pulse" : "text-white"}`}>
                        {p.quantity} UN
                      </span>
                      {p.quantity <= p.minStock && <AlertCircle size={12} className="text-orange-500" />}
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="font-mono text-blue-400 text-xs font-bold">{Number(p.price).toFixed(2)}€</span>
                  </td>
                  <td className="p-5 text-right">
                    <button className="p-2 hover:bg-red-500/20 text-slate-600 hover:text-red-500 transition-all rounded-sm">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-600 italic font-black text-xs uppercase tracking-widest">
                    Sem registos no inventário
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}