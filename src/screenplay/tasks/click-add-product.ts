import type { Actor, Performable } from "../actor.js";
import { BrowseTheWeb } from "../abilities/browse-the-web.js";
import { productListLocators } from "../../locators/product-list.locators.js";
import { Click } from "../interactions/click.js";

export class ClickAddProduct implements Performable {
  private constructor() {}

  static button(): ClickAddProduct {
    return new ClickAddProduct();
  }

  async performAs(actor: Actor): Promise<void> {
    const page = BrowseTheWeb.as(actor);
    const locators = productListLocators(page);

    await actor.attemptsTo(Click.on(locators.addProductButton));
  }
}
