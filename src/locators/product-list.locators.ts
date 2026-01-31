import type { Page } from "@playwright/test";

export const productListLocators = (page: Page) => ({
  heading: page.getByRole("heading", { name: "Products" }),
  searchInput: page.getByRole("searchbox", { name: "Search products" }),
  productCards: page.getByTestId("product-card"),
  addProductButton: page.getByRole("button", { name: "Add Product" }),
  emptyState: page.getByText("No products found"),
});
