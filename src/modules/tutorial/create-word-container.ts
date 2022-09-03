import { baseURL } from './fetch/fetch';
import createDomNode from './function-create-dom-node';
import App from '../../components/app';
import hightlitingDifficultWords from './difficult_words/hightliting_difficult_words';
import { IdataFromServer } from '../../interface/interface';
import checkDifficultWordBeforeLoading from './difficult_words/check_difficult_word_before_loading';

const createWordContainer = (word: IdataFromServer, id?: string) => {
  const wordFragment = document.createDocumentFragment();

  const descriptionWrapperWord = {
    typeElement: 'div',
    className: 'container-tutorial__wrapper-word',
    parentElement: wordFragment,
  };
  const wrapperWord:HTMLElement = createDomNode(descriptionWrapperWord);

  wrapperWord.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('hard')) {
      if ((target as HTMLImageElement).src.match(/star-word/)) {
        new App().postUserWords(word, 'hard');
        hightlitingDifficultWords(target, 'hard');
      } else if ((target as HTMLImageElement).src.match(/cross-red/)) {
        new App().deleteUserWord((target.parentNode as HTMLElement)?.dataset.id as string);
        hightlitingDifficultWords(target, 'easyHard');
      }
    }
    if (target.classList.contains('studied')) {
      if ((target as HTMLImageElement).src.match(/info-bird/)) {
        new App().postUserWords(word, 'studied');
        hightlitingDifficultWords(target, 'studied');
      } else if ((target as HTMLImageElement).src.match(/cross-green/)) {
        new App().deleteUserWord((target.parentNode as HTMLElement)?.dataset.id as string);
        hightlitingDifficultWords(target, 'easyStudied');
      }
    }

    // if (target.classList.contains('hard')) {
    //   new App().postUserWords(word, 'hard');
    //   hightlitingDifficultWords(target, 'hard');
    // }
    // if (target.classList.contains('studied')) {
    //   // target.classList.add('studied-active');
    //   new App().postUserWords(word, 'studied');
    //   hightlitingDifficultWords(target, 'studied');
    // }
  });

  const descriptionContainerImg = {
    typeElement: 'div',
    className: 'wrapper-word__container-img',
    parentElement: wrapperWord,
  };
  const containerImg = createDomNode(descriptionContainerImg);
  containerImg.style.backgroundImage = `url(${baseURL}${word.image})`;

  const descriptionContainerWord = {
    typeElement: 'div',
    className: 'wrapper-word__container-word',
    parentElement: wrapperWord,
  };
  const containerWord = createDomNode(descriptionContainerWord);

  const descriptionTitle = {
    typeElement: 'h5',
    text: word.word,
    className: 'container-word__title',
    parentElement: containerWord,
  };
  const titleWord = createDomNode(descriptionTitle);
  const listAudioPath = JSON.stringify([[word.audio], [word.audioMeaning], [word.audioExample]]);
  titleWord.setAttribute('data-path-audio', listAudioPath);

  const descriptionTranslateTranscription = {
    typeElement: 'span',
    text: `${word.wordTranslate}, ${word.transcription}`,
    className: 'container-word__translate-transcription',
    parentElement: containerWord,
  };
  // const translateTranscription =
  createDomNode(descriptionTranslateTranscription);

  const descriptionTextMeaning = {
    typeElement: 'span',
    innerHTML: word.textMeaning,
    className: 'container-word__text-meaning',
    parentElement: containerWord,
  };
  const textMeaning = createDomNode(descriptionTextMeaning);
  textMeaning.setAttribute('data-path-audio', word.audioMeaning);

  const descriptionTextMeaningTranslate = {
    typeElement: 'span',
    text: `${word.textMeaningTranslate}`,
    className: 'container-word__text-meaning-translate',
    parentElement: containerWord,
  };
  // const textMeaningTranslate =
  createDomNode(descriptionTextMeaningTranslate);

  const descriptionTextExample = {
    typeElement: 'span',
    innerHTML: word.textExample,
    className: 'container-word__text-example',
    parentElement: containerWord,
  };
  const textExample = createDomNode(descriptionTextExample);
  textExample.setAttribute('data-path-audio', word.audioExample);

  const descriptionTextExampleTranslate = {
    typeElement: 'span',
    text: `${word.textExampleTranslate}`,
    className: 'container-word__text-example-translate',
    parentElement: containerWord,
  };
  // const textExampleTranslate =
  createDomNode(descriptionTextExampleTranslate);

  // new buttons

  const containerBtnsWord = {
    typeElement: 'div',
    className: 'btns-word',
    parentElement: containerWord,
  };

  const containerBtns = createDomNode(containerBtnsWord);

  const btns = {
    typeElement: 'div',
    // text: word.word,
    className: 'container-btns',
    parentElement: containerBtns,
  };

  if (localStorage.getItem('id')) {
    const btns1 = createDomNode(btns);

    if (id) {
      btns1.dataset.id = id;
    }

    const btnCompoundWord = {
      typeElement: 'img',
      className: 'compound-word hard',
      parentElement: btns1,
    };

    const compoundWord = createDomNode(btnCompoundWord) as HTMLImageElement;
    compoundWord.src = './assets/svg/icons/star-word.svg';
    compoundWord.alt = 'Star';

    const btnLearnedWord = {
      typeElement: 'img',
      className: 'compound-word studied',
      parentElement: btns1,
    };

    const learnedWord = createDomNode(btnLearnedWord) as HTMLImageElement;
    learnedWord.src = './assets/svg/icons/info-bird.svg';
    learnedWord.alt = 'Learned';
  }
  if (window.location.hash !== '#/book/section-7') {
    checkDifficultWordBeforeLoading(wrapperWord, word.id);
  }

  return wordFragment;
};

export default createWordContainer;
