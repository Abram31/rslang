import playAudio from '../tutorial/play-words';
import { cardFlipAfterChoice, cardUnflip } from './card-flip-after-choice';
import changeLanguages from './change-languages';
import changeVoiceLinkToImage from './change-voice-link-to-image';
import { addWordsToPage } from './get-voice-word';
import keyboardControl from './keyboard_control';
import { addSessionStorage, deleteSessionStorage } from './sessionStorage';
import { choiceWord } from './word-choice';

const sectionAudioCall = document.querySelector('.container-game-audio-call') as HTMLElement;
sectionAudioCall.addEventListener('click', (event) => {
  const element = event.target as HTMLDivElement;
  if (element.classList.contains('container-game-audio-call__button-call-voice')) {
    const pathToVoice = element.getAttribute('data-voice') as string;
    playAudio(pathToVoice);
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
    addWordsToPage();
    sessionStorage.setItem('correctness of the choice', 'false');
    cardUnflip();
  }

  if (element.classList.contains('langs__ru') || element.classList.contains('langs__en')) {
    changeLanguages(event);
  }
});

document.addEventListener('keyup', keyboardControl);
