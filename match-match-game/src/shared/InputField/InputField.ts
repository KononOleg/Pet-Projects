import "./inputField.scss";
import { Basecomponent } from "../base-component";

export class InputField extends Basecomponent {
  private label = document.createElement("label");
  public input = document.createElement("input");
  private i = document.createElement("i");
  private small = document.createElement("small");

  constructor(private readonly text: string) {
    super("div", ["inputContainer"]);

    this.label.innerHTML = `${text}`;

    this.element.appendChild(this.label);
    this.element.appendChild(this.i);
    this.element.appendChild(this.input);
    this.input.setAttribute("type", "text");
    this.element.appendChild(this.input);

    this.element.appendChild(this.small);
    this.small.innerHTML = `Error`;
  }

  public getValue(): string {
    return this.input.value.trim();
  }

  public SetError(error: string) {
    this.small.innerHTML = `${error}`;
  }
  public resetValue() {
    this.input.value = "";
    this.element.classList.remove("Success");
    this.element.classList.remove("Error");
  }
}
