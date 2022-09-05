import renderSprintResults from './results/sprint_results';

const timer = () => {
	const timerDiv = document.querySelector('.sprint-timer') as HTMLElement;
	let time: number = Number(timerDiv.innerText);
	const changeTime = setInterval(() => {
		if (time <= 0) {
			try {
				const counter = document.querySelector('.sprint-counter') as HTMLElement;
				const score = Number(counter.innerText);
				renderSprintResults(score);
			} catch {
				
			}
			clearInterval(changeTime);
		} else {
			try {
				timerDiv.innerHTML = time.toString();
			} catch {
				console.log('ended')
			}	
		}
		time--;
	}, 1000)
	window.addEventListener('hashchange', () => {
		if (window.location.href.split('/').reverse()[1] !== 'sprint') {
			clearInterval(changeTime);
		}
	})
}

export default timer;
