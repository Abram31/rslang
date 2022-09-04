import createDomNode from '../../../utils/createDomNode';
import './sprint_results.scss';
import { englishWords, russianWords, result, audioPaths, play } from '../game_sprint';

const hideBackground = (page: HTMLElement) => {
	page.style.background = 'none';
}

const renderSprintResults = () => {
  let page = document.querySelector('.sprint-game') as HTMLElement;
  page.innerHTML = '';

	let sprintResultsPage = createDomNode('div', ['sprint-results', 'hidden'], page);
	let sprintResultsWrapper = createDomNode('div', ['wrapper', 'sprint-results-wrapper'], sprintResultsPage);

	createDomNode('h1', ['sprint-results__title'], sprintResultsWrapper, 'Результаты');
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

	let soundIcon = document.querySelectorAll('.results-sound-icon') as NodeListOf<HTMLElement>;
	soundIcon.forEach((icon, iconIdx) => {
		icon.addEventListener('click', () => {
			audioPaths.forEach((path, idx) => {
				if (iconIdx === idx) {
					play(path);
				}
			})
		})
	})

	hideBackground(page);
}

export { renderSprintResults };