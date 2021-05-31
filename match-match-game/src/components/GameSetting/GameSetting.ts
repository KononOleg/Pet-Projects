import "./GameSetting.scss";
import { Basecomponent } from "../../shared/base-component";
import { Setting } from "../Setting";

export class GameSetting extends Basecomponent {
  private selectCards: HTMLSelectElement;
  private selectDifficulty: HTMLSelectElement;
  private selectCardsTitle: Basecomponent = new Basecomponent("p", ["select__title"]);
  private selectDifficultyTitle: Basecomponent = new Basecomponent("p", ["select__title"]);
  constructor() {
    super("div", ["GameSetting"]);

    this.selectCards = document.createElement("select");
    this.element.appendChild(this.selectCardsTitle.element);
    this.selectCardsTitle.element.innerHTML = "Game cards";
    this.element.appendChild(this.selectCards);
    this.selectCards.innerHTML = `
    <select>
        <option value="" disabled selected hidden>select game cards type</option>
        <option value="Dogs">Dogs</option>
        <option value="Animals">Animals</option>
    </select>
    `;

    this.selectCards.addEventListener("change", () => {
      Setting.typeCards = this.selectCards.options[this.selectCards.selectedIndex].value;
      this.selectCards.options[this.selectCards.selectedIndex].selected = true;
    });

    this.selectDifficulty = document.createElement("select");
    this.element.appendChild(this.selectDifficultyTitle.element);
    this.selectDifficultyTitle.element.innerHTML = "Difficulty";
    this.element.appendChild(this.selectDifficulty);
    this.selectDifficulty.innerHTML = `
    <select>
        <option value="" disabled selected hidden>select game type</option>
        <option data-rows="2" data-columns="2">2x2</option>
        <option data-rows="4" data-columns="4">4x4</option>
        <option data-rows="4" data-columns="6">4x6</option>
    </select>
    `;

    this.selectDifficulty.addEventListener("change", () => {
      Setting.countRows = Number(this.selectDifficulty.options[this.selectDifficulty.selectedIndex].getAttribute("data-rows"));
      Setting.countColumns = Number(this.selectDifficulty.options[this.selectDifficulty.selectedIndex].getAttribute("data-columns"));
      this.selectDifficulty.options[this.selectDifficulty.selectedIndex].selected = true;
    });
  }
}
