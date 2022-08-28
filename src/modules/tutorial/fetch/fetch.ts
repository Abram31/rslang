export interface IwordsLIst {
  page: string,
  group:string
}

export const baseURL = 'https://base-rs-lang-1.herokuapp.com/';

export class FetchRequest {
  private wordsUrl;

  constructor(
    baseUrl = baseURL,
    wordsUrl = `${baseUrl}words`,
  ) {
    this.wordsUrl = wordsUrl;
  }

  async getNewWordsLIst({ page, group }: IwordsLIst) {
    try {
      const fullUrl = `${this.wordsUrl}?page=${page}&group=${group}`;
      const response = await fetch(fullUrl);
      const result = await response.json();
      return result;
    } catch {
      Error('Errore getNewWords');
    }
    return null;
  }
}

export const fetchRequest = new FetchRequest();

export const getWords = fetchRequest.getNewWordsLIst.bind(fetchRequest);
