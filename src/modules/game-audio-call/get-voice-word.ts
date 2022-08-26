import { baseURL, fetchRequest, IwordsLIst } from '../tutorial/fetch/fetch';
import { IDomNode } from '../tutorial/function-create-dom-node';
import { IdataFromServer } from '../tutorial/get words/render-result-find-to-page';
// eslint-disable-next-line import/no-cycle
import { addToMarkupWords } from './get-list-words';
import { buttonCallVoice, buttonCallVoiceBack } from './markup';
import { addToPageResults } from './results_game';
import { addSessionStorage, deleteSessionStorage, getSessinoStorage } from './sessionStorage';

export const shuffle = (array:IdataFromServer[]) => {
  array.sort(() => Math.random() - 0.5);
};

const getWordsFromServer = async () => {
  const argumentForFetch: IwordsLIst = {
    page: '2',
    group: '0',
  };
  await fetchRequest.getNewWordsLIst(argumentForFetch).then((data) => {
    addSessionStorage('game-audio-call', data);
  });
  return getSessinoStorage('game-audio-call');
};
// eslint-disable-next-line max-len
export const randomNumberWord = (data: IdataFromServer[]) => Math.floor(Math.random() * data.length);

const choiсeNextWord = async (data: IdataFromServer[]): Promise<IdataFromServer | false> => {
  const savedData = getSessinoStorage('game-audio-call');
  if (savedData && savedData.length === 0) {
    await getWordsFromServer();
  }
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

export const addWordsToPage = async () => {
  let savedData: IdataFromServer[];
  if (getSessinoStorage('game-audio-call').length !== 0) {
    savedData = getSessinoStorage('game-audio-call');
  } else {
    savedData = await getWordsFromServer();
  }
  const word = await choiсeNextWord(savedData);
  if (word) {
    buttonCallVoice.setAttribute('data-voice', word.audio);
    buttonCallVoice.id = word.id;
    addToMarkupWords();
    setTimeout(() => {
      const buttonBackImg = document.querySelector('.container-game-audio-call__button-call-voice__back') as HTMLElement;
      buttonBackImg.style.backgroundImage = `url(${baseURL}${word!.image})`;
      const buttonBackImgText = buttonBackImg.querySelector('.button-call-voice__back__word-translate') as HTMLSpanElement;
      buttonBackImgText.innerText = word.word;
    }, 800);
  }
};

addWordsToPage();
