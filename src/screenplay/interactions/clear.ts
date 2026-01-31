import type { Locator } from "@playwright/test";
import type { Actor, Performable } from "../actor.js";

export class Clear implements Performable {
  private constructor(private readonly locator: Locator) {}

  static field(locator: Locator): Clear {
    return new Clear(locator);
  }

  async performAs(_actor: Actor): Promise<void> {
    await this.locator.clear();
  }
}
