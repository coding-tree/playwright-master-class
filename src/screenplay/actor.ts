export interface Performable {
  performAs(actor: Actor): Promise<void>;
}

export interface Answerable<T> {
  answeredBy(actor: Actor): Promise<T>;
}

export class Actor {
  private readonly abilities = new Map<string, unknown>();

  private constructor(private readonly name: string) {}

  static named(name: string): Actor {
    return new Actor(name);
  }

  whoCan(...abilities: { grantTo(actor: Actor): void }[]): Actor {
    for (const ability of abilities) {
      ability.grantTo(this);
    }
    return this;
  }

  addAbility(key: string, ability: unknown): void {
    this.abilities.set(key, ability);
  }

  getAbility<T>(key: string): T {
    const ability = this.abilities.get(key);
    if (!ability) {
      throw new Error(`${this.name} does not have the ability: ${key}`);
    }
    return ability as T;
  }

  async attemptsTo(...performables: Performable[]): Promise<void> {
    for (const performable of performables) {
      await performable.performAs(this);
    }
  }

  async asks<T>(answerable: Answerable<T>): Promise<T> {
    return answerable.answeredBy(this);
  }
}
