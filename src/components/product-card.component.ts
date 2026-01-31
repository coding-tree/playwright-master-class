import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class ProductCardComponent {
  constructor(private readonly root: Locator) {}

  private get name() {
    return this.root.getByTestId("product-name");
  }

  private get price() {
    return this.root.getByTestId("product-price");
  }

  private get viewButton() {
    return this.root.getByRole("link", { name: "View" });
  }

  async expectName(name: string) {
    await expect(this.name).toHaveText(name);
  }

  async expectPrice(price: string) {
    await expect(this.price).toContainText(price);
  }

  async view() {
    await this.viewButton.click();
  }
}
