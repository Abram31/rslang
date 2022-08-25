import { baseURL } from '../tutorial/fetch/fetch';
import { IdataFromServer } from '../tutorial/get words/render-result-find-to-page';
import { getSessinoStorage } from './sessionStorage';

const changeVoiceLinkToImage = () => {
  const buttonVoice = document.querySelector('.container-game-audio-call__button-call-voice') as HTMLDivElement;
  const data: IdataFromServer[] = getSessinoStorage('list-game-audio');
  const word = data.find((item) => item.id === buttonVoice.id);

};

export default changeVoiceLinkToImage;
