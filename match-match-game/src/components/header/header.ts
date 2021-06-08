import "./header.scss";
import { Basecomponent } from "../../shared/base-component";
import { Routing } from "../routing/routing";
import { Game } from "../Game/game";
import { AboutGame } from "../main/aboutGame/AboutGame";
import { GameSetting } from "../GameSetting/GameSetting";
import { Registration } from "../registration/registration";
import { NavButton } from "../../shared/NavButton/NavButton";
import { Button } from "../../shared/Button/Button";
import { Timer } from "../Timer/Timer";
import { BestScore } from "../BestScore/BestScore";
import { Player } from "../registration/Player/Player";

import question from "../../assets/icons/question.png";
import settings from "../../assets/icons/settings.png";
import stars from "../../assets/icons/stars.png";

export class Header extends Basecomponent {
  private static aboutbnt: NavButton = new NavButton("About Game", question);

  private static settingbnt: NavButton = new NavButton("Game Setting", settings);

  public static bestscorebnt: NavButton = new NavButton("Best Score", stars);

  private static regButton: Button = new Button("Register new player", "reg__button");

  public static playbnt: Button = new Button("play game", "reg__button");

  public static stopbnt: Button = new Button("stop game", "reg__button");

  private reg: Registration = new Registration();

  private header_wrapper: Basecomponent = new Basecomponent("div", ["header__wrapper"]);

  private header_logo: Basecomponent = new Basecomponent("div", ["header__logo"]);

  private header_nav: Basecomponent = new Basecomponent("div", ["header__nav"]);

  private header_logo_and_nav = new Basecomponent("div", ["header_logo_and_nav"]);

  public static header_reg: Basecomponent = new Basecomponent("div", ["header__reg"]);

  private static avatar = document.createElement("img");

  constructor() {
    super("div", ["header"]);

    this.element.appendChild(this.header_wrapper.element);
    this.header_wrapper.element.appendChild(this.header_logo_and_nav.element);
    this.header_logo_and_nav.element.appendChild(this.header_logo.element);
    this.header_logo.element.innerHTML = `
                    <a class="logo__title">
                      match
                        <span class="logo__subtitle">match</span>
                    </a>
                    `;
    this.header_logo_and_nav.element.appendChild(this.header_nav.element);
    this.header_wrapper.element.appendChild(Header.header_reg.element);

    this.header_nav.element.append(Header.aboutbnt.element);
    Header.aboutbnt.element.classList.add("active");
    this.header_nav.element.append(Header.bestscorebnt.element);
    this.header_nav.element.append(Header.settingbnt.element);

    Header.header_reg.element.append(Header.regButton.element);
    Routing.getInstance().render(AboutGame);

    Header.aboutbnt.element.addEventListener("mousedown", () => {
      this.resetActiveButton();
      Routing.getInstance().render(AboutGame);
      Header.aboutbnt.element.classList.add("active");
    });
    Header.bestscorebnt.element.addEventListener("mousedown", () => {
      this.resetActiveButton();
      Routing.getInstance().render(BestScore);
      Header.bestscorebnt.element.classList.add("active");
    });
    Header.settingbnt.element.addEventListener("mousedown", () => {
      this.resetActiveButton();
      Routing.getInstance().render(GameSetting);
      Header.settingbnt.element.classList.add("active");
    });

    Header.regButton.element.addEventListener("mousedown", () => {
      document.body.appendChild(this.reg.element);
      this.reg.toggleModal();
    });
    Header.playbnt.element.addEventListener("mousedown", () => {
      Routing.getInstance().render(Game);
      Header.playbnt.element.remove();
      Header.header_reg.element.prepend(Header.stopbnt.element);
      Header.disableButton();
      this.resetActiveButton();
    });

    Header.stopbnt.element.addEventListener("mousedown", () => {
      Routing.getInstance().render(AboutGame);
      Header.aboutbnt.element.classList.add("active");
      Header.stopbnt.element.remove();
      Header.header_reg.element.prepend(Header.playbnt.element);
      Timer.StopTimer();
      Header.disableButton();
    });
  }

  public static createPlayButton(): void {
    Header.regButton.element.remove();
    Header.header_reg.element.append(Header.playbnt.element);
    Header.header_reg.element.append(Header.avatar);
    Header.avatar.classList.add("header__avatar");
    Header.avatar.src = Player.Avatar;
  }

  resetActiveButton = (): void => {
    Header.aboutbnt.element.classList.remove("active");
    Header.settingbnt.element.classList.remove("active");
    Header.bestscorebnt.element.classList.remove("active");
  };

  static disableButton = (): void => {
    Header.aboutbnt.element.classList.toggle("disable");
    Header.settingbnt.element.classList.toggle("disable");
    Header.bestscorebnt.element.classList.toggle("disable");
  };
}
