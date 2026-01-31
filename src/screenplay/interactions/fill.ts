import type { Locator } from "@playwright/test";
import type { Actor, Performable } from "../actor.js";

export class Fill implements Performable {
  private shouldClearFirst = false;

  private constructor(
    private readonly locator: Locator,
    private readonly value: string,
  ) {}

  static field(locator: Locator, value: string): Fill {
    return new Fill(locator, value);
  }

  clearing(): Fill {
    this.shouldClearFirst = true;
    return this;
  }

  async performAs(_actor: Actor): Promise<void> {
    if (this.shouldClearFirst) {
      await this.locator.clear();
    }
    await this.locator.fill(this.value);
  }
}
