import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class NavbarComponent {
  constructor(private readonly page: Page) {}

  private get productsLink() {
    return this.page.getByRole("link", { name: "Products" });
  }

  private get logoutButton() {
    return this.page.getByRole("button", { name: "Logout" });
  }

  private get usernameDisplay() {
    return this.page.getByTestId("navbar-username");
  }

  async navigateToProducts() {
    await this.productsLink.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async expectUsername(username: string) {
    await expect(this.usernameDisplay).toHaveText(username);
  }
}
