"use client";

import { useState } from "react";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Lógica de registro aqui
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Input */}
      <div>
        <label className="block text-white font-black uppercase text-sm mb-2 tracking-wider">Nome Completo</label>
        <div className="relative">
          <User className="absolute left-4 top-3.5 text-primary w-5 h-5" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
            className="w-full bg-slate-800 border-2 border-slate-700 pl-12 pr-4 py-2.5 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
            required
          />
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-white font-black uppercase text-sm mb-2 tracking-wider">Email</label>
        <div className="relative">
          <Mail className="absolute left-4 top-3.5 text-primary w-5 h-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            className="w-full bg-slate-800 border-2 border-slate-700 pl-12 pr-4 py-2.5 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
            required
          />
        </div>
      </div>

      {/* Phone Input */}
      <div>
        <label className="block text-white font-black uppercase text-sm mb-2 tracking-wider">Telemóvel</label>
        <div className="relative">
          <Phone className="absolute left-4 top-3.5 text-primary w-5 h-5" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+351 9XX XXX XXX"
            className="w-full bg-slate-800 border-2 border-slate-700 pl-12 pr-4 py-2.5 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-white font-black uppercase text-sm mb-2 tracking-wider">Palavra-passe</label>
        <div className="relative">
          <Lock className="absolute left-4 top-3.5 text-primary w-5 h-5" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full bg-slate-800 border-2 border-slate-700 pl-12 pr-4 py-2.5 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
            required
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-white font-black uppercase text-sm mb-2 tracking-wider">Confirmar Palavra-passe</label>
        <div className="relative">
          <Lock className="absolute left-4 top-3.5 text-primary w-5 h-5" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full bg-slate-800 border-2 border-slate-700 pl-12 pr-4 py-2.5 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
            required
          />
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 rounded bg-slate-800 border-slate-700 accent-primary" required />
        <span className="text-slate-400 text-sm font-medium">Concordo com os <span className="text-primary font-black">Termos de Serviço</span></span>
      </label>

      {/* Submit Button */}
      <Button 
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-primary text-black font-black uppercase italic text-base rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-3 mt-6"
      >
        {loading ? "Criando conta..." : (
          <>
            <span>Registrar-se</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </Button>
    </form>
  );
}