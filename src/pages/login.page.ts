import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { LoginFormComponent } from "../components/login-form.component.js";

export class LoginPage {
  readonly loginForm: LoginFormComponent;

  constructor(private readonly page: Page) {
    this.loginForm = new LoginFormComponent(page);
  }

  async goto() {
    await this.page.goto("./login");
  }

  async login(username: string, password: string) {
    await this.loginForm.login(username, password);
  }

  async expectError(message: string) {
    await this.loginForm.expectError(message);
  }

  async expectRedirectTo(path: string) {
    await expect(this.page).toHaveURL(new RegExp(`${path}$`));
  }
}
