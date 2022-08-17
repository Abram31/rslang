export interface IwordsLIst {
  page: string,
  group:string
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

  // eslint-disable-next-line consistent-return
  async getNewWordsLIst({ page, group }: IwordsLIst) {
    try {
      const fullUrl = `${this.wordsUrl}?page=${page}&group=${group}`;
      const response = await fetch(fullUrl);
      return await response.json();
    } catch {
      Error('Errore getNewWords');
    }
  }
}

export const fetchRequest = new FetchRequest();

export const getWords = fetchRequest.getNewWordsLIst.bind(fetchRequest);
// getWords(descriptionWords).then((data) => { console.log(data); });
