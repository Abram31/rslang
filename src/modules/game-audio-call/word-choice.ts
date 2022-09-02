import playSoundsAfterAnswer from './play-sounds-after-answer';
import { addSessionStorage } from './sessionStorage';

const choiceWord = (event: MouseEvent) => {
  const element = event.target as HTMLDivElement;
  const wordButtons = document.querySelectorAll('.wrapper-words__word');
  const voiceElement = document.querySelector('.container-game-audio-call__button-call-voice') as HTMLElement;
  const dontKnowNextButton = document.querySelector('.wrapper-words__dont-know') as HTMLElement;
  const idVoice = voiceElement.id;
  const idTarget = element.id;
  if (idVoice === idTarget) {
    playSoundsAfterAnswer('./sounds-game-audio-call/correct-answer-sound-3.mp3');
    dontKnowNextButton.innerText = 'Следующее слово';
    dontKnowNextButton.style.background = 'none';
    element.classList.add('correct-word');

    sessionStorage.setItem('correctness of the choice', 'true');
    addSessionStorage('guessed-words-id', idVoice);
  } else {
    playSoundsAfterAnswer('./sounds-game-audio-call/incorrect-answer-sound-3.mp3');
    dontKnowNextButton.innerText = 'Следующее слово';
    dontKnowNextButton.style.background = 'none';
    element.style.background = 'red';
    wordButtons.forEach((item) => {
      if (item.id === idVoice) {
        item.classList.add('correct-word');
      }
    });

    sessionStorage.setItem('correctness of the choice', 'false');
  }

  wordButtons.forEach((item) => {
    const elem = item as HTMLLIElement;
    elem.style.pointerEvents = 'none';
    elem.style.borderColor = 'black';
  });
};

export default choiceWord;
