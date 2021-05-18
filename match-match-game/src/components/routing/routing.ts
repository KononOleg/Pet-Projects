import { GameSetting } from "../GameSetting/GameSetting";
import { Game } from "../Game/game";
import { AboutGame } from "../main/aboutGame/AboutGame";
import { Main } from "../main/main";

export class Routing {
  private static instance: Routing;

  public static getInstance(): Routing {
    if (!Routing.instance) {
      Routing.instance = new Routing();
    }

    return Routing.instance;
  }

  private main: Main = new Main();

  public readonly items = {
    default: AboutGame,
    aboutGame: AboutGame,
    game: Game,
    setting: GameSetting,
  };

  render(item: any) {
    //  ANYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
    this.main.element.innerHTML = "";
    const about = new item();
    this.main.element.prepend(about.element);
  }
}
