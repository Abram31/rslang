import { fetchRequest, getWords } from '../fetch/fetch';
import { showWords } from './render-result-find-to-page';

const button = document.querySelector('button') as HTMLButtonElement;
const afterClick = (e: MouseEvent) => {
  e.preventDefault();
  const inputPageText = (document.getElementById('page') as HTMLInputElement).value;
  const inputGroupText = (document.getElementById('group') as HTMLInputElement).value;
  console.log(inputPageText);
  console.log(inputGroupText);
  //   getWords({ page: inputPageText, group: inputGroupText }).then((data) => {
  //     console.log(data);
  //     showWords(data);
  //   });
  fetchRequest.getNewWordsLIst({ page: inputPageText, group: inputGroupText }).then((data) => {
    console.log(data);
    showWords(data);
  });
};
button.addEventListener('click', afterClick);
//   .then((data) => {
//     console.log(data);

//     showWords(data);
//   });
// });
