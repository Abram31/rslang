import { baseURL, fetchRequest, IwordsLIst } from '../tutorial/fetch/fetch';
import { addToMarkupWords } from './get-list-words';
import preload from './preload';
import { addToPageResults } from './results_game';
import { addSessionStorage, getSessinoStorage } from './sessionStorage';
import './game-audio-call.scss';
import getDifficultStudiedWords from '../tutorial/difficult_words/get_difficult_studied_words';
import Statistics from '../statistics/statistics';
import { IdataFromServer } from '../../interface/interface';

export const shuffle = (array: IdataFromServer[]) => {
  array.sort(() => Math.random() - 0.5);
};

export const getWordsFromServer = async (
  difficult?: boolean,
  chapter?: string,
  page?: string,

) => {
  const preloader = preload();
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
    await getDifficultStudiedWords();
    preloader.remove();
  } else {
    await fetchRequest.getNewWordsLIst(argumentForFetch).then((data) => {
      preloader.remove();
      sessionStorage.setItem('game-audio-call', JSON.stringify(data));
    });
  }
};

export const randomNumberWord = (
  data: IdataFromServer[],
) => Math.floor(Math.random() * data.length);

const choiсeNextWord = async (data: IdataFromServer[])
: Promise<IdataFromServer | false> => {
  let savedData = getSessinoStorage('game-audio-call');
  if (!savedData || savedData.length === 0) {
    await getWordsFromServer();
  }
  savedData = getSessinoStorage('game-audio-call');
  const randomNumber = randomNumberWord(savedData);
  const usedIndexWords = getSessinoStorage('used-index-words-in-audio-call');

  if (usedIndexWords.includes(savedData[randomNumber].id)
  || usedIndexWords.includes(savedData[randomNumber]._id)) {
    if (usedIndexWords.length >= savedData.length) {
      new Statistics('audio-call').setStatiscticAboutGame()
      addToPageResults();
      sessionStorage.setItem('used-index-words-in-audio-call', '[]');
      sessionStorage.setItem('unguessed-words-id', '[]'); /// /TODO данные на сервер
      return false;
    }
    return choiсeNextWord(data);
  }
  usedIndexWords.push(savedData[randomNumber].id || savedData[randomNumber]._id);
  addSessionStorage('used-index-words-in-audio-call', usedIndexWords);

  return savedData[randomNumber];
};

export const addWordsToPage = async () => {
  let savedData: IdataFromServer[];
  let word: boolean | IdataFromServer;

  const hash = window.location.href.split('/');
  const partHash = hash[hash.length - 2];
  const pageHash = hash[hash.length - 1];

  if (window.location.href.match(/random/)) {
    await getWordsFromServer(false, partHash, pageHash);
    savedData = getSessinoStorage('game-audio-call');
    word = await choiсeNextWord(savedData);
  } else if (window.location.href.match(/book\/games/)) {
    await getWordsFromServer(false, partHash, pageHash);
    savedData = getSessinoStorage('game-audio-call');
    word = await choiсeNextWord(savedData);
  } else if (window.location.href.match(/hard-word/)) {
    await getWordsFromServer(true);
    savedData = getSessinoStorage('game-audio-call');
    word = await choiсeNextWord(savedData);
  } else {
    return;
  }

  if (word) {
    const buttonCallVoice = document.querySelector('.container-game-audio-call__button-call-voice') as HTMLElement;
    buttonCallVoice.setAttribute('data-voice', word.audio);
    buttonCallVoice.id = word.id || word._id;
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
