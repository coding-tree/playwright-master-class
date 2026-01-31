import type { Actor, Performable } from "../actor.js";
import { BrowseTheWeb } from "../abilities/browse-the-web.js";
import { productListLocators } from "../../locators/product-list.locators.js";
import { Fill } from "../interactions/fill.js";

export class SearchProducts implements Performable {
  private constructor(private readonly term: string) {}

  static byTerm(term: string): SearchProducts {
    return new SearchProducts(term);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = BrowseTheWeb.as(actor);
    const locators = productListLocators(page);

    await actor.attemptsTo(Fill.field(locators.searchInput, this.term));
  }
}
