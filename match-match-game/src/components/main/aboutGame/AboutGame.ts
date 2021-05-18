import "./AboutGame.css";
import { Basecomponent } from "../../../shared/base-component";

export class AboutGame extends Basecomponent {
  constructor() {
    super("div", ["aboutGame"]);
    this.element.innerHTML = `
        <p class="text">Soon...</p>
        `;
  }
}
