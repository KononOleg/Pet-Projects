import { playAudio } from "../../shared/PlayAudio";
import store from "../../shared/store";
import ICard from "../../shared/interfaces/ICard";

let audios: string[];
let activeAudio: string;
const EMPTY_AUDIOS = 0;

const getRandomAudio = (): string => audios[Math.floor(Math.random() * audios.length)];

export const playCurrentAudio = (): void => {
  playAudio(activeAudio);
};

export const startGame = (): void => {
  audios = store.cards.map((card: ICard) => card.audio);
  activeAudio = getRandomAudio();
  playAudio(activeAudio);
};
export const clickCard = (audio: string): string => {
  let res = "";
  if (activeAudio === audio) {
    audios.splice(Number(audios.indexOf(activeAudio)), 1);
    if (audios.length !== EMPTY_AUDIOS) {
      activeAudio = getRandomAudio();
      res = store.RESULT_RIGHT;
    } else {
      res = store.RESULT_COMPLETE;
    }
  } else {
    res = store.RESULT_NOT_RIGHT;
  }
  return res;
};
