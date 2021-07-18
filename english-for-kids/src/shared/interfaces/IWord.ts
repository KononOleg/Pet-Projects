export interface IWord {
  category: string;
  word: string;
  translation: string;
  trained?: number;
  correct?: number;
  incorrect?: number;
  percent?: number;
}
