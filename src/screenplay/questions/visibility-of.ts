import type { Locator } from "@playwright/test";
import type { Actor, Answerable } from "../actor.js";

export class VisibilityOf implements Answerable<boolean> {
  private constructor(private readonly locator: Locator) {}

  static element(locator: Locator): VisibilityOf {
    return new VisibilityOf(locator);
  }

  async answeredBy(_actor: Actor): Promise<boolean> {
    return this.locator.isVisible();
  }
}
