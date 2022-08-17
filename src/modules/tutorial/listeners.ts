import { fetchRequest } from './fetch/fetch';
import { IdataFromServer, showWords } from './get words/render-result-find-to-page';
import { createWordContainer } from './create-word-container';
// eslint-disable-next-line import/no-cycle
import { containerWords } from './markup';

const valuePage = (document.getElementById('select-pages') as HTMLSelectElement);
const valuePart = (document.getElementById('select-parts') as HTMLSelectElement);

const fetchRequestToWords = (numberPage: string | number, numberPart: string | number) => {
  fetchRequest.getNewWordsLIst({ page: String(numberPage), group: String(numberPart) })
    .then((data) => {
      console.log(data);
      containerWords.innerHTML = '';
      data.forEach((word: IdataFromServer) => {
        const fragmentWord = createWordContainer(word);
        containerWords.appendChild(fragmentWord);
      });
    });
};

valuePage.addEventListener('change', (event: Event) => {
  const element = event.target as HTMLSelectElement;
  const numberPage = element.value.split(' ').slice(-1)[0];
  const numberPart = +valuePart.value.split(' ').slice(-1)[0] || '';
  console.log(numberPage);

  if (+numberPage) {
    console.log(String(numberPage), numberPart);

    fetchRequestToWords(numberPage, numberPart);
  }
});

valuePart.addEventListener('change', (event: Event) => {
  const element = event.target as HTMLSelectElement;
  const numberPart = element.value.split(' ').slice(-1)[0];
  const numberPage = +valuePage.value.split(' ').slice(-1)[0] || '';
  console.log(numberPage);

  if (+numberPart) {
    console.log(String(numberPage), numberPart);
    fetchRequestToWords(numberPage, numberPart);
  }
});
