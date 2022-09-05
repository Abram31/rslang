import createDomNode from '../../../utils/createDomNode';
import './textBookPage.scss';

export default class TextBookPage {
  private pageTextbook;

  private textBookWrapper;

  private title;

  private selectPage;

  private option;

  private imageFriend;

  constructor(container: HTMLElement) {
    this.pageTextbook = createDomNode('main', ['page-textbook'], container);

    this.textBookWrapper = createDomNode('div', ['wrapper', 'page-textbook-wrapper'], this.pageTextbook);
    this.title = createDomNode('h1', ['title'], this.textBookWrapper, 'Выберите страницу');

    this.selectPage = createDomNode('select', ['select-page'], this.textBookWrapper, '', [{ required: '' }]) as HTMLSelectElement;
    this.selectPage.onchange = () => {
      const currentURL = window.location.href;
      window.location.href = `${currentURL}/${this.selectPage.value}`;
    };

    this.option = createDomNode('option', [], this.selectPage, 'Выберите страницу', [{ hidden: '' }, { value: '' }]);
    this.createSelectPage();

    this.imageFriend = createDomNode('img', ['image-friend'], this.textBookWrapper, '', [{ src: './assets/jpg/friends.jpg' }, { alt: 'friend' }]);
  }

  createSelectPage() {
    for (let i = 1; i <= 30; i += 1) {
      this.option = createDomNode('option', [], this.selectPage, `Page ${i}`, [{ value: `${i}` }]);
    }
  }
}
