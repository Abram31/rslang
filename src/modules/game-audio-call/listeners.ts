import { baseURL } from '../tutorial/fetch/fetch';
import { body } from '../tutorial/get words/render-result-find-to-page';
import playAudio from '../tutorial/play-words';
import { cardFlipAfterChoice, cardUnflip } from './card-flip-after-choice';
import changeLanguages from './change-languages';
import changeVoiceLinkToImage from './change-voice-link-to-image';
import { addWordsToPage } from './get-voice-word';
import keyboardControl from './keyboard_control';
import { playSoundsAfterAnswer } from './play-sounds-after-answer';
import { addToPageResults } from './results_game';
import { addSessionStorage, deleteSessionStorage, getSessinoStorage } from './sessionStorage';
import { choiceWord } from './word-choice';

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
  }
  if (element.classList.contains('wrapper-words__dont-know')) {
    const buttonVoice = document.querySelector('.container-game-audio-call__button-call-voice') as HTMLElement;
    const buttonVoiceId = buttonVoice.id;

    if (sessionStorage.getItem('correctness of the choice') === 'false') {
      addSessionStorage('unguessed-words-id', buttonVoiceId);
    }
    const ungessedWords: Array<string> = getSessinoStorage('unguessed-words-id');
    if (ungessedWords.length > 4) {
      cardUnflip();
      addToPageResults();
      sessionStorage.removeItem('unguessed-words-id');
    } else {
      addWordsToPage();
      sessionStorage.setItem('correctness of the choice', 'false');
      cardUnflip();
    }
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
    window.location.hash = '/games/audio';
  }

  if (element.classList.contains('wrapper-list__item')
      || element.classList.contains('word-ru')
      || element.classList.contains('word-en')) {
    const dataVoice = (element.closest('li') as HTMLLIElement).getAttribute('data-voice') as string;
    playAudio(JSON.stringify([dataVoice]));
  }
};

const addListeners = () => {
  const sectionAudioCall = document.querySelector('.container-game-audio-call') as HTMLElement;
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
    body.removeEventListener('click', clickAudioGame);


    console.log('hash');
  });
};

export default addListeners;
