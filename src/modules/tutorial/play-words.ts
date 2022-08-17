import { baseURL } from './fetch/fetch';

const playAudio = (pathName: string) => {
  const audio = new Audio(`${baseURL}${pathName}`);
  audio.play();
};
export default playAudio;
