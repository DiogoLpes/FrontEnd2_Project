import { test, expect } from '@playwright/test';

// 1. Teste de Acesso à Homepage
test('homepage deve ter o título correto', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/TS PNEUS/);
});

// 2. Teste de Redirecionamento de Auth se não autenticado
test('admin page deve redirecionar cliente não autenticado', async ({ page }) => {
  await page.goto('/admin/agendamentos');
  
  // O NextAuth deve redirecionar para a página configurada de login
  await expect(page).toHaveURL(/.*auth\/login/);
});

// Nota: Testes completos de E2E exigiriam a configuração de DB test database local
// e mock do estado de NextAuth.
