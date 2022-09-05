import { IdataFromServer } from '../../interface/interface';
import { getSessinoStorage } from './sessionStorage';

const changeVoiceLinkToImage = () => {
  const buttonVoice = document.querySelector('.container-game-audio-call__button-call-voice') as HTMLDivElement;
  const data: IdataFromServer[] = getSessinoStorage('list-game-audio');
  data.find((item) => item.id === buttonVoice.id);
};

export default changeVoiceLinkToImage;
