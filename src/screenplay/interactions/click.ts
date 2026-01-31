import type { Locator } from "@playwright/test";
import type { Actor, Performable } from "../actor.js";

export class Click implements Performable {
  private constructor(private readonly locator: Locator) {}

  static on(locator: Locator): Click {
    return new Click(locator);
  }

  async performAs(_actor: Actor): Promise<void> {
    await this.locator.click();
  }
}
