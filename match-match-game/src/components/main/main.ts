import "./main.css";
import { Basecomponent } from "../../shared/base-component";

export class Main extends Basecomponent {
  constructor() {
    super("div", ["main"]);
    document.body.appendChild(this.element);
  }
}
