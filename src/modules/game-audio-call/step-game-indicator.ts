import { createDomNode } from '../tutorial/function-create-dom-node';
import { descriptionStepGame, wrapperStepGame } from './markup';
import { getSessinoStorage } from './sessionStorage';

// eslint-disable-next-line import/prefer-default-export
export const stepGameIndicator = () => {
  const lengthDataArray = getSessinoStorage('game-audio-call').length;
  const lengthDataAttempts = getSessinoStorage('used-index-words-in-audio-call').length;
  const lengthStepsСompletedTasks = lengthDataArray - lengthDataAttempts;
  wrapperStepGame.innerHTML = '';
  for (let i = 0; i < lengthDataAttempts; i += 1) {
    const stepGame = createDomNode(descriptionStepGame);
    stepGame.classList.add('active-step');
    wrapperStepGame.append(stepGame);
  }
  for (let i = 0; i < lengthStepsСompletedTasks; i += 1) {
    const stepGame = createDomNode(descriptionStepGame);
    wrapperStepGame.append(stepGame);
  }
};
