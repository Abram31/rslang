import App from '../../components/app';
import Statistics from '../statistics/statistics';
import { body } from '../tutorial/get words/render-result-find-to-page';
import playAudio from '../tutorial/play-words';
import { cardFlipAfterChoice, cardUnflip } from './card-flip-after-choice';
import changeLanguages from './change-languages';
import changeVoiceLinkToImage from './change-voice-link-to-image';
import { addWordsToPage } from './get-voice-word';
import keyboardControl from './keyboard_control';
import { addToPageResults } from './results_game';
import { addSessionStorage, getSessinoStorage } from './sessionStorage';
import choiceWord from './word-choice';

const clickAudioGame = (event:MouseEvent) => {
  const element = event.target as HTMLDivElement;
  if (element.classList.contains('container-game-audio-call__button-call-voice')) {
    const pathToVoice = element.getAttribute('data-voice') as string;
    playAudio(JSON.stringify([pathToVoice]));
    changeVoiceLinkToImage();
  }
  if (element.classList.contains('wrapper-words__word')) {
    choiceWord(event);
    cardFlipAfterChoice();
    sessionStorage.setItem('touch-button-words', 'true');
  }
  if (element.classList.contains('wrapper-words__dont-know')) {
    if (sessionStorage.getItem('touch-button-words') === 'true') {
      const buttonVoice = document.querySelector('.container-game-audio-call__button-call-voice') as HTMLElement;
      const buttonVoiceId = buttonVoice.id;
      if (sessionStorage.getItem('correctness of the choice') === 'false') {
        addSessionStorage('unguessed-words-id', buttonVoiceId);
        localStorage.getItem('id') && new Statistics('audio-call').wordUncorrectAnswer(buttonVoiceId);
      } else {
        localStorage.getItem('id') && new Statistics('audio-call').wordCorrectAnswer(buttonVoiceId);
      }
      const ungessedWords: Array<string> = getSessinoStorage('unguessed-words-id');
      if (ungessedWords.length > 4) {
        localStorage.getItem('id') && new Statistics('audio-call').setStatiscticAboutGame();
        cardUnflip();
        addToPageResults();
        sessionStorage.removeItem('unguessed-words-id');
        sessionStorage.removeItem('touch-button-words');
      } else {
        addWordsToPage();
        sessionStorage.setItem('correctness of the choice', 'false');
        cardUnflip();
        sessionStorage.removeItem('touch-button-words');
      }
    } else {
      choiceWord(event);
      cardFlipAfterChoice();
      sessionStorage.setItem('touch-button-words', 'true');
    }
    localStorage.getItem('id') && new App().setStatistics();
  }

  if (element.classList.contains('langs__ru') || element.classList.contains('langs__en')) {
    changeLanguages(event);
  }
  if (element.classList.contains('wrapper-buttons__repeat')) {
    addWordsToPage();
    const sectionResult = element.closest('section') as HTMLElement;
    sectionResult.remove();
    sessionStorage.setItem('correctness of the choice', 'false');
  }
  if (element.classList.contains('wrapper-buttons__finish')) {
    window.location.hash = '/games';
    document.querySelectorAll('.navigation__item').forEach((el) => {
      el.classList.remove('active');
      if (el.getAttribute('href') === '#/games') {
        el.classList.add('active');
        (el.childNodes[1] as HTMLElement).classList.add('active');
      }
    });
  }

  if (element.classList.contains('wrapper-list__item')
      || element.classList.contains('word-ru')
      || element.classList.contains('word-en')) {
    const dataVoice = (element.closest('li') as HTMLLIElement).getAttribute('data-voice') as string;
    playAudio(JSON.stringify([dataVoice]));
  }
};

const addListeners = () => {
  body.addEventListener('click', clickAudioGame);

  document.addEventListener('keyup', keyboardControl);
  window.addEventListener('popstate', () => {
    body.style.backgroundImage = 'none';
    sessionStorage.removeItem('list-game-audio');
    sessionStorage.removeItem('game-audio-call');
    sessionStorage.removeItem('difficult-words');
    sessionStorage.removeItem('studied-words');
    sessionStorage.removeItem('used-index-words-in-audio-call');
    sessionStorage.removeItem('unguessed-words-id');
    sessionStorage.removeItem('series-of-correct-answers');
    sessionStorage.removeItem('longest-series-of-correct-answers');
    sessionStorage.removeItem('learnedWordsId');

    body.removeEventListener('click', clickAudioGame);
  });
};

export default addListeners;
