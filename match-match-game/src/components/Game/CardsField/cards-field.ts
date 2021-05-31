import "./cards-field.scss";
import { Basecomponent } from "../../../shared/base-component";
import { Card } from "../card/card";
import { Setting } from "../../Setting";
import { delay } from "../../../shared/delay";

export class CardsField extends Basecomponent {
  private cards: Card[] = [];
  constructor() {
    super("div", ["cards-field"]);
    this.element.setAttribute("style", `grid-template-rows:repeat(${Setting.countRows},auto); grid-template-columns:repeat(${Setting.countColumns},auto)`);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = "";
  }

  async addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    await delay(Setting.show_time * 1000);
    this.cards.forEach((card) => card.flipToBack());
  }
}
