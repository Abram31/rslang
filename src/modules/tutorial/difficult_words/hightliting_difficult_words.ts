const hightlitingDifficultWords = (element: HTMLElement, typeHightlitinig: string) => {
  const elem = element;
  if (typeHightlitinig === 'hard') {
    elem.style.transform = 'scale(.8)';
    const studiedElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.studied') as HTMLDivElement;
    studiedElement.style.transform = 'scale(1)';
    const wrapperWord = element.closest('.container-tutorial__wrapper-word') as HTMLDivElement;
    wrapperWord.style.boxShadow = '1rem 1rem 0.4rem rgb(236 58 16 / 80%)';
  }
  if (typeHightlitinig === 'studied') {
    elem.style.transform = 'scale(.8)';
    const hardElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.hard') as HTMLDivElement;
    hardElement.style.transform = 'scale(1)';
    const wrapperWord = element.closest('.container-tutorial__wrapper-word') as HTMLDivElement;
    wrapperWord.style.boxShadow = '1rem 1rem 0.4rem rgb(10 227 70 / 80%)';
  }
};

export default hightlitingDifficultWords;
