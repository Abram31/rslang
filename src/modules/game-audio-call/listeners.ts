import playAudio from '../tutorial/play-words';
import { addWordsToPage } from './get-voice-word';
import { choiceWord } from './word-choice';

const sectionAudioCall = document.querySelector('.container-game-audio-call') as HTMLElement;
sectionAudioCall.addEventListener('click', (event) => {
  const element = event.target as HTMLDivElement;
  if (element.classList.contains('container-game-audio-call__button-call-voice')) {
    const pathToVoice = element.getAttribute('data-voice') as string;
    playAudio(pathToVoice);
  }
  if (element.classList.contains('wrapper-words__word')) {
    choiceWord(event);
  }
  if (element.classList.contains('wrapper-words__dont-know')) {
    addWordsToPage();
  }
});
