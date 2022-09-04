const hightlitingDifficultWords = (element: HTMLElement, typeHightlitinig: string) => {
  const elem = element;
  const wrapperWord = element.closest('.container-tutorial__wrapper-word') as HTMLDivElement;
  if (typeHightlitinig === 'hard') {
    if ((wrapperWord.querySelector('.studied') as HTMLImageElement).src.match(/cross-green/)) {
      (wrapperWord.querySelector('.studied') as HTMLImageElement).src = './assets/svg/icons/info-bird.svg';
    }

    elem.style.transform = 'scale(.8)';
    const studiedElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.studied') as HTMLDivElement;
    studiedElement.style.transform = 'scale(1)';
    wrapperWord.style.boxShadow = '1rem 1rem 0.4rem rgb(236 58 16 / 80%)';
    (wrapperWord.querySelector('.hard') as HTMLImageElement).src = './assets/svg/icons/cross-red.svg';
  }
  if (typeHightlitinig === 'studied') {
    if ((wrapperWord.querySelector('.hard') as HTMLImageElement).src.match(/cross-red/)) {
      (wrapperWord.querySelector('.hard') as HTMLImageElement).src = './assets/svg/icons/star-word.svg';
    }

    elem.style.transform = 'scale(.8)';
    const hardElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.hard') as HTMLDivElement;
    hardElement.style.transform = 'scale(1)';
    wrapperWord.style.boxShadow = '1rem 1rem 0.4rem rgb(10 227 70 / 80%)';
    (wrapperWord.querySelector('.studied') as HTMLImageElement).src = './assets/svg/icons/cross-green.svg';
  }
  if (typeHightlitinig === 'easyHard') {
    const hardElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.hard') as HTMLDivElement;
    hardElement.style.transform = 'scale(1)';
    wrapperWord.style.boxShadow = 'none';
    (wrapperWord.querySelector('.hard') as HTMLImageElement).src = './assets/svg/icons/star-word.svg';
  }

  if (typeHightlitinig === 'easyStudied') {
    const hardElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.studied') as HTMLDivElement;
    hardElement.style.transform = 'scale(1)';
    wrapperWord.style.boxShadow = 'none';
    (wrapperWord.querySelector('.studied') as HTMLImageElement).src = './assets/svg/icons/info-bird.svg';
  }
};

export default hightlitingDifficultWords;
