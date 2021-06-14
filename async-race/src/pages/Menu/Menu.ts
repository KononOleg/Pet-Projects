import "./Menu.scss";
import { Basecomponent } from "../../shared/BaseComponent/BaseComponent";
import { Button } from "../../shared/Button/Button";
import { Garage } from "../Garage/Garage";
import { Winners } from "../Winners/Winners";

export class Menu extends Basecomponent {
  private garageButton: Button = new Button("To garage", "controlButton");

  private winnersButton: Button = new Button("To winners", "controlButton");

  private garage: Garage = new Garage();

  private winners: Winners = new Winners();

  constructor() {
    super("div", ["menu"]);
    this.element.append(this.garageButton.element);
    this.element.append(this.winnersButton.element);

    document.body.append(this.garage.element);
    document.body.append(this.winners.element);
    this.winners.element.style.display = "none";

    this.winnersButton.element.addEventListener("mousedown", () => {
      this.garage.element.style.display = "none";
      this.winners.element.style.display = "block";
      this.winners.updateStateWinners();
    });

    this.garageButton.element.addEventListener("mousedown", () => {
      this.garage.element.style.display = "block";
      this.winners.element.style.display = "none";
    });
  }
}
