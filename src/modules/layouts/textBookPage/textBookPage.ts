import createDomNode from '../../../utils/createDomNode';
import './textBookPage.scss';

export default class TextBookPage {
  private textBookPage;

  private textBookWrapper;

  private title;

  private containerTextBook;

  private selectPage: HTMLElement | undefined;

  private containerSelectPage: HTMLElement | undefined;

  private option: HTMLElement | undefined;

  private image;

  constructor() {
    this.textBookPage = createDomNode('main', ['text-book-page'], document.body);
    this.textBookWrapper = createDomNode('div', ['wrapper', 'text-book-page-wrapper'], this.textBookPage);
    this.title = createDomNode('h1', ['title-center'], this.textBookWrapper, 'Выберите страницу');

    this.containerTextBook = createDomNode('div', ['container-text-book'], this.textBookWrapper);
    this.containerSelectPage = createDomNode('div', ['container-select-page'], this.containerTextBook);
    this.selectPage = createDomNode('select', ['select-page'], this.containerSelectPage, '', [{ required: '' }]);
    this.option = createDomNode('option', [], this.selectPage, 'Выберите страницу', [{ hidden: '' }]);
    this.createSelectPage();

    this.image = createDomNode('img', ['image-page'], this.containerTextBook, '', [{ src: '../../../assets/friends.jpg' }, { alt: 'friend' }]);
  }

  createSelectPage() {
    for (let i = 1; i <= 30; i += 1) {
      this.option = createDomNode('option', [], this.selectPage, `Page ${i}`, [{ value: `${i}` }]);
    }
  }
}
