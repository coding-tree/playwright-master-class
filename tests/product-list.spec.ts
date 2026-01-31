import { test, expect } from "../src/fixtures/test-fixtures.js";

test.describe("Product List", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test("should display the products heading", async ({ productsPage }) => {
    await productsPage.expectHeading();
  });

  test("should list product cards", async ({ productsPage }) => {
    const card = productsPage.getProductCard(0);
    await card.expectName("Test Product");
  });

  test("should filter products by search term", async ({ productsPage }) => {
    await productsPage.search("Nonexistent");
    await productsPage.expectEmptyState();
  });

  test("should navigate to product detail", async ({ productsPage }) => {
    const card = productsPage.getProductCard(0);
    await card.view();
  });
});
