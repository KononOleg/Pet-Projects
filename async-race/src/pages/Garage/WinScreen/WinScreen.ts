import './winScreen.scss';
import { Basecomponent } from '../../../shared/BaseComponent/BaseComponent';

export class WinScreen extends Basecomponent {
  constructor() {
    super('div', ['winScreenModal']);
  }

  renderWinScreen = (car: string, time: number): void => {
    this.element.innerHTML = `<p class="winScreen__text">${car} went firts (${time}s)</p>`;
  };
}
