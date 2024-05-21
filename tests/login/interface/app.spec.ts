import { test, expect } from '@playwright/test';
import { LoginPage } from './ui.interface';
import { user } from '../data/user.data';

/*test('Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navega a la página de inicio de sesión
    await loginPage.goto();

    // Utiliza el primer usuario en los datos de usuario para el inicio de sesión
    const { username, password } = user[3];

    // Realiza el login
    await loginPage.login(username, password);

    // Verifica que el login fue exitoso
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});*/


test('Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navega a la página de inicio de sesión
    await loginPage.goto();

    // Ciclo sobre cada usuario
    for (const { username, password } of user) {
        // Realiza el login
        await loginPage.login(username, password);

        if (username == 'admin' && password == 'serenity') {
            // Verifica que el login fue exitoso
            await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
        } else {
            // Verifica que el login falló
            await expect(page.locator('.toast-message')).toBeVisible();
        }

        // Navega de nuevo para el siguiente intento de login
        await loginPage.goto();
    }
});