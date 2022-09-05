import renderSprintResults from './results/sprint_results';

const timer = () => {
  const timerDiv = document.querySelector('.sprint-timer') as HTMLElement;
  let time = Number(timerDiv.innerText);
  const changeTime = setInterval(() => {
    if (time <= 0) {
      try {
        const counter = document.querySelector('.sprint-counter') as HTMLElement;
        const score = Number(counter.innerText);
        renderSprintResults(score);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('error');
      }
      clearInterval(changeTime);
    } else {
      try {
        timerDiv.innerHTML = time.toString();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('error');
      }
    }
    time -= 1;
  }, 1000);
  window.addEventListener('hashchange', () => {
    if (window.location.href.split('/').reverse()[1] !== 'sprint') {
      clearInterval(changeTime);
    }
  });
};

export default timer;
