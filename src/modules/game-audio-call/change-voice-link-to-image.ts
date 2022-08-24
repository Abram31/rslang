import { baseURL } from '../tutorial/fetch/fetch';
import { IdataFromServer } from '../tutorial/get words/render-result-find-to-page';
import { getSessinoStorage } from './sessionStorage';

const changeVoiceLinkToImage = () => {
  const buttonVoice = document.querySelector('.container-game-audio-call__button-call-voice') as HTMLDivElement;
  const data: IdataFromServer[] = getSessinoStorage('list-game-audio');
  const word = data.find((item) => item.id === buttonVoice.id);
 
  //   setTimeout(() => {
  //     buttonVoice.style.backgroundImage = `url(${baseURL}${word?.image})`;
  //   buttonVoice.classList.add('flip');
  //     console.log(`url(${baseURL}${word?.image})`);
  // }, 500);
};

export default changeVoiceLinkToImage;
