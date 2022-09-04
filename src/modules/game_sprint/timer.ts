import { renderSprintResults } from './results/sprint_results';

const timer = () => {
	
	let timerDiv = document.querySelector('.sprint-timer') as HTMLElement;
	let time: number = Number(timerDiv.innerText);
	const changeTime = setInterval(() => {
		if (time <= 0) {
			renderSprintResults();
			clearInterval(changeTime);
		} else {
			timerDiv.innerHTML = time.toString();
		}
		time--;
	}, 1000)
	window.addEventListener('hashchange', () => {
		if (window.location.href.split('/').reverse()[1] !== 'sprint') {
			clearInterval(changeTime);
		}
	})
}

export { timer };