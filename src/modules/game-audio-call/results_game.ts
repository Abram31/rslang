import { IdataFromServer } from '../../interface/interface';
import createDomNode from '../tutorial/function-create-dom-node';
import { getSessinoStorage } from './sessionStorage';

export const createListUsedWords = () => {
  const resultFragment = document.createDocumentFragment();

  const overlay = {
    typeElement: 'section',
    className: 'overlay',
    parentElement: resultFragment,
  };
  const overlayWindow = createDomNode(overlay);

  const descriptionContainerResult = {
    typeElement: 'div',
    className: 'container-result',
    parentElement: overlayWindow,
  };
  const containerResult = createDomNode(descriptionContainerResult);

  const descriptionTitleResult = {
    typeElement: 'h5',
    className: 'container-result__title',
    text: 'Результаты',
    parentElement: containerResult,
  };
  createDomNode(descriptionTitleResult);

  const descriptionWrapperList = {
    typeElement: 'ul',
    className: 'container-result__wrapper-list',
    parentElement: containerResult,
  };
  const wrapperList = createDomNode(descriptionWrapperList);

  const descriptionWrapperButtons = {
    typeElement: 'div',
    className: 'container-result__wrapper-buttons',
    parentElement: containerResult,
  };
  const wrapperButtons = createDomNode(descriptionWrapperButtons);

  const descriptionButtonRepeat = {
    typeElement: 'div',
    className: 'wrapper-buttons__repeat',
    text: 'Повторить',
    parentElement: wrapperButtons,
  };
  createDomNode(descriptionButtonRepeat);

  const descriptionButtonFinish = {
    typeElement: 'div',
    className: 'wrapper-buttons__finish',
    text: 'Закончить',
    parentElement: wrapperButtons,
  };
  createDomNode(descriptionButtonFinish);
  const dataAllWords: IdataFromServer[] = getSessinoStorage('game-audio-call');
  const usedWordsId: string[] = getSessinoStorage('used-index-words-in-audio-call');
  const unguessedWordsId: string[] = getSessinoStorage('unguessed-words-id');

  const listWordsWithTranslate = usedWordsId.map((id) => {
    const word = dataAllWords.find((item) => item.id === id || item._id === id);
    if (word) {
      return [word.word, word.wordTranslate, word.id || word._id, word.audio];
    }
    return [];
  });

  const addWord = (classTitle: string, words: string[], bg: string) => {
    const descriptionWrapperWord = {
      typeElement: 'li',
      className: classTitle,
      dataAttribute: ['data-voice', words[3]],
      parentElement: wrapperList,
    };
    const wrapperWord = createDomNode(descriptionWrapperWord);

    wrapperWord.style.background = bg;

    ['word-en', 'word-ru'].forEach((item, index) => {
      const word = {
        typeElement: 'span',
        className: item,
        text: words[index],
        parentElement: wrapperWord,
      };
      createDomNode(word);
    });
  };

  listWordsWithTranslate.forEach((words, index) => {
    let colorLine: string;

    if (index % 2 === 0) {
      colorLine = '#F5D2D4';
    } else {
      colorLine = '#FAF2F3';
    }

    if (unguessedWordsId.includes(words[2])) {
      addWord('wrapper-list__item uncorrect-answer', words, colorLine);
    } else {
      addWord('wrapper-list__item correct-answer', words, colorLine);
    }
  });

  return resultFragment;
};

export const addToPageResults = () => {
  const fragment = createListUsedWords();

  (document.getElementById('root') as HTMLDivElement).append(fragment);
  ['used-index-words-in-audio-call', 'list-game-audio',
    'guessed-words-id', 'series-of-correct-answers', 'longest-series-of-correct-answers'].forEach((item) => {
    sessionStorage.removeItem(item);
  });
};
