import App from '../../../components/app';
import { createDomNode } from '../function-create-dom-node';
import { createWordContainer } from '../create-word-container';
import { body } from '../get words/render-result-find-to-page';
import getDifficultStudiedWords, { IdataAboutWordDificulty } from './get_difficult_studied_words';
import './difficult_words.scss';
import preload from '../../game-audio-call/preload';
import { miniButtonGames } from '../markup';

const addDifficultWordsToPage = async () => {
  const prel = preload();
  body.append(prel);
  await getDifficultStudiedWords();
  const difficultWords:IdataAboutWordDificulty[] = JSON.parse(sessionStorage.getItem('difficult-words')!);

  const descriptionTitle = {
    typeElement: 'h5',
    className: 'wrapper-difficult-words__title',
    text: 'Сложные слова',
    parentElement: body,
  };
  createDomNode(descriptionTitle);

  const descriptionWrapperWords = {
    typeElement: 'div',
    className: 'wrapper-difficult-words',
    parentElement: body,
  };
  const wrapperWord = createDomNode(descriptionWrapperWords);
  difficultWords.forEach(async (item, index) => {
    const word = await new App().getUserOneWord(item.wordId);
    wrapperWord.append(createWordContainer(word));

    if (difficultWords.length - 1 === index) {
      prel.remove();
    }
  });
  miniButtonGames(body);
};

export default addDifficultWordsToPage;
