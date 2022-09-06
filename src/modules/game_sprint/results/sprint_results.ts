import createDomNode from '../../../utils/createDomNode';
import './sprint_results.scss';
import {
  englishWords, russianWords, result, audioPaths, play, stats
} from '../game_sprint';
import App from '../../../components/app';

interface ISprintStats {
	percentCorrectAnswers: number;
	longestSeriesOfCorrectAnswers: number;
	newWordsGameDay?: string;
  nameGame: string;
}

const hideBackground = (page: HTMLElement) => {
  // eslint-disable-next-line no-param-reassign
  page.style.background = 'none';
};

const answersCounter = (array: Array<boolean>) => {
  let correctAnswers = 0;
  let inCorrectAnswers = 0;
  array.forEach((item) => {
    item ? correctAnswers += 1 : inCorrectAnswers += 1;
  });
  return [correctAnswers, inCorrectAnswers];
};

const statsAboutGame = (array: Array<number>) => {
  const percentCorrectAnswers = Math.round((array[0] / (array[0] + array[1])) * 100);
  return percentCorrectAnswers;
};

export const generateStatisticsSprint = () => {
	const data: Array<ISprintStats> = Object.values(JSON.parse(sessionStorage.getItem('statistics')!).optional.correctAnswersInGames);
	const percentCorrectAnswers: Array<number> = [];
	const longestSeriesAnswers: Array<number> = [];
	data.forEach(item => {
    const game: string = item.nameGame;
    if (game === 'sprint') {
      percentCorrectAnswers.push(item.percentCorrectAnswers)
		longestSeriesAnswers.push(item.longestSeriesOfCorrectAnswers)
    }
	})
	const percent: number = Math.round((percentCorrectAnswers.reduce((acc, curr) => acc + curr)) / percentCorrectAnswers.length);
	const series: number = longestSeriesAnswers.sort((a, b) => b - a)[0];
	return [percent, series];
}

const app = new App();

const renderSprintResults = (score: number) => {
  const page = document.querySelector('.sprint-game') as HTMLElement;
  page.innerHTML = '';

  const sprintResultsPage = createDomNode('div', ['sprint-results', 'hidden'], page);
  const sprintResultsWrapper = createDomNode('div', ['wrapper', 'sprint-results-wrapper'], sprintResultsPage);

  createDomNode('h1', ['sprint-results__title'], sprintResultsWrapper, 'Результаты');
  createDomNode('h3', ['results-score'], sprintResultsWrapper, `Ваш результат: ${score}`);
  const resultsContainer = createDomNode('div', ['sprint-results__container'], sprintResultsWrapper);

  for (let i = 0; i < result.length; i += 1) {
    const row = createDomNode('div', ['results-container__row'], resultsContainer);
    createDomNode('img', ['results-sound-icon'], row, '', [{ src: './assets/svg/icons/game/result/sound.svg' }, { alt: 'Results sound icon' }]);
    const wordsWrapper = createDomNode('div', ['results-words-wrapper'], row);
    createDomNode('p', ['results__english-word'], wordsWrapper, `${englishWords[i]}`);
    createDomNode('p', ['results__russian-word'], wordsWrapper, `${russianWords[i]}`);
    createDomNode('img', ['results-icon'], row, '', [
      {
        src: result[i] ? './assets/svg/icons/game/result/correct.svg' : './assets/svg/icons/game/result/incorrect.svg',
      },
      {
        alt: 'Results icon',
      }]);
  }

  const resultButtons = createDomNode('div', ['result-buttons'], sprintResultsWrapper);
  createDomNode('button', ['btn', 'restart__button'], resultButtons, 'Начать сначала');
  createDomNode('button', ['btn', 'btn_red', 'cancel__button'], resultButtons, 'Выйти');

  const soundIcon = document.querySelectorAll('.results-sound-icon') as NodeListOf<HTMLElement>;
  soundIcon.forEach((icon, iconIdx) => {
    icon.addEventListener('click', () => {
      audioPaths.forEach((path, idx) => {
        if (iconIdx === idx) {
          play(path);
        }
      });
    });
  });

  resultButtons.addEventListener('click', (e) => {
    const button = e.target as HTMLDivElement;
    if (button.classList.contains('restart__button')) {
      window.location.hash = '/games/sprint';
    } else if (button.classList.contains('cancel__button')) {
      if (!window.location.href.match(/random/) && !window.location.href.match(/hard-word/)) {
        window.location.hash = `/book`;
      } else if (window.location.href.match(/random/)) {
        window.location.hash = '/games';
      } else if (window.location.href.match(/hard-word/)) {
        window.location.hash = '/book/section-7';
      }
    }
  });

	hideBackground(page);

	const count: Array<number> = answersCounter(result);
	const percentCorrectAnswers: number = statsAboutGame(count);
	stats.setStatisticsAboutSprintGame(percentCorrectAnswers);
	
	app.setStatistics();

}

export default renderSprintResults;
