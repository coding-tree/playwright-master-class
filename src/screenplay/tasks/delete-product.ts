import type { Actor, Performable } from "../actor.js";
import { BrowseTheWeb } from "../abilities/browse-the-web.js";
import { productFormLocators } from "../../locators/product-form.locators.js";
import { Click } from "../interactions/click.js";

export class DeleteProduct implements Performable {
  private constructor() {}

  static onCurrentPage(): DeleteProduct {
    return new DeleteProduct();
  }

  async performAs(actor: Actor): Promise<void> {
    const page = BrowseTheWeb.as(actor);
    const locators = productFormLocators(page);

    await actor.attemptsTo(
      Click.on(locators.deleteButton),
      Click.on(locators.confirmDeleteButton),
    );
  }
}
