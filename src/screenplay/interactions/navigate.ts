import type { Actor, Performable } from "../actor.js";
import { BrowseTheWeb } from "../abilities/browse-the-web.js";

export class Navigate implements Performable {
  private constructor(private readonly path: string) {}

  static to(path: string): Navigate {
    return new Navigate(path);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = BrowseTheWeb.as(actor);
    await page.goto(this.path);
  }
}
