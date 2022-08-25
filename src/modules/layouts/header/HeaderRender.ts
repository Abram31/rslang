import './header.scss';
import createDomNode from '../../../utils/createDomNode';
import AuthModal from '../../authentication/AuthModal';
import App from '../../../components/app';
import { getStorage } from '../../../utils/storage';

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

  private overlay: HTMLDivElement | undefined;

  private modalWindow: HTMLDivElement | undefined;

  private title: HTMLElement | undefined;

  private btnCancel: HTMLButtonElement | undefined;

  private btnGoOut: HTMLButtonElement | undefined;

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

    if (getStorage('id') !== null) {
      this.authButton.innerHTML = 'Выйти';
      new App().getUser()
        .then((res) => {
          this.userName.innerHTML = res.name;
        });
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
      this.modalOut();
    }
  }

  modalOut() {
    this.overlay = createDomNode('div', ['overlay'], document.body) as HTMLDivElement;
    this.modalWindow = createDomNode('div', ['modal-window'], this.overlay) as HTMLDivElement;

    this.title = createDomNode(
      'h2',
      ['title'],
      this.modalWindow,
      'Вы действительно хотите выйти?',
    );

    this.btnCancel = createDomNode('button', ['btn', 'btn_red'], this.modalWindow, 'Отмена') as HTMLButtonElement;
    this.btnCancel.addEventListener('click', () => this.overlay?.remove());

    this.btnGoOut = createDomNode('button', ['btn', 'btn_red'], this.modalWindow, 'Да') as HTMLButtonElement;
    this.btnGoOut.addEventListener('click', () => {
      localStorage.clear();
      this.userName.innerHTML = '';
      this.authButton.innerHTML = 'Вход';
      this.overlay?.remove();
    });
  }
}
