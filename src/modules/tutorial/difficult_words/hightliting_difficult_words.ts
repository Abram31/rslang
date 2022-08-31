const hightlitingDifficultWords = (element: HTMLElement, typeHightlitinig: string) => {
  if (typeHightlitinig === 'hard') {
    element.style.transform = 'scale(.8)';
    const studiedElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.studied') as HTMLDivElement;
    studiedElement.style.transform = 'scale(1)';
    const wrapperWord = element.closest('.container-tutorial__wrapper-word') as HTMLDivElement;
    wrapperWord.style.boxShadow = '1rem 1rem 0.4rem rgb(236 58 16 / 80%)';
  }
  if (typeHightlitinig === 'studied') {
    element.style.transform = 'scale(.8)';
    const hardElement = (element.closest('.container-btns') as HTMLDivElement).querySelector('.hard') as HTMLDivElement;
    hardElement.style.transform = 'scale(1)';
    const wrapperWord = element.closest('.container-tutorial__wrapper-word') as HTMLDivElement;
    wrapperWord.style.boxShadow = '1rem 1rem 0.4rem rgb(10 227 70 / 80%)';
  }
};

export default hightlitingDifficultWords;

// const hardElement = element.querySelector('.hard') as HTMLDivElement;
// hardElement.style.transform = 'scale(.8)';
// const studiedElement = element.querySelector('.studied') as HTMLDivElement;
// studiedElement.style.transform = 'scale(1)';
// // const wrapperWord = element.closest('.container-tutorial__wrapper-word') as HTMLDivElement;
// element.style.boxShadow = '1rem 1rem 0.4rem rgb(236 58 16 / 80%)';
