import { baseURL } from './fetch/fetch';
import createDomNode from './function-create-dom-node';
import App from '../../components/app';
import hightlitingDifficultWords from './difficult_words/hightliting_difficult_words';
import { IdataFromServer } from '../../interface/interface';
import checkDifficultWordBeforeLoading from './difficult_words/check_difficult_word_before_loading';
import { addToLearnedWords, deleteFromLearnedWords } from '../statistics/save-delete-learned-words';

function addCountCorrectAnswer(id: string) {
  const statistics = (JSON.parse(sessionStorage.getItem('statistics') as string));
  let count = 0;
  if (statistics) {
    Object.keys(statistics.optional.words).forEach((key) => {
      if (key === id) {
        count = statistics.optional.words[key].correctAnswers;
      }
    });
  }
  return count;
}

const createWordContainer = (word: IdataFromServer, idS?: string) => {
  const currentIdWord = word.id || word._id;
  const num = addCountCorrectAnswer(currentIdWord);

  const wordFragment = document.createDocumentFragment();

  const descriptionWrapperWord = {
    typeElement: 'div',
    className: 'container-tutorial__wrapper-word',
    id: word._id || word.id,
    dataAttribute: word.userWord && word.userWord.difficulty === 'hard' ? ['difficults', 'hard'] : ['difficults', ''],
    parentElement: wordFragment,
  };
  const wrapperWord: HTMLElement = createDomNode(descriptionWrapperWord);

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
        addToLearnedWords((target.parentNode as HTMLElement)?.dataset.id as string);
        hightlitingDifficultWords(target, 'studied');
      } else if ((target as HTMLImageElement).src.match(/cross-green/)) {
        new App().deleteUserWord((target.parentNode as HTMLElement)?.dataset.id as string);
        deleteFromLearnedWords((target.parentNode as HTMLElement)?.dataset.id as string);
        hightlitingDifficultWords(target, 'easyStudied');
      }
    }
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

  // new buttons
  const containerBtnsWord = {
    typeElement: 'div',
    className: 'btns-word',
    parentElement: containerWord,
  };
  const containerBtns = createDomNode(containerBtnsWord);

  const btns = {
    typeElement: 'div',
    className: 'container-btns',
    parentElement: containerBtns,
  };

  if (localStorage.getItem('id')) {
    const btns1 = createDomNode(btns);

    if (idS) {
      btns1.dataset.id = idS;
    }

    const progress = {
      typeElement: 'div',
      className: 'wrapper-progress',
      parentElement: containerWord,
    };
    const progressContainer = createDomNode(progress);

    const oneBird = {
      typeElement: 'img',
      className: 'bird first-bird',
      parentElement: progressContainer,
    };
    const oneBirds = createDomNode(oneBird) as HTMLImageElement;

    const twoBird = {
      typeElement: 'img',
      className: 'bird two-bird',
      parentElement: progressContainer,
    };
    const twoBirds = createDomNode(twoBird) as HTMLImageElement;

    const threeBird = {
      typeElement: 'img',
      className: 'bird three-bird',
      parentElement: progressContainer,
    };
    const threeBirds = createDomNode(threeBird) as HTMLImageElement;

    if (num === 1) {
      oneBirds.src = './assets/svg/icons/green-bird.svg';
      twoBirds.src = './assets/svg/icons/grey-bird.svg';
      threeBirds.src = './assets/svg/icons/grey-bird.svg';
    } else if (num === 2) {
      oneBirds.src = './assets/svg/icons/green-bird.svg';
      twoBirds.src = './assets/svg/icons/green-bird.svg';
      threeBirds.src = './assets/svg/icons/grey-bird.svg';
    } else {
      oneBirds.src = './assets/svg/icons/grey-bird.svg';
      twoBirds.src = './assets/svg/icons/grey-bird.svg';
      threeBirds.src = './assets/svg/icons/grey-bird.svg';
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
  createDomNode(descriptionTextExampleTranslate);

  if (window.location.hash !== '#/book/section-7') {
    checkDifficultWordBeforeLoading(wrapperWord, word.id, word, num);
  }

  return wordFragment;
};

export default createWordContainer;
