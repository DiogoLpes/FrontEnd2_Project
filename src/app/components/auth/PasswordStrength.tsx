import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements = [
    { label: "Pelo menos 8 caracteres", test: (p: string) => p.length >= 8 },
    { label: "Contém um número", test: (p: string) => /\d/.test(p) },
    { label: "Símbolo especial (!@#$%^&*)", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
    { label: "Letra maiúscula", test: (p: string) => /[A-Z]/.test(p) },
  ];

  const strength = requirements.filter((req) => req.test(password)).length;

  const getStrengthColor = () => {
    if (strength === 0) return "bg-muted";
    if (strength <= 2) return "bg-destructive";
    if (strength === 3) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <div className="space-y-3 pt-1">
      {/* Barras de progresso */}
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              step <= strength ? getStrengthColor() : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Checklist de requisitos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
        {requirements.map((req, index) => {
          const isMet = req.test(password);
          return (
            <div key={index} className="flex items-center gap-2">
              <div className={`p-0.5 rounded-full ${isMet ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>
                {isMet ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-tight ${isMet ? "text-foreground" : "text-muted-foreground"}`}>
                {req.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}