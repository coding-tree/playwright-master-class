import type { Page } from "@playwright/test";
import type { Actor } from "../actor.js";

const ABILITY_KEY = "BrowseTheWeb";

export class BrowseTheWeb {
  private constructor(private readonly page: Page) {}

  static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  static as(actor: Actor): Page {
    return actor.getAbility<BrowseTheWeb>(ABILITY_KEY).page;
  }

  grantTo(actor: Actor): void {
    actor.addAbility(ABILITY_KEY, this);
  }
}
