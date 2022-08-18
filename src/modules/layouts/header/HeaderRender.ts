import './header.scss';
import createDomNode from '../../../utils/createDomNode';
import AuthModal from '../../authentication/AuthModal';

export default class HeaderRender {
  private header;

  private headerWrapper;

  private logo;

  private leftSide;

  private navigation;

  private navigationList;

  private navigationTextbook;

  private navigationGame;

  private navigationStatistics;

  private navigationTeam;

  private rightSide;

  private nameUser;

  private authButton;

  private burger;

  private burgerLine;

  constructor() {
    this.header = createDomNode('header', ['header'], document.body);
    this.headerWrapper = createDomNode('div', ['wrapper', 'header-wrapper'], this.header);
    this.leftSide = createDomNode('div', ['left-side'], this.headerWrapper);

    this.logo = createDomNode('p', ['logo'], this.leftSide, 'RSLang');

    this.navigation = createDomNode('nav', ['navigation'], this.leftSide);
    this.navigationList = createDomNode('ul', ['navigation-list'], this.navigation);
    this.navigationTextbook = createDomNode('li', ['navigation-item'], this.navigationList, 'Учебник');
    this.navigationGame = createDomNode('li', ['navigation-item'], this.navigationList, 'Мини-игры');
    this.navigationStatistics = createDomNode('li', ['navigation-item'], this.navigationList, 'Статистика');
    this.navigationTeam = createDomNode('li', ['navigation-item'], this.navigationList, 'О команде');

    this.rightSide = createDomNode('div', ['right-side'], this.headerWrapper);
    this.nameUser = createDomNode('p', ['user-name'], this.rightSide);

    this.authButton = createDomNode('button', ['btn'], this.rightSide, 'Вход');
    this.authButton.addEventListener('click', () => this.updateLoginButton());

    this.burger = createDomNode('div', ['burger'], this.rightSide);
    this.burger.addEventListener('click', () => this.toggleMenu());

    this.burgerLine = createDomNode('span', ['burger__line'], this.burger);

    if (localStorage.getItem('name') !== null) {
      this.nameUser.innerHTML = localStorage.getItem('name') as string;
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
      this.nameUser.innerHTML = '';
      this.authButton.innerHTML = 'Вход';
    }
  }
}
