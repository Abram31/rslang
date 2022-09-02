import { renderSprintResults } from "./results/sprint_results";

const timer = () => {
	let timerDiv = document.querySelector('.sprint-timer') as HTMLElement;
	let time: number = Number(timerDiv.innerText);
	const changeTime = setInterval(() => {
		if (time <= 0) {
			// console.log('End');
			timerDiv.innerText = 'End';
			renderSprintResults();
			// let result = userResponse();
			// console.log(result);
			clearInterval(changeTime);
		} else {
			// console.log(`Running ${time}`);
			timerDiv.innerHTML = time.toString();
		}
		time--;
	}, 1000)
}

export { timer };