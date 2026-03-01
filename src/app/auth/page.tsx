"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, Mail, Car, ArrowRight, ShieldCheck, User, Phone, CheckCircle2 } from "lucide-react";
import { AuthSlider } from "./auth-slider";
import { registerUser } from "../Actions/auth"; 
import { signIn } from "next-auth/react";

function AuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  
  // ESTADOS PARA CAPTURAR OS DADOS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "register") setIsLogin(false);
    else if (mode === "login") setIsLogin(true);
  }, [searchParams]);

  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert("Erro: Credenciais inválidas.");
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !plate) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({ name, email, password, plate, phone });
      if (res && res.id) {
        alert("Conta criada com sucesso!");
        setIsLogin(true); 
      }
    } catch (err) {
      alert(`Erro: ${err instanceof Error ? err.message : "Falha no servidor"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-[#0d0f14] border border-white/5 shadow-2xl relative z-10 overflow-hidden">
      
      {/* BRANDING */}
      <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-[#080a0f] border-r border-white/5 relative">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rotate-3 border border-white/10">
              <Car className="-rotate-3 text-white" size={20} />
            </div>
            <span className="text-xl font-black italic text-white uppercase tracking-tighter">
              TS <span className="text-blue-600">PNEUS</span>
            </span>
          </div>
          <h1 className="text-5xl font-black uppercase italic leading-[0.85] text-white tracking-tighter mb-6">
            SISTEMA <br /> DE <span className="text-blue-600">GESTÃO</span> <br /> PERFORMANCE.
          </h1>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-blue-600" /> Acesso Encriptado
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <CheckCircle2 size={14} className="text-blue-600" /> Histórico de Revisões
            </div>
          </div>
        </div>
      </div>

      {/* FORMULÁRIOS - Altura aumentada para 850px para não cortar a placa */}
      <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center min-h-[850px] bg-[#0d0f14]">
        <AuthSlider isLogin={isLogin}>
          {isLogin ? (
            /* --- LOGIN --- */
            <div className="space-y-8 text-left animate-in fade-in duration-500">
              <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Login</h2>
              <div className="space-y-4">
                <div className="bg-[#14171c] border border-white/5 p-4 focus-within:border-blue-600">
                  <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Email</p>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-slate-600" />
                    <input 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent w-full text-white outline-none font-bold" 
                      placeholder="GERAL@EXEMPLO.PT" 
                    />
                  </div>
                </div>
                <div className="bg-[#14171c] border border-white/5 p-4 focus-within:border-blue-600">
                  <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Password</p>
                  <div className="flex items-center gap-3">
                    <Lock size={16} className="text-slate-600" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent w-full text-white outline-none font-bold" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>
              </div>
              <button 
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 text-white p-5 font-black uppercase italic hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group"
              >
                {loading ? "A ENTRAR..." : "ENTRAR NO TERMINAL"} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setIsLogin(false)} className="text-blue-600 text-[10px] font-bold uppercase tracking-widest w-full text-center hover:underline">
                Ainda não tem conta? Criar Acesso aqui
              </button>
            </div>
          ) : (
            /* --- REGISTO COM PLACA AMARELA --- */
            <div className="space-y-6 text-left animate-in fade-in duration-500">
              <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Novo Registo</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#14171c] border border-white/5 p-3 focus-within:border-blue-600">
                  <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Nome Completo</p>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-600" />
                    <input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent w-full text-white text-xs outline-none font-bold uppercase" 
                      placeholder="NOME" 
                    />
                  </div>
                </div>
                <div className="bg-[#14171c] border border-white/5 p-3 focus-within:border-blue-600">
                  <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Telemóvel</p>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-600" />
                    <input 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-transparent w-full text-white text-xs outline-none font-bold" 
                      placeholder="912 345 678" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#14171c] border border-white/5 p-3 focus-within:border-blue-600">
                <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Email Principal</p>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-slate-600" />
                  <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent w-full text-white text-xs outline-none font-bold" 
                    placeholder="CLIENTE@EMAIL.COM" 
                  />
                </div>
              </div>

              <div className="bg-[#14171c] border border-white/5 p-3 focus-within:border-blue-600">
                <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Password</p>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent w-full text-white text-xs outline-none font-bold" 
                  placeholder="••••••••" 
                />
              </div>

              {/* DESIGN DA PLACA AMARELA RECUPERADO */}
              <div className="bg-yellow-400 p-1 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] rotate-1">
                <div className="bg-white border-2 border-black p-3 text-center">
                  <p className="text-[9px] font-black text-black/40 uppercase mb-1">Identificação do Veículo (Matrícula)</p>
                  <input 
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                    className="bg-transparent w-full text-center text-2xl font-mono font-black text-black outline-none uppercase" 
                    placeholder="00-AA-00" 
                  />
                </div>
              </div>

              <button 
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-white text-black p-5 font-black uppercase italic hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-4 group"
              >
                {loading ? "A PROCESSAR..." : "CRIAR ACESSO DIGITAL"} <ShieldCheck size={20} />
              </button>

              <button onClick={() => setIsLogin(true)} className="text-blue-600 text-[10px] font-bold uppercase tracking-widest w-full text-center hover:underline">
                Já tem acesso? Fazer Login aqui
              </button>
            </div>
          )}
        </AuthSlider>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05070a]" />}>
      <AuthContent />
    </Suspense>
  );
}