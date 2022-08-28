import { fetchRequest, getWords } from '../fetch/fetch';
import { showWords } from './render-result-find-to-page';

const button = document.querySelector('button') as HTMLButtonElement;
const afterClick = (e: MouseEvent) => {
  e.preventDefault();
  const inputPageText = (document.getElementById('page') as HTMLInputElement).value;
  const inputGroupText = (document.getElementById('group') as HTMLInputElement).value;

  fetchRequest.getNewWordsLIst({ page: inputPageText, group: inputGroupText }).then((data) => {
    showWords(data);
  });
};
button.addEventListener('click', afterClick);
