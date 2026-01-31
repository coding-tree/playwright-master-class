import type { Page } from "@playwright/test";

export const loginLocators = (page: Page) => ({
  usernameInput: page.getByRole("textbox", { name: "Username" }),
  passwordInput: page.getByRole("textbox", { name: "Password" }),
  submitButton: page.getByRole("button", { name: "Sign in" }),
  errorMessage: page.getByTestId("login-error"),
});
