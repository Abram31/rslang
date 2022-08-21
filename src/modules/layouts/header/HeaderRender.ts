import './header.scss';
import createDomNode from '../../../utils/createDomNode';
import AuthModal from '../../authentication/AuthModal';

export default class HeaderRender {
  private header;

  private headerWrapper;

  private leftSide;

  private rightSide;

  protected logo;

  private navigation;

  private navigationList;

  private navigationLi;

  protected navigationItem;

  private userName;

  private authButton;

  private burger;

  protected burgerLine;

  constructor() {
    this.header = createDomNode('header', [], document.body);
    this.headerWrapper = createDomNode('div', ['header-wrapper'], this.header);

    this.leftSide = createDomNode('div', ['header__left-side'], this.headerWrapper);
    this.rightSide = createDomNode('div', ['header__right-side'], this.headerWrapper);

    this.logo = createDomNode('a', ['logo'], this.leftSide, '', [{ href: '#/' }]);

    this.navigation = createDomNode('nav', ['navigation'], this.leftSide);
    this.navigationList = createDomNode('ul', ['navigation__list'], this.navigation);
    this.navigationLi = createDomNode('li', [], this.navigationList);
    this.navigationItem = createDomNode('a', ['navigation__item'], this.navigationLi, 'Учебник', [{ href: '#/book' }]);
    this.navigationLi = createDomNode('li', [], this.navigationList);
    this.navigationItem = createDomNode('a', ['navigation__item'], this.navigationLi, 'Мини-игры', [{ href: '#/games' }]);
    this.navigationLi = createDomNode('li', [], this.navigationList);
    this.navigationItem = createDomNode('a', ['navigation__item'], this.navigationLi, 'Статистика', [{ href: '#/stats' }]);
    this.navigationLi = createDomNode('li', [], this.navigationList);
    this.navigationItem = createDomNode('a', ['navigation__item'], this.navigationLi, 'О команде', [{ href: '#/about' }]);

    this.userName = createDomNode('p', ['user-name'], this.rightSide);

    this.authButton = createDomNode('button', ['btn', 'btn_red'], this.rightSide, 'Вход');
    this.authButton.addEventListener('click', () => this.updateLoginButton());

    this.burger = createDomNode('div', ['burger'], this.rightSide);
    this.burger.addEventListener('click', () => this.toggleMenu());

    this.burgerLine = createDomNode('span', ['burger__line'], this.burger);

    if (localStorage.getItem('name') !== null) {
      this.userName.innerHTML = localStorage.getItem('name') as string;
      this.authButton.innerHTML = 'Выйти';
    }
  }

  toggleMenu() {
    this.burger.classList.toggle('open');
    this.navigation.classList.toggle('open');
  }

  updateLoginButton() {
    if (this.authButton.innerHTML === 'Вход') {
      new AuthModal('Войти', 'Войдите в свою учетную запись').modalSignInRender();
    } else {
      localStorage.clear();
      this.userName.innerHTML = '';
      this.authButton.innerHTML = 'Вход';
    }
  }
}
