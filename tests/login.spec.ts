import { test, expect } from "../src/fixtures/test-fixtures.js";
import { validUser, invalidUser } from "../test-data/users.js";

test.describe("Login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test("should log in with valid credentials", async ({ loginPage }) => {
    await loginPage.login(validUser.username, validUser.password);
    await loginPage.expectRedirectTo("/products");
  });

  test("should show error with invalid credentials", async ({ loginPage }) => {
    await loginPage.login(invalidUser.username, invalidUser.password);
    await loginPage.expectError("Invalid username or password");
  });

  test("should show error when fields are empty", async ({ loginPage }) => {
    await loginPage.login("", "");
    await loginPage.expectError("Username and password are required");
  });
});
