import createDomNode from '../tutorial/function-create-dom-node';
import { getSessinoStorage } from './sessionStorage';

const stepGameIndicator = () => {
  const numberUnguseedWords = getSessinoStorage('unguessed-words-id').length;

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

export default stepGameIndicator;
