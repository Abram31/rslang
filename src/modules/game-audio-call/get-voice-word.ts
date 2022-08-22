import { fetchRequest, IwordsLIst } from '../tutorial/fetch/fetch';
import { IDomNode } from '../tutorial/function-create-dom-node';
import { IdataFromServer } from '../tutorial/get words/render-result-find-to-page';
// eslint-disable-next-line import/no-cycle
import { addToMarkupWords } from './get-list-words';
import { buttonCallVoice } from './markup';
import { addSessionStorage, getSessinoStorage } from './sessionStorage';

export const shuffle = (array:IdataFromServer[]) => {
  array.sort(() => Math.random() - 0.5);
};

const getWordsFromServer = async () => {
  const argumentForFetch: IwordsLIst = {
    page: '2',
    group: '2',
  };
  await fetchRequest.getNewWordsLIst(argumentForFetch).then((data) => {
    addSessionStorage('game-audio-call', data);
    addSessionStorage('used-words-in-audio-call', []);
  });
};

// eslint-disable-next-line max-len
export const randomNumberWord = (data: IdataFromServer[]) => Math.floor(Math.random() * data.length);

const choiсeNextWord = (data: IdataFromServer[]): IdataFromServer => {
  const savedData = getSessinoStorage('game-audio-call');
  if (savedData.length === 0) {
    getWordsFromServer();
  }
  const randomNumber = randomNumberWord(savedData);
  const usedIndexWords = getSessinoStorage('used-index-words-in-audio-call');
  // console.log(usedIndexWords);
  // console.log(savedData);

  if (usedIndexWords.includes(randomNumber)) {
    if (usedIndexWords.length >= savedData.length) {
      addSessionStorage('used-index-words-in-audio-call', []);
    }
    return choiсeNextWord(data);
  }
  usedIndexWords.push(randomNumber);
  addSessionStorage('used-index-words-in-audio-call', usedIndexWords);
  // console.log(randomNumber);
  console.log(data[randomNumber].word);
  return savedData[randomNumber];
};

export const addWordsToPage = async () => {
  // await getWordsFromServer();
  const savedData: IdataFromServer[] = await getSessinoStorage('game-audio-call');
  const word = await choiсeNextWord(savedData);
  // savedData.filter((item) => item.id !== word.id);
  buttonCallVoice.setAttribute('data-voice', word.audio);
  buttonCallVoice.id = word.id;
  addToMarkupWords();
};

addWordsToPage();
