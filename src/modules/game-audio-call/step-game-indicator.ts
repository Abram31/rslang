import { createDomNode } from '../tutorial/function-create-dom-node';
import { addToPageResults } from './results_game';
import { getSessinoStorage } from './sessionStorage';

// eslint-disable-next-line import/prefer-default-export
export const stepGameIndicator = () => {
  // const lengthDataArray = getSessinoStorage('game-audio-call').length;
  // const lengthDataAttempts = getSessinoStorage('used-index-words-in-audio-call').length;
  // const lengthStepsСompletedTasks = lengthDataArray - lengthDataAttempts;
  const numberUnguseedWords = getSessinoStorage('unguessed-words-id').length;

  // if (numberUnguseedWords === 5) {
  //   addToPageResults();
  // }
  const wrapperStepGame = document.querySelector('.container-game-audio-call__wrapper-step-game') as HTMLUListElement;
  wrapperStepGame.innerHTML = '';
  const descriptionStepGame = {
    typeElement: 'li',
    className: 'wrapper-step-game__step-game',
    parentElement: wrapperStepGame,
  };
  for (let i = 0; i < 5 - numberUnguseedWords; i += 1) {
    const stepGame = createDomNode(descriptionStepGame);
    stepGame.classList.add('active-step');
    wrapperStepGame.append(stepGame);
  }
  for (let i = 0; i < numberUnguseedWords; i += 1) {
    const stepGame = createDomNode(descriptionStepGame);
    wrapperStepGame.append(stepGame);
  }
};
