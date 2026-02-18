"use client";

import { RegisterForm } from "@/app/components/auth/register-form";
import { AuthCard } from "@/app/components/auth/auth-card";

export default function RegisterPage() {
  return (
    <AuthCard 
      title="Criar Conta TSPneus"
      subtitle="Junte-se à comunidade de veículos de performance"
      linkText="Já tem conta? Faça login"
      linkHref="/auth/login"
    >
      <RegisterForm />
    </AuthCard>
  );
}