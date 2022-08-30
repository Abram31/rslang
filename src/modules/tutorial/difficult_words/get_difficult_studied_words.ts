import App from '../../../components/app';
import { IdataFromServer } from '../get words/render-result-find-to-page';

export interface IdataAboutWordDificulty {
  difficulty: string,
  id: string,
  wordId: string,
}

const getDifficultStudiedWords = async () => {
  const response: IdataAboutWordDificulty[] = await new App().getUsersWords();
  const difficultWords: IdataAboutWordDificulty[] = response.filter((word: IdataAboutWordDificulty) => word.difficulty === 'hard');
  sessionStorage.setItem('difficult-words', JSON.stringify(difficultWords));
  const studiedtWords: IdataAboutWordDificulty[] = response.filter((word: IdataAboutWordDificulty) => word.difficulty === 'studied');
  sessionStorage.setItem('studied-words', JSON.stringify(studiedtWords));
  return difficultWords;
};

export default getDifficultStudiedWords;
