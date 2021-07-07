import cards from '../../../public/cards';
import { IWord } from '../../shared/interfaces/IWord';

let db: IDBDatabase;

const add = (card: IWord): void => {
  const transaction = db.transaction(['notes'], 'readwrite');
  const store = transaction.objectStore('notes');
  const INITIAL_VALUE = 0;
  const newCard: IWord = {
    category: card.category,
    word: card.word,
    translation: card.translation,
    trained: INITIAL_VALUE,
    correct: INITIAL_VALUE,
    incorrect: INITIAL_VALUE,
    percent: INITIAL_VALUE,
  };
  store.add(newCard);
};

export const resetData = (): void => {
  const transaction = db.transaction(['notes'], 'readwrite');
  const store = transaction.objectStore('notes');
  store.clear();
  cards.map((words) => words.data.map((word) => add({ category: words.category, word: word.word, translation: word.translation })));
};

export const init = (): void => {
  const dbReq = indexedDB.open('test', 1);
  let dbShouldInit = false;

  dbReq.onupgradeneeded = () => {
    db = dbReq.result;
    const notes = db.createObjectStore('notes', {
      keyPath: 'id',
      autoIncrement: true,
    });

    notes.createIndex('category', 'category');
    notes.createIndex('word', 'word');
    notes.createIndex('translation', 'translation');
    notes.createIndex('trained', 'trained');
    notes.createIndex('correct', 'correct');
    notes.createIndex('incorrect', 'incorrect');
    notes.createIndex('percent', 'percent');
    dbShouldInit = true;
  };
  dbReq.onsuccess = () => {
    db = dbReq.result;
    if (dbShouldInit) resetData();
  };
};

export const overrideData = (word: string, index: string): void => {
  const transaction = db.transaction('notes', 'readwrite');
  const store = transaction.objectStore('notes');
  const wordIndex = store.index('word');
  const res = wordIndex.get(word);
  res.onsuccess = () => {
    res.result[index]++;
    const PERCENT = 100;
    const NULL = 0;
    if (res.result.correct !== NULL || res.result.incorrect !== NULL) {
      res.result.percent = Math.ceil((res.result.correct / (res.result.incorrect + res.result.correct)) * PERCENT);
    }
    store.put(res.result);
  };
};
export const getDiffWords = (): Promise<IWord[]> => {
  const transaction = db.transaction('notes', 'readonly');
  const store = transaction.objectStore('notes');
  const percentIndex = store.index('percent');
  const LOWER_VALUE = 0;
  const UPPER_VALUE = 100;
  const MAX_DIFF_WORDS = 8;
  const res = percentIndex.getAll(IDBKeyRange.bound(LOWER_VALUE, UPPER_VALUE, true, true), MAX_DIFF_WORDS);
  return new Promise((resolve) => {
    res.onsuccess = () => {
      resolve(res.result);
    };
  });
};

export const readAll = (sortBy: string, orderBy: string): Promise<IWord[]> => {
  const transaction = db.transaction('notes', 'readonly');
  const store = transaction.objectStore('notes');
  const res = store.index(sortBy).openCursor(null, orderBy as IDBCursorDirection);
  const data: IWord[] = [];

  return new Promise((resolve) => {
    res.onsuccess = () => {
      const cursor = res.result;
      if (cursor) {
        data.push(cursor.value);
        cursor.continue();
      } else {
        resolve(data);
      }
    };
  });
};
