import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { NavbarComponent } from "../components/navbar.component.js";
import { ProductFormComponent } from "../components/product-form.component.js";

export class ProductDetailPage {
  private _navbar?: NavbarComponent;
  private _form?: ProductFormComponent;

  constructor(private readonly page: Page) {}

  get navbar() {
    return (this._navbar ??= new NavbarComponent(this.page));
  }

  get form() {
    return (this._form ??= new ProductFormComponent(this.page));
  }

  private get heading() {
    return this.page.getByRole("heading", { level: 1 });
  }

  async goto(id: string) {
    await this.page.goto(`/products/${id}`);
  }

  async expectHeading(name: string) {
    await expect(this.heading).toHaveText(name);
  }
}
