import type { Locator } from "@playwright/test";
import type { Actor, Answerable } from "../actor.js";

export class CountOf implements Answerable<number> {
  private constructor(private readonly locator: Locator) {}

  static elements(locator: Locator): CountOf {
    return new CountOf(locator);
  }

  async answeredBy(_actor: Actor): Promise<number> {
    return this.locator.count();
  }
}
