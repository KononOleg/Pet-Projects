import { Basecomponent } from "../base-component";

export class InputField extends Basecomponent {
  private legend = document.createElement("legend");
  public input = document.createElement("input");

  constructor(private readonly text: string) {
    super("fieldset", ["inputFieldset"]);

    this.element.appendChild(this.legend);
    this.legend.innerHTML = this.text;

    this.element.appendChild(this.input);

    this.input.setAttribute("type", "text");
  }

  public getValue(): string {
    console.log("321");
    return this.input.value;
  }
}
