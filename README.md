# TS PNEUS | Plataforma de Gestão 🚙🛠️

Plataforma premium para gestão de oficina e marcações (Orçamentos, Agendamentos, Utilizadores e Veículos), construída com Next.js 14, desenhada para providenciar uma experiência de dashboard rápida e profissional.

---

## 📌 Requisitos e Stack Tecnológico (Concluídos)

1. **Next.js & Server Components (App Router)**
   - O projeto está estruturado transversalmente sob o paradigma `src/app`.

2. **TypeScript**
   - Implementado para garantir segurança estática (interfaces, tipagem na API e nos componentes de UI globais).

3. **Hooks (React)**
   - Utilização intensiva e contextual de `useState` e `useEffect` em Server e Client components (Ex: Mapeamento de Frotas, Tabelas reativas de clientes, Controlos em modals).

4. **Styling (TailwindCSS Vanilla)**
   - Customizações em `globals.css` que potenciam o aspeto dark premium (uso da cor `#05070a`, acentuações luminosas `#2563eb`, glassmorphism dinâmico, layouts expansivos).

5. **Autenticação (NextAuth.js)**
   - Implementação da biblioteca NextAuth com `PrismaAdapter` a controlar a tabela `User` / `Session` (Ver `src/app/api/auth/[...nextauth]` e `Providers` globais).

6. **SEO (Search Engine Optimization)**
   - Títulos dinâmicos e metadata (`layout.tsx`).

7. **CRUD API + Actions (Prisma x PostgreSQL)**
   - Base de dados Postgres mapeada com Prisma ORM (`@prisma/client`).
   - Route handlers e Server Actions para listar Agendamentos, Inserir Veículos, e Modificar Status (`findFirst`, `findMany` com relacionamentos `include`).

8. **Navigation (Next/Navigation)**
   - Uso de `useRouter`, páginas separadas entre `/dashboard` (Cliente) e `/admin` (Colaboradores).

9. **Responsive Design**
   - Modais responsivos (`max-w-md` a `max-w-4xl`), Grelhas modulares ajustáveis.

10. **Hosting Ready**
    - Vercel-ready (Scripts de `postinstall` preparados com suporte `Turbopack`).

11. **Bónus**
    - **Framer Motion**: Integrações e setups previstos via pacotes.
    - **SweetAlert2 Global**: Avisos costumizados em `src/app/lib/swal.ts`.

---

## 🚦 Roadmap / Em Falta

Os seguintes itens ainda necessitam de implementação ou polimento final:

- [ ] **Sitemaps / Robots.txt Estruturado:** Expor `/app/sitemap.ts` (ou `robots.txt`) para melhor indexação e Web Crawlers orgânicos.
- [ ] **ContextAPI / React Query:** Gerenciamento escalável de estado caso a aplicação aumente de complexidade fora do âmbito local/próprio das páginas.
- [ ] **Integração de Notificações Ativas:** Disparar emails automáticos aquando da aprovação do "Orçamento" ou finalização por via do Next Resend.
- [ ] **Suite E2E Testing:** Aplicar testes unitários para o frontend (Cypress UI ou Playwright).



