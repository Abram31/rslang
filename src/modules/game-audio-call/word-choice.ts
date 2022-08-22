import { playSoundsAfterAnswer } from './play-sounds-after-answer';

// eslint-disable-next-line import/prefer-default-export
export const choiceWord = (event: MouseEvent) => {
  const element = event.target as HTMLDivElement;
  const voiceElement = document.querySelector('.container-game-audio-call__button-call-voice') as HTMLElement;
  const dontKnowNextButton = document.querySelector('.wrapper-words__dont-know') as HTMLElement;
  const idVoice = voiceElement.id;
  const idTarget = element.id;
  if (idVoice === idTarget) {
    playSoundsAfterAnswer('./sounds-game-audio-call/correct-answer-sound-3.mp3');
    dontKnowNextButton.innerText = 'Следующее слово';
    dontKnowNextButton.style.background = 'none';
    element.style.background = 'green';
    setTimeout(() => {
      element.style.background = 'none';
    }, 2000);
  } else {
    playSoundsAfterAnswer('./sounds-game-audio-call/incorrect-answer-sound-3.mp3');
    dontKnowNextButton.innerText = 'Следующее слово';
    dontKnowNextButton.style.background = 'none';
    element.style.background = 'red';
    setTimeout(() => {
      element.style.background = 'none';
    }, 2000);
  }
};
