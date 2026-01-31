import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { loginLocators } from "../locators/login.locators.js";

export class LoginFormComponent {
  private _locators?: ReturnType<typeof loginLocators>;

  constructor(private readonly page: Page) {}

  private get locators() {
    return (this._locators ??= loginLocators(this.page));
  }

  async login(username: string, password: string) {
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.submitButton.click();
  }

  async expectError(message: string) {
    await expect(this.locators.errorMessage).toHaveText(message);
  }
}
