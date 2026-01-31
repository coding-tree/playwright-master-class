import { test as base } from "@playwright/test";
import { Actor } from "../screenplay/actor.js";
import { BrowseTheWeb } from "../screenplay/abilities/browse-the-web.js";

type Fixtures = {
  actor: Actor;
};

export const test = base.extend<Fixtures>({
  actor: async ({ page }, use) => {
    const actor = Actor.named("User").whoCan(BrowseTheWeb.using(page));
    await use(actor);
  },
});

export { expect } from "@playwright/test";
