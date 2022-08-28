import { baseURL } from './fetch/fetch';

const playAudio = (listPath: string) => {
  const arrayPath = JSON.parse(listPath);
  const playRecursive = (data: string[], numberI: number) => {
    let i = numberI;
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
