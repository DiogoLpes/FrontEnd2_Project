"use client";

import { LoginForm } from "@/app/components/auth/login-form";
import { AuthCard } from "@/app/components/auth/auth-card";

export default function LoginPage() {
  return (
    <AuthCard 
      title="Acesso TSPneus"
      subtitle="Bem-vindo à sua garagem digital"
      linkText="Não tem conta? Registre-se"
      linkHref="/auth/register"
    >
      <LoginForm />
    </AuthCard>
  );
}