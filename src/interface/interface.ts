import { WordDescription } from './type';

export interface SignInUser {
  email: string,
  password: string,
}

export interface CreateNewUser extends SignInUser {
  name: string,
}

export interface Attributes {
  [key: string ]: string;
}

export interface IdataStatistics {
  learnedWords: number,
  optional: {
    correctAnswersInGames(correctAnswersInGames: any): unknown;
    words: [WordDescription]
  }
}

export interface IdataAboutWordDificulty {
  difficulty: string,
  id: string,
  wordId: string,
}

export interface IdataFromServer {
  _id:string,
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
  userWord: {
    difficulty: string,
  }
}

export interface IDomNode {
  id?: string;
  typeElement: string;
  className?: string;
  text?: string;
  src?: string;
  type?: string;
  color?: string;
  colorText?: string;
  innerHTML?: string;
  dataAttribute?:string[];
  parentElement?: HTMLElement | HTMLInputElement | DocumentFragment;
}
