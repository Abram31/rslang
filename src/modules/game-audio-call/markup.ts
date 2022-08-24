import './game-audio-call.scss';
import { createDomNode } from '../tutorial/function-create-dom-node';
import { body } from '../tutorial/get words/render-result-find-to-page';

const fragmentSprint = document.createDocumentFragment();

const descriptionContainerAudioCall = {
  typeElement: 'section',
  className: 'container-game-audio-call',
  parentElement: fragmentSprint,
};
const containerAudioCall = createDomNode(descriptionContainerAudioCall);

const descriptionWrapperVoiceLivesLang = {
  typeElement: 'div',
  className: 'container-game-audio-call__wrapper-voice-lives-lang',
  parentElement: containerAudioCall,
};
const wrapperVoiceLivesLang = createDomNode(descriptionWrapperVoiceLivesLang);

const descriptionWrapperStepGame = {
  typeElement: 'ul',
  className: 'container-game-audio-call__wrapper-step-game',
  parentElement: wrapperVoiceLivesLang,
};
export const wrapperStepGame = createDomNode(descriptionWrapperStepGame);

export const descriptionStepGame = {
  typeElement: 'li',
  className: 'wrapper-step-game__step-game',
  parentElement: wrapperStepGame,
};

const descriptionLangs = {
  typeElement: 'ul',
  className: 'wrapper-voice-lives-lang__langs',
  parentElement: wrapperVoiceLivesLang,
};
const wrapperLangs = createDomNode(descriptionLangs);

export const descriptionEnglish = {
  typeElement: 'li',
  className: 'langs__en',
  text: 'EN',
  parentElement: wrapperLangs,
};
 const english = createDomNode(descriptionEnglish);


export const descriptionSlash = {
  typeElement: 'li',
  className: 'langs__slash',
  text: '/',
  parentElement: wrapperLangs,
};
const slash = createDomNode(descriptionSlash);


export const descriptionRus = {
  typeElement: 'li',
  className: 'langs__ru',
  text: 'RU',
  parentElement: wrapperLangs,
};
const russian = createDomNode(descriptionRus);

const descriptionWrapperCallVoice = {
  typeElement: 'div',
  className: 'container-game-audio-call__wrapper-call-voice',
  parentElement: containerAudioCall,
};
const wrapperCallVoice = createDomNode(descriptionWrapperCallVoice);

const descriptionButtonCallVoice = {
  typeElement: 'div',
  className: 'container-game-audio-call__button-call-voice',
  parentElement: wrapperCallVoice,
};
// eslint-disable-next-line import/prefer-default-export
export const buttonCallVoice = createDomNode(descriptionButtonCallVoice);

const descriptionButtonCallVoiceBack = {
  typeElement: 'div',
  className: 'container-game-audio-call__button-call-voice__back',
  parentElement: wrapperCallVoice,
};
// eslint-disable-next-line import/prefer-default-export
export const buttonCallVoiceBack = createDomNode(descriptionButtonCallVoiceBack);

const descriptionWrapperWords = {
  typeElement: 'ul',
  className: 'container-game-audio-call__wrapper-words',
  parentElement: containerAudioCall,
};
export const wrapperWords = createDomNode(descriptionWrapperWords);

const descriptionWord = {
  typeElement: 'li',
  className: 'wrapper-words__word',
  text: 'word-1',
  parentElement: wrapperWords,
};

export const descriptionButtonDontKnow = {
  typeElement: 'li',
  className: 'wrapper-words__dont-know',
  text: 'Не знаю',
};
// createDomNode(descriptionButtonDontKnow);

body.appendChild(fragmentSprint);


