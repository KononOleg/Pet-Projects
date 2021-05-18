import { Basecomponent } from "../base-component";

export class NavButton extends Basecomponent {
  constructor(readonly text: string) {
    super("button", ["button", "nav__button"]);
    this.element.innerHTML = `
        <div class="button__img"></div>
            ${text}
        `;
  }
}
