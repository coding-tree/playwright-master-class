import type { Locator, Page } from "@playwright/test";

export type ProductFormLocators = {
  nameInput: Locator;
  descriptionInput: Locator;
  priceInput: Locator;
  saveButton: Locator;
  cancelButton: Locator;
  deleteButton: Locator;
  confirmDeleteButton: Locator;
  successMessage: Locator;
  errorMessage: Locator;
};

export function productFormLocators(page: Page): ProductFormLocators {
  return ({
    nameInput: page.getByRole("textbox", { name: "Product name" }),
    descriptionInput: page.getByRole("textbox", { name: "Description" }),
    priceInput: page.getByRole("spinbutton", { name: "Price" }),
    saveButton: page.getByRole("button", { name: "Save" }),
    cancelButton: page.getByRole("button", { name: "Cancel" }),
    deleteButton: page.getByRole("button", { name: "Delete" }),
    confirmDeleteButton: page.getByRole("button", { name: "Confirm" }),
    successMessage: page.getByTestId("form-success"),
    errorMessage: page.getByTestId("form-error"),
  });
}
