export const body = document.querySelector('body') as HTMLElement;

export const div = document.createElement('div') as HTMLElement;
body.append(div);

export interface IdataFromServer {

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
  textExampleTranslate: string

}

export const showWords = (data: Array<IdataFromServer>) => {
  div.innerHTML = '';
  data.forEach((object: object) => {
    const ul = document.createElement('ul') as HTMLElement;
    Object.entries(object).forEach((item) => {
      const li = document.createElement('li') as HTMLSpanElement;
      li.textContent = `${item[0]}:${item[1]}`;
      ul.append(li);
    });
    div.append(ul);
  });
};
