import { ICar } from './interfaces/ICar';
import { store } from './store';

function getPositionAtCenter(element: HTMLElement): { x: number; y: number } {
  const HALF = 2;
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();
  return {
    x: left + width / HALF,
    y: top + height / HALF,
  };
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
  const aPos = getPositionAtCenter(a);
  const bPos = getPositionAtCenter(b);

  return Math.hypot(aPos.x - bPos.x, aPos.y - bPos.y);
}

export function animation(car: HTMLElement, distance: number, animationTime: number): { id: number } {
  const DEFAULT_VALUE = 0;
  let start = DEFAULT_VALUE;
  const state = { id: DEFAULT_VALUE };
  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));

    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }
  state.id = window.requestAnimationFrame(step);
  return state;
}

export const raceAll = async (promises: Promise<{ success: boolean; id: number; time: number }>[], ids: number[]): Promise<{ id: number; name: string; color: string; time: number }> => {
  const { success, id, time } = await Promise.race(promises);
  const MS_IN_MINUTE = 1000;
  const DIGITS_AFTER_DECIMAL = 2;
  const INDEX = 1;
  if (!success) {
    const faildeIndex = ids.findIndex((i: number) => i === id);
    const restPromises = [...promises.slice(0, faildeIndex), ...promises.slice(faildeIndex + INDEX, promises.length)];
    const restIds = [...ids.slice(0, faildeIndex), ...ids.slice(faildeIndex + INDEX, ids.length)];

    return raceAll(restPromises, restIds);
  }

  return { ...(store.cars.find((car: { id: number }) => car.id === id) as ICar), time: +(time / MS_IN_MINUTE).toFixed(DIGITS_AFTER_DECIMAL) };
};

export const race = async (actions: ((id: number) => Promise<{ success: boolean; id: number; time: number }>)[]): Promise<{ id: number; name: string; color: string; time: number }> => {
  const promises = store.cars.map((car: ICar, index: number) => actions[index](car.id));
  const winner = await raceAll(
    promises,
    store.cars.map((car: { id: number }) => car.id),
  );
  return winner;
};

export function getRandomName(): string {
  const models = ['BMW', 'Opel', 'Audi', 'Ford', 'Renault', 'Nissan', 'Toyota', 'Skoda', 'Isuza', 'Kia', 'Lada', 'Honda'];
  const names = ['Golf', 'Tiguan', 'Camry', 'CR-V', 'Silverado', 'Civic', 'RAV4', 'Corolla', 'Logan', 'Largus', 'Solaris', 'Creta'];

  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  const LETTER_IN_COLOR = 6;
  const FIRST_LETTER = 0;
  for (let i = FIRST_LETTER; i < LETTER_IN_COLOR; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}
