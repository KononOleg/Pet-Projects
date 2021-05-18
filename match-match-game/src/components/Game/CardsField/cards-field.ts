import "./cards-field.css";
import { Basecomponent } from "../../../shared/base-component";
import { Card } from "../card/card";
import { Timer } from "../../Timer/Timer";
import { Setting } from "../../Setting";
import { delay } from "../../../shared/delay";
import { GameSetting } from "../../GameSetting/GameSetting";

export class CardsField extends Basecomponent {
  private cards: Card[] = [];
  constructor() {
    super("div", ["cards-field"]);
    this.element.setAttribute(
      "style",
      `grid-template-rows:repeat(${
        Setting.Difficulty / 2
      },250px); grid-template-columns:repeat(${Setting.Difficulty * 2},180px)`
    );
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
