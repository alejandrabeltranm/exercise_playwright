import {Page} from '@playwright/test';

export interface ILoginPage{
    goto():Promise<void>;
    enterUsername(username:string):Promise<void>;
    enterPassword(password:string):Promise<void>;
    sumbit():Promise<void>;
    login(username:string, password:string):Promise<void>;
}


export class LoginPage implements ILoginPage{
    private page: Page;
    constructor(page: Page){
        this.page=page;
    }

    async goto(): Promise<void> {
        await this.page.goto('https://demo.serenity.is/')
    }

    async enterUsername(username: string): Promise<void> {
        await this.page.fill('input[name="Username"]', username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.fill('input[name="Password"]', password);
    }

    async sumbit(): Promise<void> {
        await this.page.click('button[type="submit"]');
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.sumbit();
    }
}