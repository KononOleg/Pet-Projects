import './car.scss';
import { Basecomponent } from '../../shared/BaseComponent/BaseComponent';
import { Button } from '../../shared/Button/Button';
import { startEngine, drive } from '../../shared/api';
import { getDistanceBetweenElements, animation } from '../../shared/utils';
import { store } from '../../shared/store';
import { CarImage } from './CarImage/CarImage';

export class Car extends Basecomponent {
  private generalButtons: Basecomponent = new Basecomponent('div', ['generalButtons']);

  readonly removeButton: Button = new Button('remove', 'generalButton');

  readonly selectButton: Button = new Button('select', 'generalButton');

  private controlButtons: Basecomponent = new Basecomponent('div', ['controlButtons']);

  private startEngine: Button = new Button('A', 'startEngineButton');

  private stopEngine: Button = new Button('B', 'stopEngineButton');

  private flag: Basecomponent = new Basecomponent('div', ['flag']);

  private carImage: CarImage;

  private carName: Basecomponent = new Basecomponent('p', ['carName']);

  readonly id: number;

  private name: string;

  private color: string;

  constructor(id: number, name: string, color: string) {
    super('div', ['Car']);
    this.id = id;
    this.name = name;
    this.color = color;
    this.element.append(this.generalButtons.element);
    this.generalButtons.element.appendChild(this.selectButton.element);
    this.generalButtons.element.appendChild(this.removeButton.element);
    this.generalButtons.element.appendChild(this.carName.element);
    this.carName.element.innerHTML = this.name;

    this.element.append(this.controlButtons.element);
    this.controlButtons.element.appendChild(this.startEngine.element);
    this.controlButtons.element.appendChild(this.stopEngine.element);
    this.stopEngine.element.disabled = true;

    this.element.appendChild(this.flag.element);
    this.flag.element.innerHTML = '🏁';
    this.carImage = new CarImage(this.color, 'carImage');
    this.element.appendChild(this.carImage.element);

    this.startEngine.element.addEventListener('mousedown', () => {
      this.startDriving(this.id);
    });
    this.stopEngine.element.addEventListener('mousedown', () => {
      this.stopDriving(this.id);
    });
  }

  startDriving = async (id: number): Promise<{ success: boolean; id: number; time: number }> => {
    const OFFSET = 50;
    const { velocity, distance } = await startEngine(id);
    this.startEngine.element.disabled = true;
    this.stopEngine.element.disabled = false;
    const time = Math.round(distance / velocity);
    const htmlDistance = Math.floor(getDistanceBetweenElements(this.carImage.element, this.flag.element)) + OFFSET;
    store.animation[id] = animation(this.carImage.element, htmlDistance, time);
    const { success } = await drive(id);
    if (!success) window.cancelAnimationFrame(store.animation[id].id);
    return { success, id, time };
  };

  stopDriving = async (id: number): Promise<void> => {
    this.carImage.element.style.transform = 'translateX(0)';
    if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id);
    this.startEngine.element.disabled = false;
    this.stopEngine.element.disabled = true;
  };
}
