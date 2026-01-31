import { test, expect } from "../src/fixtures/test-fixtures.js";
import { sampleProduct, updatedProduct } from "../test-data/users.js";
import { Navigate } from "../src/screenplay/interactions/navigate.js";
import { ClickAddProduct } from "../src/screenplay/tasks/click-add-product.js";
import {
  FillProductForm,
  SaveProductForm,
} from "../src/screenplay/tasks/add-product.js";
import { DeleteProduct } from "../src/screenplay/tasks/delete-product.js";
import { BrowseTheWeb } from "../src/screenplay/abilities/browse-the-web.js";
import { productFormLocators } from "../src/locators/product-form.locators.js";

test.describe("Product CRUD", () => {
  test("should create a new product", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("./products"),
      ClickAddProduct.button(),
      FillProductForm.with(sampleProduct),
      SaveProductForm.now(),
    );

    const page = BrowseTheWeb.as(actor);
    await expect(productFormLocators(page).successMessage).toHaveText(
      "Product created",
    );
  });

  test("should read product details", async ({ actor }) => {
    await actor.attemptsTo(Navigate.to("./products/1"));

    const page = BrowseTheWeb.as(actor);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      sampleProduct.name,
    );
  });

  test("should update an existing product", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("./products/1"),
      FillProductForm.with(updatedProduct),
      SaveProductForm.now(),
    );

    const page = BrowseTheWeb.as(actor);
    await expect(productFormLocators(page).successMessage).toHaveText(
      "Product updated",
    );
  });

  test("should delete a product", async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to("./products/1"),
      DeleteProduct.onCurrentPage(),
    );

    const page = BrowseTheWeb.as(actor);
    await expect(productFormLocators(page).successMessage).toHaveText(
      "Product deleted",
    );
  });
});
