import './game-audio-call.scss';
import createDomNode from '../tutorial/function-create-dom-node';
import { body } from '../tutorial/get words/render-result-find-to-page';

const baseMarkupAudioCall = () => {
  const wrap = document.getElementById('root') as HTMLDivElement;

  const fragmentSprint: DocumentFragment = document.createDocumentFragment();

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
  createDomNode(descriptionWrapperStepGame);

  const descriptionLangs = {
    typeElement: 'ul',
    className: 'wrapper-voice-lives-lang__langs',
    parentElement: wrapperVoiceLivesLang,
  };
  const wrapperLangs = createDomNode(descriptionLangs);

  const descriptionEnglish = {
    typeElement: 'li',
    className: 'langs__en',
    text: 'EN',
    parentElement: wrapperLangs,
  };
  const english = createDomNode(descriptionEnglish);
  if (localStorage.getItem('language') === 'en') {
    english.classList.add('active');
  }

  const descriptionSlash = {
    typeElement: 'li',
    className: 'langs__slash',
    text: '/',
    parentElement: wrapperLangs,
  };
  createDomNode(descriptionSlash);

  const descriptionRus = {
    typeElement: 'li',
    className: 'langs__ru',
    text: 'RU',
    parentElement: wrapperLangs,
  };
  const russian = createDomNode(descriptionRus);
  if (localStorage.getItem('language') === 'ru' || localStorage.getItem('language') === null) {
    russian.classList.add('active');
  }

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
  createDomNode(descriptionButtonCallVoice);

  const descriptionButtonCallVoiceBack = {
    typeElement: 'div',
    className: 'container-game-audio-call__button-call-voice__back',
    parentElement: wrapperCallVoice,
  };
  const buttonCallVoiceBack = createDomNode(descriptionButtonCallVoiceBack);

  const descriptionTextWordInEnglish = {
    typeElement: 'span',
    className: 'button-call-voice__back__word-translate',
    parentElement: buttonCallVoiceBack,
  };
  createDomNode(descriptionTextWordInEnglish);

  const descriptionWrapperWords = {
    typeElement: 'ul',
    className: 'container-game-audio-call__wrapper-words',
    parentElement: containerAudioCall,
  };
  createDomNode(descriptionWrapperWords);

  const descriptionButtonDontKnow = {
    typeElement: 'li',
    className: 'wrapper-words__dont-know',
    text: 'Не знаю',
  };
  createDomNode(descriptionButtonDontKnow);

  body.style.backgroundImage = 'url(./assets/jpg/bg-audio-game.jpg)';

  wrap.appendChild(fragmentSprint);
};

export default baseMarkupAudioCall;
