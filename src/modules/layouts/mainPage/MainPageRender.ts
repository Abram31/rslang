import createDomNode from '../../../utils/createDomNode';
import './mainPage.scss';

export default class MainPageRender {
  private mainPage;

  private mainWrapper;

  private description;

  private title;

  private descriptionItem;

  private btnTransparent;

  private mainPageImage;

  constructor(container: HTMLElement) {
    this.mainPage = createDomNode('main', ['main-page'], container);
    this.mainWrapper = createDomNode('div', ['main-wrapper'], this.mainPage);

    this.description = createDomNode('div', ['main-page__description'], this.mainWrapper);
    this.title = createDomNode('h1', ['title'], this.description, 'Увеличивайте свой словарный запас вместе с нами');
    this.descriptionItem = createDomNode('p', ['description-item'], this.description, 'Сделайте изучение слов более увлекательным с помощью наших мини-игр');
    this.descriptionItem = createDomNode('p', ['description-item'], this.description, 'Авторизовывайтесь и открывайте новые возможности');

    this.btnTransparent = createDomNode('button', ['btn', 'btn_transparent'], this.description, 'Смотреть видео');
    this.btnTransparent.addEventListener('click', () => {
      window.location.href = '#/video';
    });

    this.mainPageImage = createDomNode('img', ['main-page-image'], this.mainWrapper, '', [{ src: '../../../assets/girl-main.jpg' }, { alt: 'Girl' }]);
  }
}
