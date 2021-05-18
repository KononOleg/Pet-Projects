import "./card.css";
import { Basecomponent } from "../../../shared/base-component";

const FLIP_CLASS = "card_flip";

export class Card extends Basecomponent {
  isFliped = false;

  constructor(readonly image: string) {
    super("div", ["card__container"]);

    this.element.innerHTML = `
            <div class="card">
                <div class="card__front" style="background-image: url('./images/${image}')"></div>
                <div class="card__back"></div>
            </div>
        `;
  }

  flipToBack() {
    this.isFliped = true;
    return this.flip(true);
  }

  flipToFront() {
    this.isFliped = false;
    return this.flip(false);
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener("transitionend", () => resolve(), {
        once: true,
      });
    });
  }
}
