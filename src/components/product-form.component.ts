import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { productFormLocators } from "../locators/product-form.locators.js";

export class ProductFormComponent {
  private _locators?: ReturnType<typeof productFormLocators>;

  constructor(private readonly page: Page) {}

  private get locators() {
    return (this._locators ??= productFormLocators(this.page));
  }

  async fill(data: { name?: string; description?: string; price?: string }) {
    if (data.name !== undefined) {
      await this.locators.nameInput.clear();
      await this.locators.nameInput.fill(data.name);
    }
    if (data.description !== undefined) {
      await this.locators.descriptionInput.clear();
      await this.locators.descriptionInput.fill(data.description);
    }
    if (data.price !== undefined) {
      await this.locators.priceInput.clear();
      await this.locators.priceInput.fill(data.price);
    }
  }

  async save() {
    await this.locators.saveButton.click();
  }

  async cancel() {
    await this.locators.cancelButton.click();
  }

  async delete() {
    await this.locators.deleteButton.click();
    await this.locators.confirmDeleteButton.click();
  }

  async expectSuccess(message: string) {
    await expect(this.locators.successMessage).toHaveText(message);
  }

  async expectError(message: string) {
    await expect(this.locators.errorMessage).toHaveText(message);
  }
}
