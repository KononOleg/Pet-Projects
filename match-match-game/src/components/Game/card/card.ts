import "./card.scss";
import { Basecomponent } from "../../../shared/base-component";
import { Setting } from "../../Setting";

export class Card extends Basecomponent {
  isFliped = false;

  private card: Basecomponent = new Basecomponent("div", ["card"]);
  private plug: Basecomponent = new Basecomponent("div", ["plug"]);

  constructor(readonly image: string) {
    super("div", ["card__container"]);
    this.card.element.setAttribute("style", `width:${32 / Setting.countRows}vw`);
    this.element.appendChild(this.card.element);

    this.card.element.innerHTML = `
                <div class="card__front" style="background-image: url('./images/${image}')"></div>
                <div class="card__back"></div>
        `;
    this.card.element.appendChild(this.plug.element);
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
      this.element.classList.toggle("card_flip", isFront);
      this.plug.element.classList.remove("card_wrong");
      this.element.addEventListener("transitionend", () => resolve(), {
        once: true,
      });
    });
  }

  rightCard() {
    this.plug.element.classList.add("card_right");
  }
  wrondCard() {
    this.plug.element.classList.add("card_wrong");
  }
}
