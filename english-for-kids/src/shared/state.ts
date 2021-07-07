import ICard from './interfaces/ICard';

const state = {
  isGame: false,
  category: '',
  cards: [] as ICard[],
  MAIN_PAGE: 'main',
  STATS_PAGE: 'stats',
  REPEAT_PAGE: 'repeat',
  RESULT_RIGHT: 'right',
  RESULT_NOT_RIGHT: 'not right',
  RESULT_COMPLETE: 'complete',
  orderBy: 'prev',
  sortBy: 'category',
};

export default state;
