import "./inputSubmit.css";
import { Basecomponent } from "../base-component";

export class inputSubmit extends Basecomponent {
  constructor(private readonly text: string) {
    super("button", ["inputSubmit"]);

    this.element.innerHTML = this.text;

    this.element.setAttribute("type", "submit");
  }
}
