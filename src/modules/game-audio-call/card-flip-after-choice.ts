export const cardFlipAfterChoice = () => {
  const element = document.querySelector('.container-game-audio-call__wrapper-call-voice') as HTMLDivElement;

  const frontCard = element.querySelector('.container-game-audio-call__button-call-voice') as HTMLDivElement;
  frontCard.classList.add('front__flip');
  const backCard = element.querySelector('.container-game-audio-call__button-call-voice__back') as HTMLDivElement;
  backCard.classList.add('back__flip');
};

export const cardUnflip = () => {
  const element = document.querySelector('.container-game-audio-call__wrapper-call-voice') as HTMLDivElement;

  const frontCard = element.querySelector('.container-game-audio-call__button-call-voice') as HTMLDivElement;
  frontCard.classList.remove('front__flip');
  const backCard = element.querySelector('.container-game-audio-call__button-call-voice__back') as HTMLDivElement;
  backCard.classList.remove('back__flip');
};
