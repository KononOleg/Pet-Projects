import "./Timer.css";
import { Basecomponent } from "../../shared/base-component";
import { Setting } from "../Setting";
import { Statistics } from "../Game/Statistics/Statistics";

export class Timer extends Basecomponent {
  private static countdown: Basecomponent = new Basecomponent("p", ["count"]);
  constructor() {
    super("div", ["timer"]);
    this.element.appendChild(Timer.countdown.element);
  }
  private static int: NodeJS.Timeout;
  public static countDownTimer() {
    //  this.StopTimer();
    let time = Setting.show_time;
    this.udpateTimer(time);

    let interval = setInterval(() => {
      time--;
      this.udpateTimer(time);
      if (time == 0) {
        this.countTimer();
        clearInterval(interval);
      }
    }, 1000);
  }

  public static StopTimer() {
    clearInterval(this.int);
  }

  static countTimer() {
    Timer.udpateTimer(0);
    Timer.int = setInterval(() => {
      Statistics.Time++;
      Timer.udpateTimer(Statistics.Time);
    }, 1000);
  }
  static udpateTimer(time: number) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    Timer.countdown.element.innerHTML = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }
}
