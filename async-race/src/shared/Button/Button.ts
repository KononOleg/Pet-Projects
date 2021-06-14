import "./Button.scss";

export class Button {
  readonly element: HTMLButtonElement;

  constructor(text: string, style: string, type?: string) {
    this.element = document.createElement("button");
    this.element.classList.add("button", style);
    this.element.innerHTML = text;
    if (type !== undefined) {
      this.element.setAttribute("type", `${type}`);
    }
  }
}
