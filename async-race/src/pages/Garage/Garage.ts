import './Garage.scss';
import { Car } from '../../сomponents/Car/Car';
import { Basecomponent } from '../../shared/BaseComponent/BaseComponent';
import { Button } from '../../shared/Button/Button';
import { Input } from '../../shared/Input/Input';
import { store } from '../../shared/store';
import {
  createCar, getCars, updateCar, deleteCar, saveWinner, deleteWinner,
} from '../../shared/api';
import colors from '../../shared/variables/сolors';
import { race, getRandomColor, getRandomName } from '../../shared/utils';
import { WinScreen } from './WinScreen/WinScreen';
import { ICar } from '../../shared/interfaces/ICar';

let cars: Car[];
export class Garage extends Basecomponent {
  private createForm: Basecomponent = new Basecomponent('form', ['form']);

  private createInput: Input = new Input('input', 'input');

  private createColor: Input = new Input('color', 'color');

  private createSubmit: Button = new Button('Create', 'generalButton', 'submit');

  private updateForm: Basecomponent = new Basecomponent('form', ['form']);

  private updateInput: Input = new Input('input', 'input');

  private updateColor: Input = new Input('color', 'color');

  private updateSubmit: Button = new Button('Update', 'generalButton', 'submit');

  private raceControl: Basecomponent = new Basecomponent('div', ['raceControl']);

  private raceButton: Button = new Button('Race', 'controlButton');

  private resetButton: Button = new Button('Reset', 'controlButton');

  private generButton: Button = new Button('Generate cars', 'generalButton');

  private cars: Basecomponent = new Basecomponent('div', ['cars']);

  private pagination: Basecomponent = new Basecomponent('div', ['pagin']);

  private nextPage: Button = new Button('next', 'controlButton');

  private prevPage: Button = new Button('prev', 'controlButton');

  private garageTitle: Basecomponent = new Basecomponent('h2', ['title']);

  private page: Basecomponent = new Basecomponent('h3', ['subtitle']);

  private winScreen: WinScreen = new WinScreen();

  constructor() {
    super('div', ['Garage']);
    this.element.append(this.createForm.element);

    this.createForm.element.append(this.createInput.element);
    this.createForm.element.append(this.createColor.element);
    this.createForm.element.append(this.createSubmit.element);
    this.element.append(this.updateForm.element);
    this.createSubmit.element.disabled = true;

    this.updateForm.element.append(this.updateInput.element);
    this.updateForm.element.append(this.updateColor.element);
    this.updateForm.element.append(this.updateSubmit.element);
    this.updateInput.element.disabled = true;
    this.updateColor.element.disabled = true;
    this.updateSubmit.element.disabled = true;

    this.updateColor.element.value = colors.white;
    this.createColor.element.value = colors.white;

    this.element.append(this.raceControl.element);

    this.raceControl.element.append(this.raceButton.element);
    this.raceControl.element.append(this.resetButton.element);
    this.raceControl.element.append(this.generButton.element);

    this.element.append(this.garageTitle.element);

    this.element.append(this.page.element);

    this.element.append(this.cars.element);

    this.element.append(this.pagination.element);
    this.pagination.element.append(this.prevPage.element);
    this.pagination.element.append(this.nextPage.element);

    this.updateStateGarage();
    document.body.prepend(this.winScreen.element);
    this.winScreen.element.style.display = 'none';

    this.createForm.element.addEventListener('submit', async (event) => {
      event.preventDefault();
      await createCar({ name: this.createInput.element.value, color: this.createColor.element.value });
      this.createColor.element.value = colors.white;
      this.createInput.element.value = '';
      this.updateStateGarage();
    });

    this.updateForm.element.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = this.updateInput.element.value;
      const color = this.updateColor.element.value;
      await updateCar(store.selectedCar as number, { name, color });
      this.updateStateGarage();

      store.selectedCar = null;
      this.updateInput.element.disabled = true;
      this.updateColor.element.disabled = true;
      this.updateSubmit.element.disabled = true;
      this.updateColor.element.value = colors.white;
      this.updateInput.element.value = '';
    });

    this.nextPage.element.addEventListener('mousedown', () => {
      store.carsPage++;
      this.updateStateGarage();
    });
    this.prevPage.element.addEventListener('mousedown', () => {
      store.carsPage--;
      this.updateStateGarage();
    });

    this.resetButton.element.addEventListener('mousedown', () => this.resetCars());
    this.raceButton.element.addEventListener('mousedown', () => this.race());

    this.generButton.element.addEventListener('mousedown', () => this.generationRandomCar());
    this.createInput.element.addEventListener('input', () => {
      if (this.createInput.element.value === '') {
        this.createSubmit.element.disabled = true;
      } else {
        this.createSubmit.element.disabled = false;
      }
    });
  }

  updateStateGarage = async (): Promise<void> => {
    const CARS_ON_PAGE = 7;
    const FIRST_PAGE = 1;
    const COUNT_CAR_ON_PAGE = 0;
    const { items, count } = await getCars(store.carsPage);
    if (items.length === COUNT_CAR_ON_PAGE && store.carsPage !== FIRST_PAGE) {
      store.carsPage--;
      this.updateStateGarage();
    } else {
      store.cars = items;
      store.carsCount = Number(count);
      this.cars.element.innerHTML = '';
      cars = [];
      store.cars.forEach((item: ICar) => {
        const car = new Car(item.id, item.name, item.color);
        cars.push(car);
        car.selectButton.element.addEventListener('mousedown', () => this.selectCar(item.id, item.name, item.color));
        car.removeButton.element.addEventListener('mousedown', () => this.deleteCar(item.id, car));
        this.cars.element.appendChild(car.element);
      });

      this.garageTitle.element.innerHTML = `Garage (${store.carsCount})`;
      this.page.element.innerHTML = `Page #${store.carsPage}`;
      if (store.carsCount > store.carsPage * CARS_ON_PAGE) {
        this.nextPage.element.disabled = false;
      } else {
        this.nextPage.element.disabled = true;
      }
      if (store.carsPage > FIRST_PAGE) {
        this.prevPage.element.disabled = false;
      } else {
        this.prevPage.element.disabled = true;
      }
    }
  };

  selectCar = (id: number, name: string, color: string): void => {
    this.updateInput.element.disabled = false;
    this.updateColor.element.disabled = false;
    this.updateSubmit.element.disabled = false;
    this.updateColor.element.value = color;
    this.updateInput.element.value = name;
    store.selectedCar = id;
  };

  resetCars = (): void => {
    cars.map((car) => car.stopDriving(car.id));
    this.raceButton.element.disabled = false;
    this.winScreen.element.style.display = 'none';
  };

  deleteCar = async (id: number, car: Car): Promise<void> => {
    await deleteWinner(id);
    await deleteCar(id);
    car.element.remove();
    this.updateStateGarage();
  };

  race = async (): Promise<void> => {
    this.raceButton.element.disabled = true;
    const startDrivings = cars.map((car) => car.startDriving);
    const winner = await race(startDrivings);
    await saveWinner(winner);
    this.winScreen.renderWinScreen(winner.name as string, winner.time);
    this.winScreen.element.style.display = 'block';
  };

  generationRandomCar = (): void => {
    const COUNT_RANDOM_CAR = 100;
    const FIRST_RANDOM_CAR = 0;
    for (let i = FIRST_RANDOM_CAR; i < COUNT_RANDOM_CAR; i++) {
      createCar({ name: getRandomName(), color: getRandomColor() });
    }
    this.updateStateGarage();
  };
}
