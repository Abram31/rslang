import getDifficultStudiedWords, { IdataAboutWordDificulty } from './get_difficult_studied_words';

import hightlitingDifficultWords from './hightliting_difficult_words';

const checkDifficultWordBeforeLoading = async (element:HTMLElement, id:string) => {
  await getDifficultStudiedWords();
  const difficultWords: IdataAboutWordDificulty[] = JSON.parse(sessionStorage.getItem('difficult-words')!);
  const dificultWord = difficultWords.find((word:IdataAboutWordDificulty) => word.wordId === id);
  if (dificultWord) {
    const hardElement = element.querySelector('.hard') as HTMLElement;
    hightlitingDifficultWords(hardElement, 'hard');
  }
  const studiedWords: IdataAboutWordDificulty[] = JSON.parse(sessionStorage.getItem('studied-words')!);
  const studiedWord = studiedWords.find((word: IdataAboutWordDificulty) => word.wordId === id);
  if (studiedWord) {
    const studiedElement = element.querySelector('.studied') as HTMLElement;
    hightlitingDifficultWords(studiedElement, 'studied');
  }
};

export default checkDifficultWordBeforeLoading;
