import "./BestScore.scss";
import { Basecomponent } from "../../shared/base-component";
import { Database } from "../Database/Database";

export class BestScore extends Basecomponent {
  private bestscoreTitle: Basecomponent = new Basecomponent("h2", ["BestScore__title"]);

  constructor() {
    super("div", ["BestScore__wrapper"]);
    this.element.appendChild(this.bestscoreTitle.element);
    this.bestscoreTitle.element.innerHTML = "Best player";
    Database.getInstance()
      .show()
      .then((scores) => {
        scores.forEach((arr) => {
          const score = document.createElement("div");
          score.classList.add("score__wrapper");
          this.element.appendChild(score);
          score.innerHTML = `
          <div class="player__info">
            <img src=${arr.avatar} class="player__avatar">
            <div class="player__contact">
                <p class="info__name">${arr.name}</p>
                <p class="info__email">${arr.email}</p>
            </div>
          </div>
          <div>
              <p class="info__score">Score:<span>${arr.score}</span></p>
          </div>`;
        });
      });
  }
}
