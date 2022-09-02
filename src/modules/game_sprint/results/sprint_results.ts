import createDomNode from '../../../utils/createDomNode';
import './sprint_results.scss';
import HeaderRender from '../../layouts/header/HeaderRender';
import FooterRender from '../../layouts/footer/FooterRender';
import { renderSprintGame, getWords } from '../game_sprint';
import { englishWords, russianWords, result, audioPaths, play } from '../game_sprint';




const renderSprintResults = () => {
  let body = document.querySelector('body') as HTMLElement;
	body.innerHTML = '';
	new HeaderRender();

	let sprintResultsPage = createDomNode('main', ['sprint-results'], document.body);
	let sprintResultsWrapper = createDomNode('div', ['wrapper', 'sprint-results-wrapper'], sprintResultsPage);

	createDomNode('h1', ['sprint-results__title'], sprintResultsWrapper, 'Результаты');
	let resultsContainer = createDomNode('div', ['sprint-results__container'], sprintResultsWrapper);

	for (let i = 0; i < result.length; i++) {
		let row = createDomNode('div', ['results-container__row'], resultsContainer);
		createDomNode('img', ['results-sound-icon'], row, '', [{ src: '../../assets/svg/icons/result-sprint-sound.svg' }, { alt: 'Results sound icon' }]);
		createDomNode('p', ['results__english-word'], row, `${englishWords[i]}`);
		createDomNode('p', ['results__russian-word'], row, `${russianWords[i]}`);
		createDomNode('img', ['results-icon'], row, '', [
			{ 
				src: result[i] ? '../../assets/svg/icons/result-sprint-correct.svg' : '../../assets/svg/icons/result-sprint-incorrect.svg'
			}, 
			{ 
				alt: 'Results icon' 
			}]);
	}
	

	new FooterRender();

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
}

export { renderSprintResults };