import "./Button.css";
import { Basecomponent } from "../base-component";

export class Button extends Basecomponent {
  constructor(readonly text: string) {
    super("button", ["reg__button"]);
    this.element.innerHTML = `
                ${text}
            `;
  }
}
