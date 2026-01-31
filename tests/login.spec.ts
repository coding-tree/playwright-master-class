import { test, expect } from "../src/fixtures/test-fixtures.js";
import { validUser, invalidUser } from "../test-data/users.js";
import { Navigate } from "../src/screenplay/interactions/navigate.js";
import { Login } from "../src/screenplay/tasks/login.js";
import { BrowseTheWeb } from "../src/screenplay/abilities/browse-the-web.js";
import { loginLocators } from "../src/locators/login.locators.js";

test.describe("Login", () => {
  test.beforeEach(async ({ actor }) => {
    await actor.attemptsTo(Navigate.to("./login"));
  });

  test("should log in with valid credentials", async ({ actor }) => {
    await actor.attemptsTo(
      Login.withCredentials(validUser.username, validUser.password),
    );

    const page = BrowseTheWeb.as(actor);
    await expect(page).toHaveURL(/\/products$/);
  });

  test("should show error with invalid credentials", async ({ actor }) => {
    await actor.attemptsTo(
      Login.withCredentials(invalidUser.username, invalidUser.password),
    );

    const page = BrowseTheWeb.as(actor);
    await expect(loginLocators(page).errorMessage).toHaveText(
      "Invalid username or password",
    );
  });

  test("should show error when fields are empty", async ({ actor }) => {
    await actor.attemptsTo(Login.withCredentials("", ""));

    const page = BrowseTheWeb.as(actor);
    await expect(loginLocators(page).errorMessage).toHaveText(
      "Username and password are required",
    );
  });
});
