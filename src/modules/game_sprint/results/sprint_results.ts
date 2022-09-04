import createDomNode from '../../../utils/createDomNode';
import './sprint_results.scss';
import { englishWords, russianWords, result, audioPaths, play } from '../game_sprint';

const hideBackground = (page: HTMLElement) => {
	page.style.background = 'none';
}

const renderSprintResults = (score: number) => {
  let page = document.querySelector('.sprint-game') as HTMLElement;
  page.innerHTML = '';

	let sprintResultsPage = createDomNode('div', ['sprint-results', 'hidden'], page);
	let sprintResultsWrapper = createDomNode('div', ['wrapper', 'sprint-results-wrapper'], sprintResultsPage);

	createDomNode('h1', ['sprint-results__title'], sprintResultsWrapper, 'Результаты');
	createDomNode('h3', ['results-score'], sprintResultsWrapper, `Ваш результат: ${score}.`)
	let resultsContainer = createDomNode('div', ['sprint-results__container'], sprintResultsWrapper);

	for (let i = 0; i < result.length; i++) {
		let row = createDomNode('div', ['results-container__row'], resultsContainer);
		createDomNode('img', ['results-sound-icon'], row, '', [{ src: '../../assets/svg/icons/result-sprint-sound.svg' }, { alt: 'Results sound icon' }]);
		let wordsWrapper = createDomNode('div', ['results-words-wrapper'], row);
		createDomNode('p', ['results__english-word'], wordsWrapper, `${englishWords[i]}`);
		createDomNode('p', ['results__russian-word'], wordsWrapper, `${russianWords[i]}`);
		createDomNode('img', ['results-icon'], row, '', [
			{ 
				src: result[i] ? '../../assets/svg/icons/result-sprint-correct.svg' : '../../assets/svg/icons/result-sprint-incorrect.svg'
			}, 
			{ 
				alt: 'Results icon' 
			}]);
	}

	let resultButtons = createDomNode('div', ['result-buttons'], sprintResultsWrapper);
	createDomNode('button', ['btn', 'restart__button'], resultButtons, 'Начать сначала');
	createDomNode('button', ['btn', 'btn_red', 'cancel__button'], resultButtons, 'Выйти');

	let soundIcon = document.querySelectorAll('.results-sound-icon') as NodeListOf<HTMLElement>;
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

	hideBackground(page);
}

export { renderSprintResults };