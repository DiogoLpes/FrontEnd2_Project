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
            title: '<h3 class="text-xl font-semibold text-white">Item Registado</h3>', 
            html: '<p class="text-sm text-slate-400">A nova peça foi adicionada ao inventário.</p>', 
            background: "#09090b",
            color: "#f8fafc",
            customClass: {
              popup: 'border border-slate-800 rounded-lg p-4',
              confirmButton: 'bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 w-full py-2.5 mt-2'
            },
            buttonsStyling: false
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* HEADER & ESTATÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#09090b] border border-white/10 p-6 rounded-lg flex items-center gap-4">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-md text-slate-400"><Package size={20} /></div>
          <div>
            <p className="text-xs font-medium text-slate-500">Total de Itens</p>
            <p className="text-2xl font-bold text-white">{totalItems}</p>
          </div>
        </div>
        <div className="bg-[#09090b] border border-white/10 p-6 rounded-lg flex items-center gap-4">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-md text-slate-400"><DollarSign size={20} /></div>
          <div>
            <p className="text-xs font-medium text-slate-500">Valor em Stock</p>
            <p className="text-2xl font-bold text-white">{totalValue.toFixed(2)}€</p>
          </div>
        </div>
        <div className={`bg-[#09090b] border ${lowStockCount > 0 ? 'border-amber-500/50' : 'border-white/10'} p-6 rounded-lg flex items-center gap-4`}>
          <div className={`p-3 rounded-md border ${lowStockCount > 0 ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Reposição Crítica</p>
            <p className={`text-2xl font-bold ${lowStockCount > 0 ? 'text-amber-500' : 'text-white'}`}>{lowStockCount} Alertas</p>
          </div>
        </div>
      </div>

      {/* FORMULÁRIO DE ENTRADA */}
      <div className="bg-[#09090b] border border-white/10 p-6 rounded-lg relative overflow-hidden">
        <h2 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
          <Plus size={16} className="text-slate-400" /> Nova Entrada de Material
        </h2>
        
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Descrição da Peça</label>
            <input name="name" placeholder="Ex: Pastilhas Travão" required className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-500 transition-colors" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Categoria</label>
            <input name="category" placeholder="Ex: Travões" required className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-500 transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Quantidade</label>
              <input name="quantity" type="number" placeholder="0" required className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-500 transition-colors" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Preço (€)</label>
              <input name="price" type="number" step="0.01" placeholder="0.00" required className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-500 transition-colors" />
            </div>
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={loading} className="h-10 w-full bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50">
              {loading ? "A processar..." : "Registar Peça"}
            </button>
          </div>
          <input name="minStock" type="hidden" defaultValue="5" />
        </form>
      </div>

      {/* TABELA DE INVENTÁRIO */}
      <div className="bg-[#09090b] border border-white/10 rounded-lg overflow-hidden">
        <div className="bg-[#101013] px-6 py-4 border-b border-white/10 flex items-center gap-2">
           <Package size={16} className="text-slate-400" />
           <h3 className="text-slate-200 font-semibold text-sm">Inventário</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#09090b] text-slate-500 text-xs font-medium border-b border-white/10">
                <th className="px-6 py-4">Artigo</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Quantidade</th>
                <th className="px-6 py-4">Preço (Un.)</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {products.map((p: any) => (
                <tr key={p.id} className="hover:bg-[#101013] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium text-sm">{p.name}</span>
                      <span className="text-xs text-slate-500 font-mono mt-0.5">SKU-{p.id.toString().padStart(5, '0')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                      {p.category}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${p.quantity <= p.minStock ? "text-amber-500" : "text-white"}`}>
                        {p.quantity} Un.
                      </span>
                      {p.quantity <= p.minStock && <AlertCircle size={14} className="text-amber-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-300">{Number(p.price).toFixed(2)}€</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-800 text-slate-500 hover:text-red-400 transition-colors rounded-md">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 text-sm">
                    Sem registos no inventário.
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