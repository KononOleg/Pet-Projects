import "./header.css";
import { Basecomponent } from "../../shared/base-component";
import { Routing } from "../routing/routing";
import { Game } from "../Game/game";
import { AboutGame } from "../main/aboutGame/AboutGame";
import { GameSetting } from "../GameSetting/GameSetting";
import { Registration } from "../registration/registration";
import { NavButton } from "../../shared/NavButton/NavButton";
import { Button } from "../../shared/Button/Button";
import { Timer } from "../Timer/Timer";

export class Header extends Basecomponent {
  private aboutbnt: NavButton = new NavButton("About Game");
  private settingbnt: NavButton = new NavButton("Setting");
  private static regButton: Button = new Button("Register new player");
  public static playbnt: Button = new Button("play");
  public static stopbnt: Button = new Button("stop");
  private reg: Registration = new Registration();
  private header_wrapper: Basecomponent = new Basecomponent("div", [
    "header__wrapper",
  ]);
  private header_logo: Basecomponent = new Basecomponent("div", [
    "header__logo",
  ]);
  private header_nav: Basecomponent = new Basecomponent("div", ["header__nav"]);
  private static header_reg: Basecomponent = new Basecomponent("div", [
    "header__reg",
  ]);

  constructor() {
    super("div", ["header"]);

    this.element.appendChild(this.header_wrapper.element);
    this.header_wrapper.element.appendChild(this.header_logo.element);
    this.header_logo.element.innerHTML = `
                    <a class="logo__title">
                      match
                        <span class="logo__subtitle">match</span>
                    </a>
                    `;
    this.header_wrapper.element.appendChild(this.header_nav.element);
    this.header_wrapper.element.appendChild(Header.header_reg.element);

    this.header_nav.element.append(this.aboutbnt.element);
    this.header_nav.element.append(this.settingbnt.element);
    Header.header_reg.element.append(Header.regButton.element);
    Routing.getInstance().render(AboutGame);

    this.aboutbnt.element.addEventListener("mousedown", () => {
      Routing.getInstance().render(AboutGame);
    });

    this.settingbnt.element.addEventListener("mousedown", () => {
      Routing.getInstance().render(GameSetting);
    });

    Header.regButton.element.addEventListener("mousedown", () => {
      document.body.appendChild(this.reg.element);
    });
    Header.playbnt.element.addEventListener("mousedown", () => {
      Routing.getInstance().render(Game);
      Header.playbnt.element.remove();
      Header.header_reg.element.append(Header.stopbnt.element);
    });

    Header.stopbnt.element.addEventListener("mousedown", () => {
      Routing.getInstance().render(AboutGame);
      Header.stopbnt.element.remove();
      Header.header_reg.element.append(Header.playbnt.element);
      Timer.StopTimer();
    });
  }
  public static createPlayButton() {
    Header.regButton.element.remove();
    Header.header_reg.element.append(Header.playbnt.element);
  }
}
