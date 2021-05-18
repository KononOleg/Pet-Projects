import "./game.css";
import { Basecomponent } from "../../shared/base-component";
import { CardsField } from "./CardsField/cards-field";
import { Card } from "./card/card";
import { delay } from "../../shared/delay";
import { ImageCategoryModel } from "./models/image-category-model";
import { Timer } from "../Timer/Timer";
import { Statistics } from "./Statistics/Statistics";
import { Setting } from "../Setting";
import { WinScreen } from "./WinScreen/WinScreen";

export class Game extends Basecomponent {
  private readonly cardsField: CardsField;
  private activeCard?: Card;
  private isAnimation = false;
  private timer: Timer = new Timer();
  private winScreen!: WinScreen;
  constructor() {
    super("div", ["game"]);
    this.cardsField = new CardsField();
    this.element.append(this.cardsField.element);
    this.element.prepend(this.timer.element);
    this.start();
  }

  async start() {
    const res = await fetch("../images.json");
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories.find(
      (images) => images.category === Setting.typeCards
    );
    if (!cat) throw Error("error");
    const images = this.RandomImages(cat.images).map(
      (name) => `${cat.category}/${name}`
    );
    this.newGame(images);
  }
  newGame(images: string[]) {
    this.cardsField.clear();
    Statistics.resetStatistics();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener("click", () => this.cardHandler(card));
    });

    Timer.countDownTimer();
    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFliped) return;
    this.isAnimation = true;
    await card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image != card.image) {
      await delay(1000);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      Statistics.numberErrorCompar++;
    } else {
      Statistics.numberCompar++;
      if (Statistics.numberCompar === Setting.Difficulty) {
        Timer.StopTimer();
        Statistics.setScore();
        this.winScreen = new WinScreen();
      }
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  RandomImages(images: string[]): string[] {
    let arr: number[] = [];
    let randomArr: string[] = [];
    let cards = Math.pow(2, Setting.Difficulty - 1);
    while (arr.length < cards) {
      let randomNumber = Math.floor(Math.random() * cards);
      let found = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === randomNumber) {
          found = true;
        }
      }
      if (!found) {
        arr[arr.length] = randomNumber;
        randomArr.push(images[randomNumber]);
      }
    }
    return randomArr;
  }
}
