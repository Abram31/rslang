import { IdataFromServer } from '../../interface/interface';
import createDomNode from '../tutorial/function-create-dom-node';
import playAudio from '../tutorial/play-words';
import { randomNumberWord, shuffle } from './get-voice-word';
import { addSessionStorage, getSessinoStorage } from './sessionStorage';
import stepGameIndicator from './step-game-indicator';

export const addWords = (): IdataFromServer[] => {
  const result:IdataFromServer[] | never = [];
  const savedData: IdataFromServer[] = getSessinoStorage('game-audio-call') as IdataFromServer[];

  const voiceElement = (document.querySelector('.container-game-audio-call__button-call-voice') as HTMLElement);
  const idVoice = voiceElement.id;
  const correctWord = savedData.find((word) => word.id === idVoice || word._id === idVoice);
  if (correctWord) {
    result.push(correctWord);
  }
  for (let i = 0; i <= 3; i += 1) {
    const numberWord: number = randomNumberWord(savedData);

    if ((savedData && savedData[numberWord].id === idVoice)
    || result.includes(savedData[numberWord])) {
      i -= 1;
    } else if (JSON.parse(sessionStorage.getItem('list-game-audio') as string) || []) {
      result.push(savedData[numberWord]);
    }
  }

  result.length > 0 ? addSessionStorage('list-game-audio', result) : null;

  return result;
};

export const addToMarkupWords = () => {
  const wrapperWords = document.querySelector('.container-game-audio-call__wrapper-words') as HTMLUListElement;
  wrapperWords.innerHTML = '';
  stepGameIndicator();
  const data = addWords();
  const language = localStorage.getItem('language');
  shuffle(data);
  data.forEach((item, index) => {
    const descriptionWord = {
      typeElement: 'li',
      dataAttribute: ['keyboard-key', `${index + 1}`],
      className: 'wrapper-words__word',
      text: `${index + 1}. ${language === 'en' ? item.word : item.wordTranslate}`,
      parentElement: wrapperWords,
    };
    const word = createDomNode(descriptionWord);
    word.id = item.id || item._id;
  });
  const descriptionButtonDontKnow = {
    typeElement: 'li',
    className: 'wrapper-words__dont-know',
    text: '???? ????????',
  };
  wrapperWords.append(createDomNode(descriptionButtonDontKnow));
  const buttonCallVoice = document.querySelector('.container-game-audio-call__button-call-voice') as HTMLElement;
  const pathVoice = buttonCallVoice.getAttribute('data-voice') as string;
  playAudio(JSON.stringify([pathVoice]));
};
