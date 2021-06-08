import "./NavButton.scss";
import { Basecomponent } from "../base-component";

export class NavButton extends Basecomponent {
  constructor(text: string, src: string) {
    super("button", ["button", "nav__button"]);
    this.element.innerHTML = `
        <img src="${src}" class="button__img">
            ${text}
        `;
  }
}
