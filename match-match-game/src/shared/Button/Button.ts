import "./Button.scss";
import { Basecomponent } from "../base-component";

export class Button extends Basecomponent {
  constructor(readonly text: string, readonly style: string, readonly type?: string) {
    super("button", [`${style}`]);
    this.element.innerHTML = `
                ${text}
            `;
    if (type != undefined) {
      this.element.setAttribute("type", `${type}`);
    }
  }
}
