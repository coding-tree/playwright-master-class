import type { Actor, Performable } from "../actor.js";
import { BrowseTheWeb } from "../abilities/browse-the-web.js";
import { productFormLocators } from "../../locators/product-form.locators.js";
import { Fill } from "../interactions/fill.js";
import { Click } from "../interactions/click.js";

type ProductData = { name?: string; description?: string; price?: string };

export class FillProductForm implements Performable {
  private constructor(private readonly data: ProductData) {}

  static with(data: ProductData): FillProductForm {
    return new FillProductForm(data);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = BrowseTheWeb.as(actor);
    const locators = productFormLocators(page);
    const steps: Performable[] = [];

    if (this.data.name !== undefined) {
      steps.push(Fill.field(locators.nameInput, this.data.name).clearing());
    }
    if (this.data.description !== undefined) {
      steps.push(
        Fill.field(locators.descriptionInput, this.data.description).clearing(),
      );
    }
    if (this.data.price !== undefined) {
      steps.push(Fill.field(locators.priceInput, this.data.price).clearing());
    }

    await actor.attemptsTo(...steps);
  }
}

export class SaveProductForm implements Performable {
  private constructor() {}

  static now(): SaveProductForm {
    return new SaveProductForm();
  }

  async performAs(actor: Actor): Promise<void> {
    const page = BrowseTheWeb.as(actor);
    const locators = productFormLocators(page);
    await actor.attemptsTo(Click.on(locators.saveButton));
  }
}
