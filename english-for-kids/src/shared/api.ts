import ICard from "./interfaces/ICard";
import ICards from "./interfaces/ICards";
import { ICategory } from "./interfaces/ICategory";

const CATEGORIES = "categories";
const CARDS = "cards";
const LOGIN = "login";
const url = (endpont: string) => `https://sparkling-recondite-anaconda.glitch.me/api/${endpont}`;

export const getCategories = async (): Promise<ICards[]> => {
  const response = await fetch(url(CATEGORIES));

  return response.json();
};

export const updateCategory = async (category: string, newCategory: string): Promise<void> =>
  (
    await fetch(`${url(CATEGORIES)}/${category}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newCategory }),
    })
  ).json();

export const deleteCategory = async (category: string): Promise<void> =>
  (
    await fetch(`${url(CATEGORIES)}/${category}`, {
      method: "DELETE",
    })
  ).json();

export const getCards = async (category: string): Promise<ICard[]> => {
  const response = await fetch(`${url(CARDS)}/${category}`);
  return response.json();
};

export const getPageCards = async (category: string, page: number, limit = 6): Promise<ICard[]> => {
  const response = await fetch(`${url(CARDS)}/pageCards/${category}?page=${page}&limit=${limit}`);
  return response.json();
};
export const getPageCategories = async (page: number, limit = 9): Promise<ICategory[]> => {
  const response = await fetch(`${url(CATEGORIES)}/pageCategories?page=${page}&limit=${limit}`);
  return response.json();
};

export const updateCard = async (category: string, card: string, body: ICard): Promise<void> =>
  (
    await fetch(`${url(CARDS)}/${category}/${card}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  ).json();

export const deleteCard = async (category: string, card: string): Promise<void> =>
  (
    await fetch(`${url(CARDS)}/${category}/${card}`, {
      method: "DELETE",
    })
  ).json();

export const createCategory = async (category: string): Promise<void> =>
  (
    await fetch(`${url(CATEGORIES)}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ category }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
export const createCard = async (category: string, word: string, translation: string, audio: string, image: string): Promise<void> =>
  (
    await fetch(`${url(CARDS)}/${category}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        word,
        translation,
        audio,
        image,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const loginRequest = async (login: string, password: string): Promise<{ success: boolean }> =>
  (
    await fetch(`${url(LOGIN)}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const getAllCards = async (): Promise<ICards[]> => {
  const response = await fetch(`${url(CARDS)}`);
  return response.json();
};
