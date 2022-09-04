import { IdataFromServer } from '../../../interface/interface';
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
