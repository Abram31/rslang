import { IdataStatistics } from './interface';

export type WordDescription = {
  id: string;
  correctAnswers: number;
  lastUsedWord?: string;
};

export type TfindWordInData = {
  index?: number,
  oldDataWord?: WordDescription[],
  oldrDataUser: IdataStatistics,
};
