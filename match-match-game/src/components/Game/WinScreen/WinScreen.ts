import "./WinScreen.scss";
import { Basecomponent } from "../../../shared/base-component";
import { Button } from "../../../shared/Button/Button";
import { Routing } from "../../routing/routing";
import { Statistics } from "../Statistics/Statistics";
import { Header } from "../../header/header";
import { BestScore } from "../../BestScore/BestScore";

export class WinScreen extends Basecomponent {
  private winScreen_wrapper: Basecomponent = new Basecomponent("div", ["winScreen__wrapper"]);
  private winScreen_text: Basecomponent = new Basecomponent("p", ["winScreen_text"]);
  private bnt: Button = new Button("ok", "reg__button");
  constructor() {
    super("div", ["winScreen"]);
    document.body.appendChild(this.element);
    this.element.appendChild(this.winScreen_wrapper.element);
    this.winScreen_text.element.innerHTML = `Congratulations! You successfully found all matches on ${Statistics.Time} secondes.`;
    this.winScreen_wrapper.element.appendChild(this.winScreen_text.element);
    this.winScreen_wrapper.element.appendChild(this.bnt.element);

    this.bnt.element.addEventListener("mousedown", () => {
      this.element.remove();
      Routing.getInstance().render(BestScore);
      Header.bestscorebnt.element.classList.add("active");
      Header.disableButton();
      Header.stopbnt.element.remove();
      Header.header_reg.element.prepend(Header.playbnt.element);
    });
  }
}
