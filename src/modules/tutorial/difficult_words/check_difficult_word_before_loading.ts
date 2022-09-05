import App from '../../../components/app';
import { IdataAboutWordDificulty } from '../../../interface/interface';
import { getStorage } from '../../../utils/storage';
import hightlitingDifficultWords from './hightliting_difficult_words';

const wordState = async (id: string) => {
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

const checkDifficultWordBeforeLoading = async (container: HTMLElement, wordId: string) => {
  if (getStorage('id')) {
    const difficult = await wordState(wordId);
    const btn = container.querySelector('.hard') as HTMLElement;

    if (difficult === 'hard') {
      hightlitingDifficultWords(btn, 'hard');
    } else if (difficult === 'studied') {
      hightlitingDifficultWords(btn, 'studied');
    }
  }
};

export default checkDifficultWordBeforeLoading;
