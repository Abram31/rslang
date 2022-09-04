import App from '../../../components/app';
import { IdataAboutWordDificulty, IdataFromServer } from '../../../interface/interface';
import { getStorage } from '../../../utils/storage';
import getDifficultStudiedWords from './get_difficult_studied_words';

import hightlitingDifficultWords from './hightliting_difficult_words';

const checkDifficultWordBeforeLoading = async (element:HTMLElement, id: string) => {
  if (getStorage('id')) {
    await getDifficultStudiedWords();
    const difficultWords: IdataFromServer[] = JSON.parse(sessionStorage.getItem('difficult-words') as string);
    const dificultWord = difficultWords.find((word:IdataFromServer) => word._id === id);
    if (dificultWord) {
      const hardElement = element.querySelector('.hard') as HTMLElement;
      hightlitingDifficultWords(hardElement, 'hard');
    }
    const studiedWords: IdataFromServer[] = JSON.parse(sessionStorage.getItem('studied-words') as string);
    const studiedWord = studiedWords.find((word: IdataFromServer) => word._id === id);
    if (studiedWord) {
      const studiedElement = element.querySelector('.studied') as HTMLElement;
      hightlitingDifficultWords(studiedElement, 'studied');
    }
  }
};

export default checkDifficultWordBeforeLoading;

// const updateWord = async (id: string) => {
//   let currentDifficult;
//   const userWords = await new App().getUsersWords();
//   userWords.forEach((el: IdataAboutWordDificulty) => {
//     if (el.wordId === id) {
//       if (el.difficulty === 'studied') {
//         currentDifficult = 'studied';
//       } else if (el.difficulty === 'hard') {
//         currentDifficult = 'hard';
//       }
//     }
//   });
//   return currentDifficult;
// };

// const checkDifficultWordBeforeLoading = async (wordId: string) => {
//   if (getStorage('id')) {
//     const difficult = await updateWord(wordId);
//     const elem = (document.getElementById(wordId) as HTMLElement);
//     if (difficult === 'hard') {
//       elem.style.boxShadow = '1rem 1rem 0.4rem rgb(236 58 16 / 80%)';
//       (elem.querySelector('.hard') as HTMLImageElement).src = './assets/svg/icons/cross-red.svg';
//     } else if (difficult === 'studied') {
//       elem.style.boxShadow = '1rem 1rem 0.4rem rgb(10 227 70 / 80%)';
//       (elem.querySelector('.studied') as HTMLImageElement).src =
// './assets/svg/icons/cross-green.svg';
//     }
//   }
// };
