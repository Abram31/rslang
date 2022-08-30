import { baseURL, fetchRequest, IwordsLIst } from '../tutorial/fetch/fetch';
import { createDomNode, IDomNode } from '../tutorial/function-create-dom-node';
import { body, IdataFromServer } from '../tutorial/get words/render-result-find-to-page';
// eslint-disable-next-line import/no-cycle
import { addToMarkupWords } from './get-list-words';
import preload from './preload';
import { addToPageResults } from './results_game';
import { addSessionStorage, deleteSessionStorage, getSessinoStorage } from './sessionStorage';
import './game-audio-call.scss';
import getDifficultStudiedWords from '../tutorial/difficult_words/get_difficult_studied_words';
import App from '../../components/app';

export const shuffle = (array: IdataFromServer[]) => {
  array.sort(() => Math.random() - 0.5);
};

export const getWordsFromServer = async (
  difficult?: boolean,
  chapter?: string,
  page?: string,

) => {
  const preloader = preload();
  debugger;
  let numberGroup = String(Number(window.location.hash.slice(-1)) - 1);
  let randomNumberPage = String(Math.floor(Math.random() * 30));
  if (chapter && page) {
    numberGroup = chapter;
    randomNumberPage = page;
  }
  const argumentForFetch: IwordsLIst = {
    page: page ? String(Number(page) - 1) : false || randomNumberPage,
    group: chapter ? String(Number(chapter) - 1) : false || numberGroup,
  };
  if (difficult) {
    const data = await getDifficultStudiedWords();
    await Promise.all(data.map(async ({ wordId }) => new App().getUserOneWord(wordId)))
      .then((difData) => {
        console.log(difData);
        sessionStorage.setItem('game-audio-call', JSON.stringify(difData));

        preloader.remove();
      });
  } else {
    await fetchRequest.getNewWordsLIst(argumentForFetch).then((data) => {
      preloader.remove();
      sessionStorage.setItem('game-audio-call', JSON.stringify(data));
    });
  }
};
// eslint-disable-next-line max-len
export const randomNumberWord = (data: IdataFromServer[]) => Math.floor(Math.random() * data.length);

const choiсeNextWord = async (data: IdataFromServer[], difficult?: boolean): Promise<IdataFromServer | false> => {
  let savedData = getSessinoStorage('game-audio-call');
  if (savedData && savedData.length === 0) {
    await getWordsFromServer();
  }
  savedData = getSessinoStorage('game-audio-call');
  const randomNumber = randomNumberWord(savedData);
  const usedIndexWords = getSessinoStorage('used-index-words-in-audio-call');

  if (usedIndexWords.includes(savedData[randomNumber].id)) {
    if (usedIndexWords.length >= savedData.length) {
      addToPageResults();
      sessionStorage.setItem('used-index-words-in-audio-call', '[]');
      sessionStorage.setItem('unguessed-words-id', '[]'); /// /TODO данные на сервер
      return false;
    }
    return choiсeNextWord(data);
  }
  usedIndexWords.push(savedData[randomNumber].id);
  addSessionStorage('used-index-words-in-audio-call', usedIndexWords);

  return savedData[randomNumber];
};

export const addWordsToPage = async (difficult?: boolean, chapter?: string, page?: string) => {
  let savedData: IdataFromServer[];
  let word: boolean | IdataFromServer;
  if (!getSessinoStorage('game-audio-call') || getSessinoStorage('game-audio-call').length !== 0) { //! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!// // надо что то сделать чтоб после запуска игры не отправлялись повторные запросы на слова????
    savedData = getSessinoStorage('game-audio-call');
    word = await choiсeNextWord(savedData);
  } else if (chapter && page) {
    await getWordsFromServer(difficult, chapter, page);
    savedData = getSessinoStorage('game-audio-call');
    word = await choiсeNextWord(savedData);
  } else {
    await getWordsFromServer(difficult);
    savedData = getSessinoStorage('game-audio-call');
    word = await choiсeNextWord(savedData, true);
  }
  if (word) {
    const buttonCallVoice = document.querySelector('.container-game-audio-call__button-call-voice') as HTMLElement;
    buttonCallVoice.setAttribute('data-voice', word.audio);
    buttonCallVoice.id = word.id;
    addToMarkupWords();
    setTimeout(() => {
      if (typeof word !== 'boolean') {
        const buttonBackImg = document.querySelector('.container-game-audio-call__button-call-voice__back') as HTMLElement;
        buttonBackImg.style.backgroundImage = `url(${baseURL}${word.image})`;
        const buttonBackImgText = buttonBackImg.querySelector('.button-call-voice__back__word-translate') as HTMLSpanElement;
        buttonBackImgText.innerText = word.word;
      }
    }, 800);
  }
};
