"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Lógica de autenticação aqui
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div>
        <label className="block text-white font-black uppercase text-sm mb-3 tracking-wider">Email</label>
        <div className="relative">
          <Mail className="absolute left-4 top-4 text-primary w-5 h-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full bg-slate-800 border-2 border-slate-700 pl-12 pr-4 py-3 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-white font-black uppercase text-sm mb-3 tracking-wider">Palavra-passe</label>
        <div className="relative">
          <Lock className="absolute left-4 top-4 text-primary w-5 h-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-slate-800 border-2 border-slate-700 pl-12 pr-4 py-3 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded bg-slate-800 border-slate-700 accent-primary" />
          <span className="text-slate-400 text-sm font-medium">Lembrar-me</span>
        </label>
        <Link href="/auth/forgot-password" className="text-primary text-sm font-black hover:text-yellow-400 transition-colors">
          Esqueceu a palavra-passe?
        </Link>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-primary text-black font-black uppercase italic text-lg rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-3"
      >
        {loading ? "Carregando..." : (
          <>
            <span>Entrar</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </Button>
    </form>
  );
}