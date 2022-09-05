import createDomNode from '../function-create-dom-node';
import createWordContainer from '../create-word-container';
import getDifficultStudiedWords from './get_difficult_studied_words';
import './difficult_words.scss';
import preload from '../../game-audio-call/preload';
import { miniButtonGames } from '../markup';
import { IdataFromServer } from '../../../interface/interface';
import { body } from '../get words/render-result-find-to-page';
import App from '../../../components/app';

const addDifficultWordsToPage = async () => {
  body.style.backgroundColor = '#44b9b9';
  const root = document.getElementById('root') as HTMLDivElement;
  const prel = preload();
  root.append(prel);
  await getDifficultStudiedWords();
  const difficultWords:IdataFromServer[] = JSON.parse(sessionStorage.getItem('difficult-words') as string);

  if (document.querySelector('.tutorial__difficult-words')) {
    root.innerHTML = '';
  }

  const difficultWord = {
    typeElement: 'div',
    className: 'tutorial__difficult-words',
    parentElement: root,
  };
  const containerDifficultWords = createDomNode(difficultWord);

  const descriptionTitle = {
    typeElement: 'h5',
    className: 'wrapper-difficult-words__title',
    text: 'Сложные слова',
    parentElement: containerDifficultWords,
  };
  createDomNode(descriptionTitle);

  const descriptionWrapperWords = {
    typeElement: 'div',
    className: 'wrapper-difficult-words',
    parentElement: containerDifficultWords,
  };

  const wrapperWord = createDomNode(descriptionWrapperWords);

  miniButtonGames(root);

  if (difficultWords.length) {
    difficultWords.forEach(async (word, index) => {
      wrapperWord.append(createWordContainer(word, word._id));

      if (difficultWords.length - 1 === index) {
        prel.remove();
      }
    });
    const wrapperWords = wrapperWord.querySelectorAll('.container-tutorial__wrapper-word');
    wrapperWords.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      (el.querySelector('.hard') as HTMLImageElement).src = './assets/svg/icons/tutorial/star-word.svg';
    });
    if (wrapperWords.length < 5) {
      const descriptionNotWord = {
        typeElement: 'h5',
        className: 'wrapper-difficult-words__not-using',
        text: 'Вы не можете использовать игры со сложными словами если у вас меньше 5 сложных слов',
        parentElement: containerDifficultWords,
      };
      createDomNode(descriptionNotWord);
      const buttonAudioCall = document.querySelector('.container-buttons__game-audio-call') as HTMLButtonElement;
      buttonAudioCall.disabled = true;
      buttonAudioCall.style.pointerEvents = 'none';
      const buttonSprint = document.querySelector('.container-buttons__game-sprint') as HTMLButtonElement;
      buttonSprint.disabled = true;
      buttonSprint.style.pointerEvents = 'none';
    }
  } else {
    prel.remove();
    document.querySelector('.wrapper-difficult-words')?.remove();
    const descriptionNotWord = {
      typeElement: 'h5',
      className: 'wrapper-difficult-words__not-world',
      text: 'Этот раздел пуст, вы еще не отметили сложных слов',
      parentElement: containerDifficultWords,
    };
    createDomNode(descriptionNotWord);

    (document.querySelector('.container-buttons__game-audio-call') as HTMLButtonElement).disabled = true;
    (document.querySelector('.container-buttons__game-sprint') as HTMLButtonElement).disabled = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  wrapperWord.addEventListener('click', (e) => listener(e));
};

async function listener(e: Event) {
  const event = e.target as HTMLElement;
  if (event.classList.contains('hard')) {
    new App().deleteUserWord(((event.parentNode as HTMLElement).dataset.id) as string)
      .then(() => addDifficultWordsToPage());
  }
  if (event.classList.contains('studied')) {
    new App().putUserWord(((event.parentNode as HTMLElement).dataset.id) as string)
      .then(() => addDifficultWordsToPage());
  }
}

export default addDifficultWordsToPage;
