import type { Actor, Answerable } from "../actor.js";
import { BrowseTheWeb } from "../abilities/browse-the-web.js";

export class CurrentUrl implements Answerable<string> {
  private constructor() {}

  static value(): CurrentUrl {
    return new CurrentUrl();
  }

  async answeredBy(actor: Actor): Promise<string> {
    return BrowseTheWeb.as(actor).url();
  }
}
