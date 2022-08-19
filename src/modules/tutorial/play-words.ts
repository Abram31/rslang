import { baseURL } from './fetch/fetch';

const playAudio = (listPath: string) => {
  const arrayPath = JSON.parse(listPath);
  const playRecursive = (data: string[], numberI: number) => {
    let i = numberI;
    // if (numberI === 0) {
    //   const allAudio = document.querySelectorAll('audio') as NodeListOf<HTMLAudioElement>;
    //   allAudio.forEach((track: HTMLAudioElement) => track.pause());
    // }

    return (function () {
      if (data.length > i) {
        const audio = new Audio(`${baseURL}${data[i]}`);
        audio.play();
        i += 1;
        audio.addEventListener('ended', () => playRecursive(data, i));
      }
    }());
  };
  playRecursive(arrayPath, 0);
};
export default playAudio;
