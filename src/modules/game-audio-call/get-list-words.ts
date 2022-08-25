import { createDomNode } from '../tutorial/function-create-dom-node';
import { IdataFromServer } from '../tutorial/get words/render-result-find-to-page';
import playAudio from '../tutorial/play-words';
// eslint-disable-next-line import/no-cycle
import { randomNumberWord, shuffle } from './get-voice-word';
import { buttonCallVoice, descriptionButtonDontKnow, wrapperWords } from './markup';
import { addSessionStorage, getSessinoStorage, IData } from './sessionStorage';
import { stepGameIndicator } from './step-game-indicator';

export const addWords = (): IdataFromServer[] => {
  const result:IdataFromServer[] | never = [];
  const savedData: IdataFromServer[] = getSessinoStorage('game-audio-call') as IdataFromServer[];
  const voiceElement = (document.querySelector('.container-game-audio-call__button-call-voice') as HTMLElement);
  const idVoice = voiceElement.id;
  const correctWord = savedData.find((word) => word.id === idVoice);
  result.push(correctWord!);
  for (let i = 0; i <= 3; i += 1) {
    const numberWord: number = randomNumberWord(savedData);
    if (savedData && savedData[numberWord].id === idVoice) {
      i -= 1;
    } else if (getSessinoStorage('list-game-audio')) {
      result.push(savedData[numberWord]);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  result.length > 0 ? addSessionStorage('list-game-audio', result) : null;

  return result;
};

export const addToMarkupWords = () => {
  wrapperWords.innerHTML = '';
  stepGameIndicator();
  const data = addWords();
  let wordLang:string;
  const language = localStorage.getItem('language');

  shuffle(data);

  data.forEach((item) => {
    const descriptionWord = {
      typeElement: 'li',
      className: 'wrapper-words__word',
      text: language === 'en' ? item.word : item.wordTranslate,
      parentElement: wrapperWords,
    };
    const word = createDomNode(descriptionWord);
    word.id = item.id;
  });
  wrapperWords.append(createDomNode(descriptionButtonDontKnow));
  const pathVoice = buttonCallVoice.getAttribute('data-voice') as string;
  playAudio(pathVoice);
};