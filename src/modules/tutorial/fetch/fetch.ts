import preload from "../../game-audio-call/preload";
import { body } from "../get words/render-result-find-to-page";

export interface IwordsLIst {
  page: string,
  group: string
}

export const baseURL = 'https://base-rs-lang-1.herokuapp.com/';

class FetchRequest {
  private wordsUrl;

  constructor(
    baseUrl = baseURL,
    wordsUrl = `${baseUrl}words`,
  ) {
    this.wordsUrl = wordsUrl;
  }

  async getNewWordsLIst({ page, group }: IwordsLIst) {
    try {
      const prel = preload();
      body.append(prel);
      const fullUrl = `${this.wordsUrl}?page=${page}&group=${group}`;
      const response = await fetch(fullUrl);
      const result = await response.json();
      prel.remove();
      return result;
    } catch {
      Error('Errore getNewWords');
    }
    return null;
  }
}

export const fetchRequest = new FetchRequest();

export const getWords = fetchRequest.getNewWordsLIst.bind(fetchRequest);
