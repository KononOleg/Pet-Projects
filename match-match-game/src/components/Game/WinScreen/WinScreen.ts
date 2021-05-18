import "./WinScreen.css";
import { Basecomponent } from "../../../shared/base-component";
import { Button } from "../../../shared/Button/Button";
import { AboutGame } from "../../main/aboutGame/AboutGame";
import { Routing } from "../../routing/routing";
import { Statistics } from "../Statistics/Statistics";

export class WinScreen extends Basecomponent {
  private winScreen_wrapper: Basecomponent = new Basecomponent("div", [
    "winScreen__wrapper",
  ]);
  private winScreen_text: Basecomponent = new Basecomponent("p", [
    "winScreen_text",
  ]);
  private bnt: Button = new Button("ok");
  constructor() {
    super("div", ["winScreen"]);
    document.body.appendChild(this.element);
    this.element.appendChild(this.winScreen_wrapper.element);
    this.winScreen_text.element.innerHTML = `Congratulations! You successfully found all matches on ${Statistics.Time} secondes.`;
    this.winScreen_wrapper.element.appendChild(this.winScreen_text.element);
    this.winScreen_wrapper.element.appendChild(this.bnt.element);

    this.bnt.element.addEventListener("mousedown", () => {
      this.element.remove();
      Routing.getInstance().render(AboutGame);
    });
  }
}
