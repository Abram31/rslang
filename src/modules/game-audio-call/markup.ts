import './game-audio-call.scss'
import { createDomNode } from '../tutorial/function-create-dom-node';
import { body } from '../tutorial/get words/render-result-find-to-page';

const fragmentSprint = document.createDocumentFragment();

const descriptionContainerAudioCall = {
  typeElement: 'section',
  className: 'container-game-audio-call',
  parentElement: fragmentSprint,
};
const containerAudioCall = createDomNode(descriptionContainerAudioCall);

const descriptionWrapperStepGame = {
  typeElement: 'ul',
  className: 'container-game-audio-call__wrapper-step-game',
  parentElement: containerAudioCall,
};
const wrapperStepGame = createDomNode(descriptionWrapperStepGame);

const descriptionStepGame = {
  typeElement: 'li',
  className: 'wrapper-step-game__step-game',
  parentElement: wrapperStepGame,
};
const stepGame = createDomNode(descriptionStepGame);

const descriptionButtonCallVoice = {
  typeElement: 'div',
  className: 'container-game-audio-call__button-call-voice',
  parentElement: containerAudioCall,
};
const buttonCallVoice = createDomNode(descriptionButtonCallVoice);

const descriptionWrapperWords = {
  typeElement: 'ul',
  className: 'container-game-audio-call__wrapper-words',
  parentElement: containerAudioCall,
};
const wrapperWords = createDomNode(descriptionWrapperWords);

const descriptionWord = {
  typeElement: 'li',
  className: 'wrapper-words__word',
  text: 'word-1',
  parentElement: wrapperWords,
};
const word = createDomNode(descriptionWord);
const word2 = createDomNode(descriptionWord);


const descriptionButtonDontKnow = {
  typeElement: 'li',
  className: 'wrapper-words__dont-know',
  text: 'Не знаю',
  parentElement: wrapperWords,
};
const buttonDontKnow = createDomNode(descriptionButtonDontKnow);

body.appendChild(fragmentSprint);

