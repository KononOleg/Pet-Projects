import "./GameSetting.css";
import { Basecomponent } from "../../shared/base-component";
import { Setting } from "../Setting";

export class GameSetting extends Basecomponent {
  private selectCards: HTMLSelectElement;
  private selectDifficulty: HTMLSelectElement;
  constructor() {
    super("div", ["GameSetting"]);

    this.selectCards = document.createElement("select");

    this.element.appendChild(this.selectCards);
    this.selectCards.innerHTML = `"
    <select>
        <option value="Animals" selected="selected">Animals</option>
    </select>"
    `;

    this.selectCards.addEventListener("change", (event) => {
      Setting.typeCards =
        this.selectCards.options[this.selectCards.selectedIndex].value;
    });

    this.selectDifficulty = document.createElement("select");

    this.element.appendChild(this.selectDifficulty);
    this.selectDifficulty.innerHTML = `"
    <select>
        <option value="2" selected="selected">2x2</option>
        <option value="4">4x4</option>
    </select>"
    `;

    this.selectDifficulty.addEventListener("change", (event) => {
      Setting.Difficulty = Number(
        this.selectDifficulty.options[this.selectDifficulty.selectedIndex].value
      );
    });
  }
}
