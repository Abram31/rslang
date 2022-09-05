/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-await-in-loop */
import createDomNode from '../../utils/createDomNode';
import preload from '../game-audio-call/preload';
import './game_sprint.scss';
import renderSprintResults from './results/sprint_results';
import timer from './timer';
import App from '../../components/app';

interface IData {
  id: string,
  group: 0,
  page: 0,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

const renderSprintGame = () => {
  const root = document.querySelector('#root') as HTMLElement;
  root.innerHTML = '';

  const sprintPage = createDomNode('section', ['sprint-game'], root);
  const sprintContainer = createDomNode('div', ['wrapper', 'sprint-game-wrapper'], sprintPage);

  const sprintHeader = createDomNode('div', ['sprint-header'], sprintContainer);
  createDomNode('p', ['sprint-english-word'], sprintContainer, '');
  createDomNode('p', ['sprint-russian-word'], sprintContainer, '');
  createDomNode('img', ['sprint-answer-icon'], sprintContainer, '', [{ src: '' }]);
  const sprintButtons = createDomNode('div', ['sprint-buttons'], sprintContainer);

  createDomNode('div', ['sprint-timer'], sprintHeader, '10');
  createDomNode('img', ['sprint-sound-icon'], sprintHeader, '', [{ src: '../../assets/svg/icons/sprint-sound-icon.svg' }, { alt: 'Sprint sound icon' }]);
  createDomNode('div', ['sprint-counter'], sprintHeader, '0');

  createDomNode('button', ['btn', 'btn_red', 'wrong__button'], sprintButtons, 'Не верно');
  createDomNode('button', ['btn', 'correct__button'], sprintButtons, 'Верно');
};

const arrayGenerator = (arrayEng: Array<string>, arrayRus: Array<string>) => {
  const result: Array<string> = [];
  arrayEng.forEach((item, idx) => {
    const bool: number = Math.floor(Math.random() * 2);
    const index: number = Math.floor(Math.random() * arrayEng.length);
    bool ? result.push(arrayRus[idx]) : result.push(arrayRus[index]);
  });
  return result;
};

const wordsCheck = (array: Array<string>, translation: Array<string>) => {
  const result: Array<boolean> = [];
  array.forEach((item, idx) => {
    item === translation[idx] ? result.push(true) : result.push(false);
  });
  return result;
};

let counter = 0;

const getWords = async () => {
  const words: Array<string> = [];
  const wordsTranslate: Array<string> = [];
  const pathAudio: Array<string> = [];

  const difficulty: number = Number(window.location.href.split('/').reverse()[0]) - 1;

  const chapterNumber: number = Number(sessionStorage.getItem('chapter-number')) - 1;
  const pageNumber: number = Number(sessionStorage.getItem('page-number')) - 1;

  if (difficulty <= 5) {
    for (let i = 1; i <= 30; i += 1) {
      const result = await fetch(`https://base-rs-lang-1.herokuapp.com/words?group=${difficulty}&page=${i}`);
      const data: Array<IData> = await result.json();
      data.forEach((item) => {
        pathAudio.push(item.audio);
        words.push(item.word);
        wordsTranslate.push(item.wordTranslate);
      });
    }
  } else if (difficulty === 6) {
    const filter = '?filter={"userWord.difficulty":"hard"}';
    const result = await (new App()).getUserAggregateWords(filter);
    const data: Array<IData> = result[0].paginatedResults;
    data.forEach((item) => {
      pathAudio.push(item.audio);
      words.push(item.word);
      wordsTranslate.push(item.wordTranslate);
    });
  } else {
    for (let i = pageNumber; i >= 0; i -= 1) {
      const result = await fetch(`https://base-rs-lang-1.herokuapp.com/words?group=${chapterNumber}&page=${i}`);
      const data: Array<IData> = await result.json();
      data.forEach((item) => {
        pathAudio.push(item.audio);
        words.push(item.word);
        wordsTranslate.push(item.wordTranslate);
      });
    }
  }

  const englishWord = document.querySelector('.sprint-english-word') as HTMLElement;
  const russianWord = document.querySelector('.sprint-russian-word') as HTMLElement;
  const correctButton = document.querySelector('.correct__button') as HTMLElement;
  const wrongButton = document.querySelector('.wrong__button') as HTMLElement;

  const translation: Array<string> = arrayGenerator(words, wordsTranslate);

  englishWord.innerText = words[counter];
  russianWord.innerText = translation[counter];

  const answers = wordsCheck(wordsTranslate, translation);

  const changeWords = () => {
    counter += 1;
    englishWord.innerText = words[counter];
    russianWord.innerText = translation[counter];
    if (words[counter] === undefined || translation[counter] === undefined) {
      renderSprintResults();
    }
  };

  correctButton.addEventListener('click', changeWords);
  wrongButton.addEventListener('click', changeWords);

  const keyboardEvents = (e: KeyboardEvent) => {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
      changeWords();
    }
  };

  document.addEventListener('keydown', keyboardEvents);

  return [words, wordsTranslate, answers, pathAudio];
};

export let englishWords: Array<string> = [];
export let russianWords: Array<string> = [];
export let result: Array<boolean> = [];
export let audioPaths: Array<string> = [];

const play = (path: string) => {
  const url = 'https://base-rs-lang-1.herokuapp.com/';
  const audio = new Audio(`${url}${path}`);
  audio.play();
};

const userResponse = async () => {
  counter = 0;
  englishWords = [];
  russianWords = [];
  result = [];
  audioPaths = [];
  const prel = preload();
  const answers = await getWords();
  const correctButton = document.querySelector('.correct__button') as HTMLElement;
  const wrongButton = document.querySelector('.wrong__button') as HTMLElement;
  const soundIcon = document.querySelector('.sprint-sound-icon') as HTMLElement;
  const score = document.querySelector('.sprint-counter') as HTMLElement;
  const answerResult = document.querySelector('.sprint-answer-icon') as HTMLImageElement;

  answers[0].forEach((word) => {
    if (typeof word === 'string') {
      englishWords.push(word);
    }
  });

  answers[1].forEach((word) => {
    if (typeof word === 'string') {
      russianWords.push(word);
    }
  });

  answers[3].forEach((path) => {
    if (typeof path === 'string') {
      audioPaths.push(path);
    }
  });

  correctButton.addEventListener('click', () => {
    if (answers[2][counter - 1]) {
      let currentScore = Number(score.innerText);
      score.innerText = (currentScore += 10).toString();
      answerResult.src = '../../assets/svg/icons/result-sprint-correct.svg';
      result.push(true);
    } else {
      answerResult.src = '../../assets/svg/icons/result-sprint-incorrect.svg';
      result.push(false);
    }
  });

  wrongButton.addEventListener('click', () => {
    if (answers[2][counter - 1]) {
      answerResult.src = '../../assets/svg/icons/result-sprint-incorrect.svg';
      result.push(false);
    } else {
      let currentScore = Number(score.innerText);
      score.innerText = (currentScore += 10).toString();
      answerResult.src = '../../assets/svg/icons/result-sprint-correct.svg';
      result.push(true);
    }
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'ArrowRight') {
      if (answers[2][counter - 1]) {
        let currentScore = Number(score.innerText);
        score.innerText = (currentScore += 10).toString();
        answerResult.src = '../../assets/svg/icons/result-sprint-correct.svg';
        result.push(true);
      } else {
        answerResult.src = '../../assets/svg/icons/result-sprint-incorrect.svg';
        result.push(false);
      }
    } else if (e.code === 'ArrowLeft') {
      if (answers[2][counter - 1]) {
        answerResult.src = '../../assets/svg/icons/result-sprint-incorrect.svg';
        result.push(false);
      } else {
        let currentScore = Number(score.innerText);
        score.innerText = (currentScore += 10).toString();
        answerResult.src = '../../assets/svg/icons/result-sprint-correct.svg';
        result.push(true);
      }
    }
  });

  soundIcon.addEventListener('click', () => {
    audioPaths.forEach((path, idx) => {
      if (counter === idx) {
        play(path);
      }
    });
  });

  prel.remove();
  timer();
};

export {
  renderSprintGame, userResponse, getWords, play,
};
