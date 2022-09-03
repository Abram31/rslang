import createDomNode from '../function-create-dom-node';
import createWordContainer from '../create-word-container';
import getDifficultStudiedWords from './get_difficult_studied_words';
import './difficult_words.scss';
import preload from '../../game-audio-call/preload';
import { miniButtonGames } from '../markup';
import { IdataFromServer } from '../../../interface/interface';
import { body } from '../get words/render-result-find-to-page';

const addDifficultWordsToPage = async () => {
  body.style.backgroundColor = '#44b9b9';
  const root = document.getElementById('root') as HTMLDivElement;
  const prel = preload();
  root.append(prel);
  await getDifficultStudiedWords();
  const difficultWords:IdataFromServer[] = JSON.parse(sessionStorage.getItem('difficult-words') as string);

  const difficultWord = {
    typeElement: 'div',
    className: 'tutorial__difficult-words',
    parentElement: root,
  };
  const containerDifficultWords = createDomNode(difficultWord);

  const descriptionTitle = {
    typeElement: 'h5',
    className: 'wrapper-difficult-words__title',
    text: 'Сложные слова',
    parentElement: containerDifficultWords,
  };
  createDomNode(descriptionTitle);

  const descriptionWrapperWords = {
    typeElement: 'div',
    className: 'wrapper-difficult-words',
    parentElement: containerDifficultWords,
  };
  const wrapperWord = createDomNode(descriptionWrapperWords);
  difficultWords.forEach(async (word, index) => {
    wrapperWord.append(createWordContainer(word));

    if (difficultWords.length - 1 === index) {
      prel.remove();
    }
  });
  miniButtonGames(containerDifficultWords);
};

export default addDifficultWordsToPage;
