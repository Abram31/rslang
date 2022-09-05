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

  private descriptionLi;

  constructor(container: HTMLElement) {
    this.mainPage = createDomNode('main', ['main-page'], container);
    this.mainWrapper = createDomNode('div', ['main-wrapper'], this.mainPage);

    this.description = createDomNode('div', ['main-page__description'], this.mainWrapper);
    this.title = createDomNode('h1', ['title'], this.description, 'Увеличивайте свой словарный запас вместе с нами');
    this.descriptionItem = createDomNode('p', ['description-item'], this.description, 'Сделайте изучение слов более увлекательным с помощью наших мини-игр');
    this.descriptionItem = createDomNode('ul', ['description-item'], this.description, 'Авторизовывайтесь и открывайте новые возможности');
    this.descriptionLi = createDomNode('li', ['description-li'], this.descriptionItem, 'Прогресс изучения слов');
    this.descriptionLi = createDomNode('li', ['description-li'], this.descriptionItem, 'Добавление слов в раздел сложных');
    this.descriptionLi = createDomNode('li', ['description-li'], this.descriptionItem, 'Статистика');

    this.btnTransparent = createDomNode('a', ['btn', 'btn_link'], this.description, 'Видeooбзop приложения', [{ href: 'https://www.youtube.com/watch?v=aXXA2DWbcwE' }, { target: 'blank' }]);
    // this.btnTransparent.addEventListener('click', () => {
    //   window.location.href = '#/video';
    // });

    this.mainPageImage = createDomNode('img', ['main-page-image'], this.mainWrapper, '', [{ src: './assets/girl-main.jpg' }, { alt: 'Girl' }]);
  }
}
