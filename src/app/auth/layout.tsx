import { AuthSlider } from "../components/auth/auth-transition";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#05070a] overflow-hidden">
      {/* LADO ESQUERDO (Logo e Texto) - Fica Estático */}
      <div className="hidden lg:flex lg:col-span-4 p-12 flex-col justify-between border-r-2 border-blue-600/20 bg-garage-texture">
         {/* ... o conteúdo da logo que fizemos antes ... */}
      </div>

      {/* LADO DIREITO (Formulários) - Tem a Transição */}
      <div className="lg:col-span-8 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-xl z-10">
          <AuthSlider isLogin={true}>
            {children}
          </AuthSlider>
        </div>
      </div>
    </div>
  );
}