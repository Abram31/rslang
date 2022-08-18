import createDomNode from '../../../utils/createDomNode';
import './mainPage.scss';

export default class MainPageRender {
  private mainPage;

  private mainWrapper;

  private mainImage;

  private description;

  private title;

  private descriptionItem;

  private btnTransparent;

  constructor() {
    this.mainPage = createDomNode('main', ['main-page'], document.body);
    this.mainWrapper = createDomNode('div', ['wrapper', 'main-wrapper'], this.mainPage);

    this.description = createDomNode('div', ['description'], this.mainWrapper);
    this.title = createDomNode('h1', ['main-title'], this.description, 'Увеличивайте свой словарный запас вместе с нами');
    this.descriptionItem = createDomNode('p', ['description-item'], this.description, 'Сделайте изучение слов более увлекательным с помощью наших мини-игр');
    this.descriptionItem = createDomNode('p', ['description-item'], this.description, 'Авторизовывайтесь и открывайте новые возможности');
    this.btnTransparent = createDomNode('button', ['btn-transparent'], this.description, 'Смотреть видео');

    this.mainImage = createDomNode('img', ['main-image'], this.mainWrapper, '', [{ src: '../../../assets/svg/girl-main.svg' }, { alt: 'Girl' }]);
  }
}
