import "./Button.scss";
import { Basecomponent } from "../base-component";

export class Button extends Basecomponent {
  constructor(text: string, style: string, type?: string) {
    super("button", [style, "button"]);
    this.element.innerHTML = `
                ${text}
            `;
    if (type !== undefined) {
      this.element.setAttribute("type", `${type}`);
    }
  }
}
