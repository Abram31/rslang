import { fetchRequest } from './fetch/fetch';
import createWordContainer from './create-word-container';
import { changeBackgroundChapters } from './markup';
import { IdataFromServer } from '../../interface/interface';

function updateUrl(numberPart: number | string, numberPage: string | number) {
  window.location.href = `/#/book/section-${numberPart}/${numberPage}`;
}

export const addListenersToChoicePageChapter = async () => {
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

    if (numberPage) {
      sessionStorage.setItem('page-number', numberPage);
      await fetchRequestToWords(String(Number(numberPage) - 1), String(Number(numberPart) - 1));
    }
    updateUrl(numberPart, numberPage);
  });

  valuePart.addEventListener('change', async (event: Event) => {
    const element = event.target as HTMLSelectElement;
    const numberPart = element.value.split(' ').slice(-1)[0];
    const numberPage = +valuePage.value.split(' ').slice(-1)[0] || '';
    if (numberPart) {
      if (numberPart === 'слова') {
        sessionStorage.setItem('chapter-number', '7');
        window.location.href = '/#/book/section-7';
      } else {
        sessionStorage.setItem('chapter-number', numberPart);
        await fetchRequestToWords(String(Number(numberPage) - 1), String(Number(numberPart) - 1));
        changeBackgroundChapters();
        updateUrl(numberPart, numberPage);
      }
    }
  });
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
    sessionStorage.setItem('page-number', chapterNumber);
  });
};
