import type { Locator } from "@playwright/test";
import type { Actor, Answerable } from "../actor.js";

export class TextOf implements Answerable<string> {
  private constructor(private readonly locator: Locator) {}

  static element(locator: Locator): TextOf {
    return new TextOf(locator);
  }

  async answeredBy(_actor: Actor): Promise<string> {
    return this.locator.innerText();
  }
}
