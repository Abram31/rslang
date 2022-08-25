import './video.scss';
import createDomNode from '../../../utils/createDomNode';

export default class VideoRender {
  private aboutApp;

  private aboutAppWrapper;

  private title;

  private videoContent;

  private videoPlayer;

  private videoPoster;

  private viewer;

  protected playBtn;

  private controls;

  private playIcon;

  private backIcon;

  private forwardIcon;

  private rangeSlider;

  private volumeIcon;

  protected rangeSliderVolume;

  constructor() {
    this.aboutApp = createDomNode('main', ['about-app', 'video'], document.body);
    this.aboutAppWrapper = createDomNode('div', ['wrapper', 'about-app-wrapper'], this.aboutApp);

    this.title = createDomNode('h1', ['title'], this.aboutAppWrapper, 'О приложении');

    this.videoContent = createDomNode('div', ['video__content'], this.aboutAppWrapper);

    this.videoPlayer = createDomNode('div', ['video__player'], this.videoContent);

    this.videoPoster = createDomNode('div', ['video__poster'], this.videoPlayer);
    this.viewer = createDomNode('video', ['viewer'], this.videoPlayer, '', [{ src: '../../../assets/video/video.mp4' }]) as HTMLVideoElement;
    this.playBtn = createDomNode('div', ['play-btn', 'play-btn-big'], this.videoPlayer);
    this.playBtn.addEventListener('click', () => this.tooglePlay());

    this.controls = createDomNode('div', ['controls'], this.videoPlayer);

    this.playIcon = createDomNode('div', ['play__icon', 'play'], this.controls);
    this.playIcon.addEventListener('click', () => this.tooglePlay());

    this.backIcon = createDomNode('img', ['skip__button'], this.controls, '', [{ src: '../../../assets/svg/video-back.svg' }, { alt: 'back' }]);
    this.backIcon.addEventListener('click', () => this.skipTenSecondsBack());

    this.forwardIcon = createDomNode('img', ['skip__button'], this.controls, '', [{ src: '../../../assets/svg/video-forward.svg' }, { alt: 'forward' }]);
    this.forwardIcon.addEventListener('click', () => this.skipTenSecondsForward());

    this.rangeSlider = createDomNode('input', ['range__slider', 'progress'], this.controls, '', [{ type: 'range' }, { name: 'progress' }, { value: '0' }, { min: '0' }, { max: '100' }, { step: '1' }]);

    this.volumeIcon = createDomNode('div', ['play__icon', 'volume-icon'], this.controls);
    this.volumeIcon.addEventListener('click', () => this.btnVolume());

    this.rangeSliderVolume = createDomNode('input', ['range__slider', 'volume'], this.controls, '', [{ type: 'range' }, { name: 'volume' }, { value: '0.4' }, { min: '0' }, { max: '1' }, { step: '0.01' }]) as HTMLInputElement;
  }

  tooglePlay() {
    if (this.viewer.paused) {
      this.viewer.play();
      this.playBtn.classList.toggle('play-btn-big');
      this.playIcon.style.backgroundImage = "url('../../../assets/svg/pause-video-controls.svg')";
      this.videoPoster.style.display = 'none';
      // updateProgress();
      // timerId = window.setInterval(updateProgress, 700);
    } else {
      this.viewer.pause();
      this.playBtn.classList.toggle('play-btn-big');
      this.playIcon.style.backgroundImage = "url('./assets/svg/play-video-controls.svg')";
    }
  }

  skipTenSecondsBack() {
    this.viewer.currentTime -= Number(10);
    this.playBtn.classList.add('play-btn-back');
    setTimeout(() => {
      this.playBtn.classList.remove('play-btn-back');
    }, 500);
  }

  skipTenSecondsForward() {
    this.viewer.currentTime += Number(10);
    this.playBtn.classList.add('play-btn-forward');
    setTimeout(() => {
      this.playBtn.classList.remove('play-btn-forward');
    }, 500);
  }

  btnVolume() {
    if (this.viewer.muted && this.viewer.volume > 0) {
      this.volumeIcon.style.backgroundImage = "url('../../../assets/svg/volume.svg')";
      this.viewer.muted = false;
    } else {
      this.volumeIcon.style.backgroundImage = "url('../../../assets/svg/volume_no.svg')";
      this.viewer.muted = true;
    }
  }
}
