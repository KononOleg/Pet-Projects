import { ICar } from './interfaces/ICar';
import { IWinner } from './interfaces/IWinner';
import { IWinners } from './interfaces/IWinners';

const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

const ERROR_NOT_FOUND = 404;
const STATUS_OK = 200;
const CARS_ON_PAGE = 7;
const WINNERS_ON_PAGE = 10;

export const getCars = async (page: number, limit = CARS_ON_PAGE): Promise<{ items: ICar[]; count: string }> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count') as string,
  };
};

export const getCar = async (id: number): Promise<ICar> => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: { name: string; color: string }): Promise<void> => (
  await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).json();

export const deleteCar = async (id: number): Promise<void> => (
  await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  })
).json();

export const updateCar = async (id: number, body: { name: string; color: string }): Promise<void> => (
  await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).json();

export const startEngine = async (id: number): Promise<{ velocity: number; distance: number }> => (await fetch(`${engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id: number): Promise<void> => (await fetch(`${engine}?id=${id}&status=stoped`)).json();

export const drive = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return res.status !== STATUS_OK ? { success: false } : { ...(await res.json()) };
};

const getSortOrder = (sort: string, order: string) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getWinners = async ({
  page, limit = WINNERS_ON_PAGE, sort, order,
}: { page: number; limit?: number; sort?: string; order?: string }): Promise<{ items: IWinners[]; count: string }> => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort as string, order as string)}`);
  const items = await response.json();

  return {
    items: await Promise.all(items.map(async (winner: { id: number }) => ({ ...winner, car: await getCar(winner.id) }))),
    count: response.headers.get('X-Total-Count') as string,
  };
};

const getWinner = async (id: number): Promise<IWinner> => (await fetch(`${winners}/${id}`)).json();
const getWinnerStatus = async (id: number) => (await fetch(`${winners}/${id}`)).status;

export const deleteWinner = async (id: number): Promise<void> => {
  const winnersStatus = await getWinnerStatus(id);
  if (winnersStatus !== ERROR_NOT_FOUND) {
    (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();
  }
};

const createWinner = async (body: IWinner): Promise<void> => (
  await fetch(`${winners}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).json();

const updateWinner = async (id: number, body: IWinner): Promise<void> => (
  await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).json();

export const saveWinner = async ({ id, time }: { id: number; time: number }): Promise<void> => {
  const winnersStatus = await getWinnerStatus(id);
  const FIRST_WIN = 1;
  if (winnersStatus === ERROR_NOT_FOUND) {
    await createWinner({ id, wins: FIRST_WIN, time });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: ++winner.wins,
      time: time < winner.time ? time : winner.time,
    });
  }
};
