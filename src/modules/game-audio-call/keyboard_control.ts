import { getWordsFromServer } from './get-voice-word';

const keyboardControl = (event: KeyboardEvent) => {
  const sectionAudioCall = document.querySelector('.container-game-audio-call') as HTMLElement;
  const buttonsWithWords = sectionAudioCall.querySelectorAll('.wrapper-words__word') as NodeListOf<HTMLDivElement>;
  const listElements: string[] = [];
  const click = new Event('click', { bubbles: true });
  buttonsWithWords.forEach((item) => {
    const attributeKey = item.getAttribute('keyboard-key');
    listElements.push(attributeKey as string);
  });
  if (listElements.includes(event.key)) {
    const wrapperButtons = sectionAudioCall.querySelector('.container-game-audio-call__wrapper-words') as HTMLUListElement;
    const buttons = wrapperButtons.querySelectorAll('li') as NodeListOf<HTMLLIElement>;
    if (!listElements.includes('active')) {
      buttons.forEach((button) => {
        const attribute = button.getAttribute('keyboard-key');
        if (event.key === attribute) {
          button.dispatchEvent(click);
          button.setAttribute('keyboard-key', 'active');
        }
      });
    }
  }
  if (event.key === 'Enter') {
    const buttonNext = sectionAudioCall.querySelector('.wrapper-words__dont-know') as HTMLDivElement;
    buttonNext.dispatchEvent(click);
  }

  if (event.code === 'Space') {
    getWordsFromServer();
    const buttonVoice = sectionAudioCall.querySelector('.container-game-audio-call__button-call-voice') as HTMLDivElement;
    buttonVoice.dispatchEvent(click);
  }
};

export default keyboardControl;
