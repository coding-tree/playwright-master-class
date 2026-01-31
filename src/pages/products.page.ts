import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { productListLocators } from "../locators/product-list.locators.js";
import { NavbarComponent } from "../components/navbar.component.js";
import { ProductCardComponent } from "../components/product-card.component.js";

export class ProductsPage {
  private _navbar?: NavbarComponent;
  private _locators?: ReturnType<typeof productListLocators>;

  constructor(private readonly page: Page) {}

  get navbar() {
    return (this._navbar ??= new NavbarComponent(this.page));
  }

  private get locators() {
    return (this._locators ??= productListLocators(this.page));
  }

  async goto() {
    await this.page.goto("./products");
  }

  async expectHeading() {
    await expect(this.locators.heading).toBeVisible();
  }

  async search(term: string) {
    await this.locators.searchInput.fill(term);
  }

  async expectProductCount(count: number) {
    await expect(this.locators.productCards).toHaveCount(count);
  }

  async expectEmptyState() {
    await expect(this.locators.emptyState).toBeVisible();
  }

  getProductCard(index: number) {
    return new ProductCardComponent(this.locators.productCards.nth(index));
  }

  async clickAddProduct() {
    await this.locators.addProductButton.click();
  }
}
