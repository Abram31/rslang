import playAudio from '../tutorial/play-words';

const sectionAudioCall = document.querySelector('.container-game-audio-call') as HTMLElement;
sectionAudioCall.addEventListener('click', (event) => {
  const element = event.target as HTMLDivElement;
  if (element.classList.contains('container-game-audio-call__button-call-voice')) {
    const pathToVoice = element.getAttribute('data-voice') as string;
    playAudio(pathToVoice);
  }
});
