import { test, expect } from "../src/fixtures/test-fixtures.js";
import { sampleProduct, updatedProduct } from "../test-data/users.js";

test.describe("Product CRUD", () => {
  test("should create a new product", async ({ productsPage, productDetailPage }) => {
    await productsPage.goto();
    await productsPage.clickAddProduct();

    await productDetailPage.form.fill(sampleProduct);
    await productDetailPage.form.save();
    await productDetailPage.form.expectSuccess("Product created");
  });

  test("should read product details", async ({ productDetailPage }) => {
    await productDetailPage.goto("1");
    await productDetailPage.expectHeading(sampleProduct.name);
  });

  test("should update an existing product", async ({ productDetailPage }) => {
    await productDetailPage.goto("1");

    await productDetailPage.form.fill(updatedProduct);
    await productDetailPage.form.save();
    await productDetailPage.form.expectSuccess("Product updated");
  });

  test("should delete a product", async ({ productDetailPage }) => {
    await productDetailPage.goto("1");
    await productDetailPage.form.delete();
    await productDetailPage.form.expectSuccess("Product deleted");
  });
});
