import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page.js";
import { ProductsPage } from "../pages/products.page.js";
import { ProductDetailPage } from "../pages/product-detail.page.js";

type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
});

export { expect } from "@playwright/test";
