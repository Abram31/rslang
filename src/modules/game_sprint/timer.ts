import { renderSprintResults } from './results/sprint_results';

const timer = () => {
	let timerDiv = document.querySelector('.sprint-timer') as HTMLElement;
	let time: number = Number(timerDiv.innerText);
	const changeTime = setInterval(() => {
		if (time <= 0) {
			let counter = document.querySelector('.sprint-counter') as HTMLElement;
			let score = Number(counter.innerText);
			renderSprintResults(score);
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