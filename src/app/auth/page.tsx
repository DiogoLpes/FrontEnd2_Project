"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Lock, Mail, Car, ArrowRight, ShieldCheck, User, 
  Phone, Eye, EyeOff, Check, X 
} from "lucide-react";
import { AuthSlider } from "./auth-slider";
import { registerUser } from "../_actions/auth"; 
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

// ========================================================
// 1. LÓGICA DE VALIDAÇÃO E CONFIGS
// ========================================================
const countryPrefixes = [
  { code: "+351", country: "PT" },
  { code: "+34", country: "ES" },
  { code: "+33", country: "FR" },
  { code: "+44", country: "UK" },
];

const validateEmail = (email: string) => {
  if (email.toLowerCase() === "admin") return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const getStrengthMetrics = (password: string) => {
  const checks = [
    { label: "8+ caracteres", passed: password.length >= 8 },
    { label: "Contém número", passed: /\d/.test(password) },
    { label: "Símbolo (!@#$)", passed: /[^A-Za-z0-9]/.test(password) },
    { label: "Letra Maiúscula", passed: /[A-Z]/.test(password) },
  ];
  const score = checks.filter(c => c.passed).length;
  return { score, checks };
};

// ========================================================
// 2. COMPONENTES REUTILIZÁVEIS
// ========================================================

function TerminalInput({ label, icon: Icon, error, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`bg-[#14171c] border ${error ? 'border-red-500/50' : 'border-white/5'} p-3 focus-within:border-blue-600 transition-all text-left relative`}>
        <p className={`text-[9px] font-black uppercase mb-1 ${error ? 'text-red-500' : 'text-blue-600'}`}>{label}</p>
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} className={error ? 'text-red-500/50' : 'text-slate-600'} />}
          <input {...props} className="bg-transparent w-full text-white text-xs outline-none font-bold placeholder:text-slate-700" />
        </div>
      </div>
      {error && <span className="text-[8px] text-red-500 font-bold uppercase italic">{error}</span>}
    </div>
  );
}

function PasswordStrengthDisplay({ password }: { password: string }) {
  if (!password) return null;
  const { score, checks } = getStrengthMetrics(password);
  const colors = ['#ef4444', '#f97316', '#eab308', '#2563eb'];
  
  return (
    <div className="space-y-3 pt-1 animate-in fade-in duration-300">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{ backgroundColor: step <= score ? colors[score - 1] : "rgba(255,255,255,0.05)" }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {checks.map((req, i) => (
          <div key={i} className="flex items-center gap-2">
            {req.passed ? <Check size={10} className="text-blue-600" strokeWidth={3} /> : <X size={10} className="text-slate-600" strokeWidth={3} />}
            <span className={`text-[9px] uppercase font-bold tracking-tight ${req.passed ? "text-white" : "text-slate-500"}`}>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================================
// 3. COMPONENTE PRINCIPAL
// ========================================================
function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", prefix: "+351", password: "", confirmPassword: ""
  });

  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsLogin(mode !== "register");
  }, [searchParams]);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev: any) => ({ ...prev, [field]: null }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ""); 
    if (val.length <= 9) updateField("phone", val); 
  };

  const toast = (title: string, text: string, icon: any) => {
    Swal.fire({ title, text, icon, background: "#0d0f14", color: "#fff", confirmButtonColor: "#2563eb", customClass: { popup: "border border-white/10" } });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!validateEmail(formData.email)) newErrors.email = "Utilizador ou Email Inválido";
    if (!isLogin) {
      if (!formData.name) newErrors.name = "Nome obrigatório";
      if (formData.phone.length < 7) newErrors.phone = "Número incompleto";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "As passwords não coincidem";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const res = await signIn("credentials", { 
      email: formData.email, 
      password: formData.password, 
      redirect: false 
    });

    if (res?.error) {
      toast("ERRO", "Acesso Negado. Verifique utilizador e password.", "error");
      setLoading(false);
    } else {
      toast("SUCESSO", "A entrar em TSPneus...", "success");
      router.refresh();
      const userMail = formData.email.toLowerCase();
      const destination = (userMail === "admin" || userMail === "admin@local.com") ? "/admin" : "/";
      setTimeout(() => {
        router.push(destination);
      }, 500);
    }
  };

  const onRegister = async () => {
    if (!validateForm()) return;
    const { score } = getStrengthMetrics(formData.password);
    if (score < 3) return toast("SEGURANÇA", "A password precisa de ser mais forte.", "warning");

    setLoading(true);
    try {
      // CONCATENA O PREFIXO ANTES DE ENVIAR
      const fullPhone = `${formData.prefix}${formData.phone}`;
      
      const res = await registerUser({
        ...formData,
        phone: fullPhone
      });
      
      if (res?.id) {
        const loginRes = await signIn("credentials", { 
          email: formData.email, 
          password: formData.password, 
          redirect: false 
        });

        if (loginRes?.error) {
          toast("AVISO", "Conta criada, faça login manualmente.", "warning");
          setIsLogin(true);
        } else {
          toast("BEM-VINDO", "Conta criada e sessão iniciada!", "success");
          router.refresh();
          setTimeout(() => { router.push("/"); }, 800);
        }
      }
    } catch (err: any) { 
      toast("ERRO NO SISTEMA", err.message, "error"); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-[#0d0f14] border border-white/5 shadow-2xl overflow-hidden">
      
      {/* PAINEL ESQUERDO */}
      <div className="hidden lg:flex lg:col-span-5 flex-col justify-center p-12 bg-[#080a0f] border-r border-white/5 relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rotate-3 border border-white/10">
            <Car className="text-white" size={20} />
          </div>
          <span className="text-xl font-black italic text-white uppercase tracking-tighter">TS <span className="text-blue-600">PNEUS</span></span>
        </div>
        <h1 className="text-5xl font-black uppercase italic leading-none text-white tracking-tighter">
          PORTAL <br /> <span className="text-blue-600 underline">PERFORMANCE</span>.
        </h1>
      </div>

      {/* PAINEL DIREITO */}
      <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center bg-[#0d0f14] min-h-[700px]">
        <AuthSlider isLogin={isLogin}>
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">{isLogin ? "Login" : "Registo"}</h2>
              <div className="h-0.5 w-12 bg-blue-600"></div>
            </div>
            
            <div className="space-y-4">
              {!isLogin && (
                <>
                  <TerminalInput label="Nome" icon={User} placeholder="Seu nome" value={formData.name} onChange={(e:any) => updateField("name", e.target.value)} error={errors.name} />
                  
                  {/* CAMPO TELEMÓVEL COM PREFIXO */}
                  <div className="flex flex-col gap-1">
                    <p className={`text-[9px] font-black uppercase mb-1 ${errors.phone ? 'text-red-500' : 'text-blue-600'}`}>Telemóvel Internacional</p>
                    <div className="flex gap-2">
                      <select 
                        value={formData.prefix}
                        onChange={(e) => updateField("prefix", e.target.value)}
                        className="bg-[#14171c] border border-white/5 p-3 text-white text-xs font-bold outline-none focus:border-blue-600 w-24 appearance-none"
                      >
                        {countryPrefixes.map(p => (
                          <option key={p.code} value={p.code} className="bg-[#0d0f14]">{p.country} ({p.code})</option>
                        ))}
                      </select>
                      <div className={`flex-1 bg-[#14171c] border ${errors.phone ? 'border-red-500/50' : 'border-white/5'} p-3 focus-within:border-blue-600 transition-all flex items-center gap-2`}>
                        <Phone size={14} className="text-slate-600" />
                        <input 
                          type="tel"
                          placeholder="Número"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className="bg-transparent w-full text-white text-xs outline-none font-bold placeholder:text-slate-700"
                        />
                      </div>
                    </div>
                    {errors.phone && <span className="text-[8px] text-red-500 font-bold uppercase italic">{errors.phone}</span>}
                  </div>
                </>
              )}

              <TerminalInput 
                label="Email" 
                icon={Mail} 
                type="text"
                placeholder="Seu email" 
                value={formData.email} 
                onChange={(e:any) => updateField("email", e.target.value)} 
                error={errors.email} 
              />

              <div className="relative">
                <TerminalInput label="Palavra-passe" icon={Lock} type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={(e:any) => updateField("password", e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-8 text-slate-600 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {!isLogin && (
                <div className="space-y-4 animate-in slide-in-from-bottom-2">
                  <TerminalInput label="Confirmar palavra-passe" icon={ShieldCheck} type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.confirmPassword} onChange={(e:any) => updateField("confirmPassword", e.target.value)} error={errors.confirmPassword} />
                  <PasswordStrengthDisplay password={formData.password} />
                </div>
              )}
            </div>

            <button onClick={isLogin ? onLogin : onRegister} disabled={loading} className="w-full bg-blue-600 hover:bg-white text-white hover:text-black p-5 font-black uppercase italic tracking-tighter transition-all flex items-center justify-center gap-4 group disabled:opacity-50">
              {loading ? "A PROCESSAR..." : isLogin ? "INICIAR SESSÃO" : "REGISTAR"} <ArrowRight size={20} className="group-hover:translate-x-1" />
            </button>

            <p className="text-center text-slate-500 font-bold uppercase text-[10px] tracking-widest cursor-pointer hover:text-blue-600 transition-colors" onClick={() => { setIsLogin(!isLogin); setErrors({}); }}>
              {isLogin ? "Não tem conta? Criar acesso aqui" : "Já possui conta? Entrar em TS Pneus"}
            </p>
          </div>
        </AuthSlider>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070a] p-4 font-sans">
      <Suspense fallback={<div className="text-blue-600 italic font-black animate-pulse">BOOTING...</div>}>
        <AuthContent />
      </Suspense>
    </div>
  );
}