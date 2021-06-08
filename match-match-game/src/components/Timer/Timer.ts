import "./Timer.scss";
import { Basecomponent } from "../../shared/base-component";
import { Setting } from "../Setting";
import { Statistics } from "../Game/Statistics/Statistics";

export class Timer extends Basecomponent {
  private static countdown: Basecomponent = new Basecomponent("p", ["count"]);

  constructor() {
    super("div", ["timer"]);
    this.element.appendChild(Timer.countdown.element);
  }

  private static countInterval: NodeJS.Timeout;

  private static countDownInterval: NodeJS.Timeout;

  public static countDownTimer(): void {
    this.StopTimer();
    let time = Setting.show_time;
    this.udpateTimer(time);

    this.countDownInterval = setInterval(() => {
      time--;
      this.udpateTimer(time);
      if (time === 0) {
        this.countTimer();
        clearInterval(this.countDownInterval);
      }
    }, 1000);
  }

  public static StopTimer(): void {
    clearInterval(this.countInterval);
    clearInterval(this.countDownInterval);
  }

  static countTimer(): void {
    Timer.udpateTimer(0);
    this.countInterval = setInterval(() => {
      Statistics.Time++;
      Timer.udpateTimer(Statistics.Time);
    }, 1000);
  }

  static udpateTimer(time: number): void {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    Timer.countdown.element.innerHTML = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
}
