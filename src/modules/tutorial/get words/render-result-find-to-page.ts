import { IdataFromServer } from '../../../interface/interface';

export const body = document.querySelector('body') as HTMLElement;

export const div = document.createElement('div') as HTMLElement;
body.append(div);

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
