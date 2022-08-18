import createDomNode from '../../../utils/createDomNode';
import './mainPage.scss';

export default class MainPageRender {
  private mainPage;

  private mainWrapper;

  private mainImage;

  private description;

  private title;

  private descriptionList;

  private descriptionItem;

  private btnTransparent;

  constructor() {
    this.mainPage = createDomNode('div', ['main-page'], document.body);
    this.mainWrapper = createDomNode('div', ['main-wrapper'], this.mainPage);

    this.mainImage = createDomNode('img', ['main-image'], this.mainWrapper, '', [{ src: '../../../assets/mainImg.png' }, { alt: 'Pupil' }]);

    this.description = createDomNode('div', ['description'], this.mainWrapper);
    this.title = createDomNode('h1', ['main-title'], this.description, 'Увеличивайте свой словарный запас вместе с нами');
    this.descriptionList = createDomNode('ul', ['description-list'], this.description);
    this.descriptionItem = createDomNode('li', ['description-item'], this.descriptionList, 'Сделайте изучение слов более увлекательным с помощью наших мини-игр');
    this.descriptionItem = createDomNode('li', ['description-item'], this.descriptionList, 'У авторизованных пользователей отображается раздел "Сложные слова", прогресс изучения слов, изученные слова и статистика');
    this.btnTransparent = createDomNode('button', ['btn-transparent'], this.description, 'Смотреть видео');
  }
}
