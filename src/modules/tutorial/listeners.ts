import { fetchRequest } from './fetch/fetch';
import { IdataFromServer, showWords } from './get words/render-result-find-to-page';
import { createWordContainer } from './create-word-container';
import { changeBackgroundChapters } from './markup';
import App from '../../components/app';
import getDifficultWords from './difficult_words/get_difficult_studied_words';
import addDifficultWordsToPage from './difficult_words/add_difficult_words_to_page';
import Statistics from '../statistics/statistics';

export const addListenersToChoicePageChapter = async() => {
  const valuePage = (document.getElementById('select-pages') as HTMLSelectElement);
  const valuePart = (document.getElementById('select-parts') as HTMLSelectElement);

  const containerWords = document.querySelector('.container-tutorial__container-words') as HTMLElement;

  const fetchRequestToWords = (numberPage: string | number, numberPart: string | number) => {
    fetchRequest.getNewWordsLIst({ page: String(numberPage), group: String(numberPart) })
      .then((data) => {
        containerWords.innerHTML = '';
        data.forEach((word: IdataFromServer) => {
          const fragmentWord = createWordContainer(word);
          containerWords.appendChild(fragmentWord);
        });
      });
  };

  valuePage.addEventListener('change', async (event: Event) => {
    const element = event.target as HTMLSelectElement;
    const numberPage = element.value.split(' ').slice(-1)[0];
    const numberPart = +valuePart.value.split(' ').slice(-1)[0] || '';

    if (+numberPage) {
      sessionStorage.setItem('page-number', numberPage!);
      await fetchRequestToWords(String(Number(numberPage) - 1), String(Number(numberPart) - 1));
    }
  });

  valuePart.addEventListener('change', async (event: Event) => {
    const element = event.target as HTMLSelectElement;
    const numberPart = element.value.split(' ').slice(-1)[0];
    const numberPage = +valuePage.value.split(' ').slice(-1)[0] || '';

    if (+numberPart) {
      sessionStorage.setItem('chapter-number', numberPart!);
      await fetchRequestToWords(String(Number(numberPage) - 1), String(Number(numberPart) - 1));
      changeBackgroundChapters();
    }
  });

  // const statistics = await new App().getStatistics();                 /////////////////////УДАЛИТЬ!!!!!!!!!!!!!!!!!!!
  // console.log(statistics);
  // sessionStorage.setItem('statistics', JSON.stringify(statistics))
  // sessionStorage.getItem('statistics')

  // new Statistics().wordCorrectAnswer('55555555555555555555')
  new App().setStatistics().then((e)=>{
    console.log(e);
    
  })
  console.log('gfdlgkjdkjgkldjglkdf');
};

export const addListenersToTextBookPages = () => {
  const pageWithChapters = document.querySelector('.textbook__left-side') as HTMLElement;
  pageWithChapters.addEventListener('click', (event) => {
    const element = event.target as HTMLElement;
    if (element.classList.contains('chapter')) {
      const chapterNumber = (element.firstChild as HTMLElement).innerText.split(' ').slice(-1)[0];
      sessionStorage.setItem('chapter-number', chapterNumber);
    }
  });
};

export const addListenersToTextBookChapters = () => {
  const pageWithPages = document.querySelector('.select-page') as HTMLElement;
  pageWithPages.addEventListener('change', (event) => {
    const element = event.target as HTMLOptionElement;
    const chapterNumber = element.value;
    sessionStorage.setItem('page-number', chapterNumber!);
  });
  // clearSessionStorage();
};

