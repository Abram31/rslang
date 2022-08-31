import { body } from '../tutorial/get words/render-result-find-to-page';

// eslint-disable-next-line import/prefer-default-export
export const playSoundsAfterAnswer = (url:string) => {
  const audio = new Audio(url);
  audio.play();
};
