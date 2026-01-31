import type { Actor, Performable } from "../actor.js";
import { BrowseTheWeb } from "../abilities/browse-the-web.js";
import { productListLocators } from "../../locators/product-list.locators.js";
import { Click } from "../interactions/click.js";

export class ViewProductCard implements Performable {
  private constructor(private readonly index: number) {}

  static atIndex(index: number): ViewProductCard {
    return new ViewProductCard(index);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = BrowseTheWeb.as(actor);
    const locators = productListLocators(page);
    const card = locators.productCards.nth(this.index);

    await actor.attemptsTo(
      Click.on(card.getByRole("link", { name: "View" })),
    );
  }
}
