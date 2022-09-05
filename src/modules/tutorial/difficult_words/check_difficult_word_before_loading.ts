/* eslint-disable no-param-reassign */
import App from '../../../components/app';
import { IdataAboutWordDificulty, IdataFromServer } from '../../../interface/interface';
import { getStorage } from '../../../utils/storage';
import { addToLearnedWords, deleteFromLearnedWords } from '../../statistics/save-delete-difficult-words';
import hightlitingDifficultWords from './hightliting_difficult_words';

const updateWord = async (id: string) => {
  let currentDifficult = 'easy';
  const userWords = await new App().getUsersWords();
  userWords.forEach((el: IdataAboutWordDificulty) => {
    if (el.wordId === id) {
      if (el.difficulty === 'studied') {
        currentDifficult = 'studied';
      } else if (el.difficulty === 'hard') {
        currentDifficult = 'hard';
      }
    }
  });
  return currentDifficult;
};

// eslint-disable-next-line max-len
const checkDifficultWordBeforeLoading = async (container: HTMLElement, wordId: string, word:IdataFromServer, num: number) => {
  if (getStorage('id')) {
    console.log(word);
    const difficult = await updateWord(wordId);
    if (num === 3 && difficult !== 'studied') { // если все галочки зеленые но слово не записано как изученное
      new App().postUserWords(word, 'studied');
      addToLearnedWords(wordId);
    };
    // else if (num === 0 && difficult === 'studied') {
    //   new App().deleteUserWord(wordId);
    //   deleteFromLearnedWords(wordId);
    // }

    const btn = container.querySelector('.hard') as HTMLElement;

    if (difficult === 'hard') {
      hightlitingDifficultWords(btn, 'hard');
    } else if (difficult === 'studied') {
      hightlitingDifficultWords(btn, 'studied');
    } 
    // else {
    //   // eslint-disable-next-line no-useless-return
    //   return;
    // }
  }
};

export default checkDifficultWordBeforeLoading;


// import { saveDifficultWord } from '../../statistics/save-delete-difficult-words';
// import getDifficultStudiedWords from './get_difficult_studied_words';

// import hightlitingDifficultWords from './hightliting_difficult_words';

// const checkDifficultWordBeforeLoading = async (element:HTMLElement, id: string) => {
//   if (getStorage('id')) {
//     await getDifficultStudiedWords();
//     const difficultWords: IdataFromServer[] = JSON.parse(sessionStorage.getItem('difficult-words') as string);
//     const dificultWord = difficultWords.find((word:IdataFromServer) => word._id === id);
//     if (dificultWord) {
//       const hardElement = element.querySelector('.hard') as HTMLElement;
//       hightlitingDifficultWords(hardElement, 'hard');
//     }
//     const studiedWords: IdataFromServer[] = JSON.parse(sessionStorage.getItem('studied-words') as string);
//     const studiedWord = studiedWords.find((word: IdataFromServer) => word._id === id);
//     if (studiedWord) {
//       const studiedElement = element.querySelector('.studied') as HTMLElement;
//       hightlitingDifficultWords(studiedElement, 'studied');
//     }
//   }
// };

// export default checkDifficultWordBeforeLoading;
