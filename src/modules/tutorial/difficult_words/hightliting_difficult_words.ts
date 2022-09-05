const hightlitingDifficultWords = (element: HTMLElement, typeHightlitinig: string) => {
  const elem = element;
  if (typeHightlitinig === 'hard') {
    const wrapperWord = element.closest('.container-tutorial__wrapper-word') as HTMLDivElement;
    if ((wrapperWord.querySelector('.studied') as HTMLImageElement).src.match(/cross-green/)) {
      (wrapperWord.querySelector('.studied') as HTMLImageElement).src = './assets/svg/icons/tutorial/info-bird.svg';
      Array.from((wrapperWord.querySelectorAll('.bird'))).forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        (el as HTMLImageElement).src = './assets/svg/icons/grey-bird.svg';
      });
    }

    elem.style.transform = 'scale(.8)';
    const studiedElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.studied') as HTMLDivElement;
    studiedElement.style.transform = 'scale(1)';
    wrapperWord.style.boxShadow = '1rem 1rem 0.4rem rgb(236 58 16 / 80%)';
    (wrapperWord.querySelector('.hard') as HTMLImageElement).src = './assets/svg/icons/tutorial/cross-red.svg';
  }
  if (typeHightlitinig === 'studied') {
    const wrapperWord = element.closest('.container-tutorial__wrapper-word') as HTMLDivElement;
    if ((wrapperWord.querySelector('.hard') as HTMLImageElement).src.match(/cross-red/)) {
      (wrapperWord.querySelector('.hard') as HTMLImageElement).src = './assets/svg/icons/tutorial/star-word.svg';
    }

    elem.style.transform = 'scale(.8)';
    const hardElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.hard') as HTMLDivElement;
    hardElement.style.transform = 'scale(1)';
    wrapperWord.style.boxShadow = '1rem 1rem 0.4rem rgb(10 227 70 / 80%)';
    (wrapperWord.querySelector('.studied') as HTMLImageElement).src = './assets/svg/icons/tutorial/cross-green.svg';
    Array.from((wrapperWord.querySelectorAll('.bird'))).forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      (el as HTMLImageElement).src = './assets/svg/icons/green-bird.svg';
    });
  }
  if (typeHightlitinig === 'easyHard') {
    const wrapperWord = element.closest('.container-tutorial__wrapper-word') as HTMLDivElement;
    const hardElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.hard') as HTMLDivElement;
    hardElement.style.transform = 'scale(1)';
    wrapperWord.style.boxShadow = 'none';
    (wrapperWord.querySelector('.hard') as HTMLImageElement).src = './assets/svg/icons/tutorial/star-word.svg';
  }

  if (typeHightlitinig === 'easyStudied') {
    const wrapperWord = element.closest('.container-tutorial__wrapper-word') as HTMLDivElement;
    const hardElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.studied') as HTMLDivElement;
    hardElement.style.transform = 'scale(1)';
    wrapperWord.style.boxShadow = 'none';
    (wrapperWord.querySelector('.studied') as HTMLImageElement).src = './assets/svg/icons/tutorial/info-bird.svg';
  }
};

export default hightlitingDifficultWords;
