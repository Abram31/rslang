import createDomNode from '../../../utils/createDomNode';
import './sprint_results.scss';
import Statistics from '../../statistics/statistics';
import {
  englishWords, russianWords, result, audioPaths, play,
} from '../game_sprint';
import App from '../../../components/app';

const hideBackground = (page: HTMLElement) => {
  // eslint-disable-next-line no-param-reassign
  page.style.background = 'none';
};

const answersCounter = (array: Array<boolean>) => {
	let correctAnswers = 0;
	let inCorrectAnswers = 0;
	array.forEach(item => {
		item ? correctAnswers++ : inCorrectAnswers++;
	})
	return [correctAnswers, inCorrectAnswers];
}

const statsAboutGame = (array: Array<number>) => {
	const percentCorrectAnswers = Math.round((array[0] / (array[0] + array[1])) * 100);
	return percentCorrectAnswers;
}

const stats = new Statistics('sprint');

const renderSprintResults = (score: number) => {
	const page = document.querySelector('.sprint-game') as HTMLElement;
  page.innerHTML = '';

  const sprintResultsPage = createDomNode('div', ['sprint-results', 'hidden'], page);
  const sprintResultsWrapper = createDomNode('div', ['wrapper', 'sprint-results-wrapper'], sprintResultsPage);

	createDomNode('h1', ['sprint-results__title'], sprintResultsWrapper, 'Результаты');
	createDomNode('h3', ['results-score'], sprintResultsWrapper, `Ваш результат: ${score}.`)
	const resultsContainer = createDomNode('div', ['sprint-results__container'], sprintResultsWrapper);

  for (let i = 0; i < result.length; i += 1) {
    const row = createDomNode('div', ['results-container__row'], resultsContainer);
    createDomNode('img', ['results-sound-icon'], row, '', [{ src: '../../assets/svg/icons/result-sprint-sound.svg' }, { alt: 'Results sound icon' }]);
    const wordsWrapper = createDomNode('div', ['results-words-wrapper'], row);
    createDomNode('p', ['results__english-word'], wordsWrapper, `${englishWords[i]}`);
    createDomNode('p', ['results__russian-word'], wordsWrapper, `${russianWords[i]}`);
    createDomNode('img', ['results-icon'], row, '', [
      {
        src: result[i] ? '../../assets/svg/icons/result-sprint-correct.svg' : '../../assets/svg/icons/result-sprint-incorrect.svg',
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
			})
		})
	});

	resultButtons.addEventListener('click', (e) => {
		const button = e.target as HTMLDivElement;
		if (button.classList.contains('restart__button')) {
			window.location.hash = '/games/sprint';
		} else if (button.classList.contains('cancel__button')) {
			window.location.hash = '/games';
		}
	});

	const count: Array<number> = answersCounter(result);
	const percentCorrectAnswers: number = statsAboutGame(count);
	stats.setStatisticsAboutSprintGame(percentCorrectAnswers);
	(new App).setStatistics();

	hideBackground(page);
}
export default renderSprintResults;
