import { IdataStatistics } from './interface';

export type WordDescription = {
  nameGame: boolean;
  dateLearnedWord: string;
  firstlyUsedWord: string;
  id: string;
  correctAnswers: number;
  lastUsedWord?: string;
};

export type TfindWordInData = {
  index?: number,
  oldDataWord?: WordDescription[],
  oldrDataUser: IdataStatistics,
};
