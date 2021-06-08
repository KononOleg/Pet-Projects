import "./inputField.scss";
import { Basecomponent } from "../base-component";

export class InputField extends Basecomponent {
  private inputName: Basecomponent = new Basecomponent("label", ["inputName"]);
  private succeessImg: Basecomponent = new Basecomponent("i", ["succeessImg"]);
  private errorText: Basecomponent = new Basecomponent("small", ["errorText"]);
  private input: HTMLInputElement;

  constructor(text: string) {
    super("div", ["inputContainer"]);

    this.inputName.element.innerHTML = text;
    this.input = document.createElement("input");
    this.input.classList.add("input");

    this.element.appendChild(this.inputName.element);
    this.element.appendChild(this.succeessImg.element);
    this.element.appendChild(this.input);
    this.input.setAttribute("type", "text");
    this.element.appendChild(this.input);

    this.element.appendChild(this.errorText.element);
    this.errorText.element.innerHTML = "Error";
  }

  public getValue(): string {
    return this.input.value.trim();
  }

  public SetError(error: string): void {
    this.errorText.element.innerHTML = `${error}`;
  }

  public resetValue(): void {
    this.input.value = "";
    this.element.classList.remove("Success");
    this.element.classList.remove("Error");
  }
}
