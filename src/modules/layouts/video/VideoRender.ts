import './video.scss';
import createDomNode from '../../../utils/createDomNode';

export default class VideoRender {
  private aboutApp;

  private aboutAppWrapper;

  private title;

  private videoContent;

  constructor(container: HTMLElement) {
    this.aboutApp = createDomNode('main', ['about-app', 'video'], container);
    this.aboutAppWrapper = createDomNode('div', ['wrapper', 'about-app-wrapper'], this.aboutApp);

    this.title = createDomNode('h1', ['title'], this.aboutAppWrapper, 'О приложении');

    this.videoContent = createDomNode('div', ['video__content'], this.aboutAppWrapper);

    this.videoContent.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/TWyjWfAVOZo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }
}
