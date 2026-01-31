import type { Actor, Performable } from "../actor.js";
import { BrowseTheWeb } from "../abilities/browse-the-web.js";
import { loginLocators } from "../../locators/login.locators.js";
import { Fill } from "../interactions/fill.js";
import { Click } from "../interactions/click.js";

export class Login implements Performable {
  private constructor(
    private readonly username: string,
    private readonly password: string,
  ) {}

  static withCredentials(username: string, password: string): Login {
    return new Login(username, password);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = BrowseTheWeb.as(actor);
    const locators = loginLocators(page);

    await actor.attemptsTo(
      Fill.field(locators.usernameInput, this.username),
      Fill.field(locators.passwordInput, this.password),
      Click.on(locators.submitButton),
    );
  }
}
