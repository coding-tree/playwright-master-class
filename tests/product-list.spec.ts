import { test, expect } from "../src/fixtures/test-fixtures.js";
import { Navigate } from "../src/screenplay/interactions/navigate.js";
import { SearchProducts } from "../src/screenplay/tasks/search-products.js";
import { ViewProductCard } from "../src/screenplay/tasks/view-product-card.js";
import { BrowseTheWeb } from "../src/screenplay/abilities/browse-the-web.js";
import { productListLocators } from "../src/locators/product-list.locators.js";

test.describe("Product List", () => {
  test.beforeEach(async ({ actor }) => {
    await actor.attemptsTo(Navigate.to("./products"));
  });

  test("should display the products heading", async ({ actor }) => {
    const page = BrowseTheWeb.as(actor);
    await expect(productListLocators(page).heading).toBeVisible();
  });

  test("should list product cards", async ({ actor }) => {
    const page = BrowseTheWeb.as(actor);
    const locators = productListLocators(page);
    const firstCard = locators.productCards.nth(0);
    await expect(firstCard.getByTestId("product-name")).toHaveText(
      "Test Product",
    );
  });

  test("should filter products by search term", async ({ actor }) => {
    await actor.attemptsTo(SearchProducts.byTerm("Nonexistent"));

    const page = BrowseTheWeb.as(actor);
    await expect(productListLocators(page).emptyState).toBeVisible();
  });

  test("should navigate to product detail", async ({ actor }) => {
    await actor.attemptsTo(ViewProductCard.atIndex(0));
  });
});
