import { ICar } from "./interfaces/ICar";
import { IWinners } from "./interfaces/IWinners";

const FIRST_VALUE = 1;

interface IStore {
  animation: { [id: number]: { id: number } };
  cars: ICar[];
  carsCount: number;
  carsPage: number;
  selectedCar: number | null;
  winners: IWinners[];
  winnersCount: number;
  winnersPage: number;
  sortBy: string;
  sortOrder: string;
}

export const store: IStore = {
  animation: {},
  cars: [],
  carsCount: FIRST_VALUE,
  carsPage: FIRST_VALUE,
  selectedCar: null,
  winners: [],
  winnersCount: FIRST_VALUE,
  winnersPage: FIRST_VALUE,
  sortBy: "",
  sortOrder: "",
};
