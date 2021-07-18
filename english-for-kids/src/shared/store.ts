import ICard from "./interfaces/ICard";
import ICards from "./interfaces/ICards";

const store = {
  cards: [] as ICard[],
  allCards: [] as ICards[],
  MAIN_PAGE: "main",
  RESULT_RIGHT: "right",
  RESULT_NOT_RIGHT: "not right",
  RESULT_COMPLETE: "complete",
  orderBy: "prev",
  sortBy: "category",
};

export default store;
