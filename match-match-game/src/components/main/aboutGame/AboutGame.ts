import "./AboutGame.scss";
import { Basecomponent } from "../../../shared/base-component";
export class AboutGame extends Basecomponent {
  private firstpicture = document.createElement("img");
  private secondpicture = document.createElement("img");
  private thirdpicture = document.createElement("img");
  private fourthpicture = document.createElement("img");
  private fifthpicture = document.createElement("img");
  private sixthpicture = document.createElement("img");
  private howtoplay_wrapper: Basecomponent = new Basecomponent("div", ["howtoplay__wrapper"]);
  private reg_section: Basecomponent = new Basecomponent("div", ["howtoplay__section"]);
  private setting_section: Basecomponent = new Basecomponent("div", ["howtoplay__section"]);
  private game_section: Basecomponent = new Basecomponent("div", ["howtoplay__section"]);
  constructor() {
    super("div", ["aboutGame"]);
    this.element.innerHTML = `
        <p class="text">How to play?</p>
        `;

    this.element.appendChild(this.howtoplay_wrapper.element);
    this.howtoplay_wrapper.element.appendChild(this.reg_section.element);
    this.howtoplay_wrapper.element.appendChild(this.setting_section.element);
    this.howtoplay_wrapper.element.appendChild(this.game_section.element);

    this.reg_section.element.appendChild(this.firstpicture);
    this.firstpicture.src = require("../../../assets/images/AboutGame/1.png");
    this.reg_section.element.appendChild(this.thirdpicture);
    this.thirdpicture.src = require("../../../assets/images/AboutGame/4.png");

    this.setting_section.element.appendChild(this.secondpicture);
    this.secondpicture.src = require("../../../assets/images/AboutGame/2.png");
    this.setting_section.element.appendChild(this.fifthpicture);
    this.fifthpicture.src = require("../../../assets/images/AboutGame/5.png");

    this.game_section.element.appendChild(this.fourthpicture);
    this.fourthpicture.src = require("../../../assets/images/AboutGame/3.png");
    this.game_section.element.appendChild(this.sixthpicture);
    this.sixthpicture.src = require("../../../assets/images/AboutGame/6.png");
  }
}
