import "./registration.css";
import { Basecomponent } from "../../shared/base-component";
import { InputField } from "../../shared/InputField/InputField";
import { inputSubmit } from "../../shared/InputSubmit/InputSubmit";
import { Header } from "../header/header";

export class Registration extends Basecomponent {
  private reg__wrapper: Basecomponent = new Basecomponent("form", [
    "reg__wrapper",
  ]);
  private input: InputField = new InputField("name");
  private submit: inputSubmit = new inputSubmit("add user");
  constructor() {
    super("div", ["registration"]);
    this.element.appendChild(this.reg__wrapper.element);
    this.reg__wrapper.element.appendChild(this.input.element);
    this.reg__wrapper.element.appendChild(this.submit.element);

    this.reg__wrapper.element.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      this.element.remove();
      Header.createPlayButton();
    });
  }
}
