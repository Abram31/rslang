import './header.scss';
import createDomNode from '../../../utils/createDomNode';
import AuthModal from '../../authentication/AuthModal';
import App from '../../../components/app';
import { getStorage } from '../../../utils/storage';
import NavigationSvg from '../../../interface/enumNavigationSvg';
import AuthorizationStateWindow from '../authorizationStateWindow/authorizationStateWindow';
import helpLoadNavigation from '../../../utils/helpLoadNavigation';
import uploadStatistics from '../../statistics/upload-statistics';

export default class HeaderRender {
  private header;

  private headerWrapper;

  private leftSide;

  private rightSide;

  private navigation;

  private userName;

  private authButton;

  private burger;

  protected burgerLine;

  private menuIcon;

  private overlay: HTMLDivElement | undefined;

  private modalWindow: HTMLDivElement | undefined;

  private title: HTMLElement | undefined;

  private btnCancel: HTMLButtonElement | undefined;

  private btnGoOut: HTMLButtonElement | undefined;

  private actionBtn: HTMLButtonElement | undefined;

  private cancelBtn: HTMLButtonElement | undefined;

  private root;

  private navigationItemMain;

  private navigationItemBook;

  private navigationItemGame;

  private navigationItemStats;

  private navigationItemAbout;

  private menuTextMain;

  private menuTextBook;

  private menuTextGame;

  private menuTextStats;

  private menuTextAbout;

  private logo;

  private maskContent;

  constructor() {
    this.header = createDomNode('header', [], document.body);
    this.headerWrapper = createDomNode('div', ['header-wrapper'], this.header);

    this.leftSide = createDomNode('div', ['header__left-side'], this.headerWrapper);
    this.rightSide = createDomNode('div', ['header__right-side'], this.headerWrapper);

    this.logo = createDomNode('img', ['logo'], this.leftSide, '', [{ src: './assets/svg/logo.svg' }]);

    this.navigation = createDomNode('nav', ['navigation'], this.leftSide);

    this.navigationItemMain = createDomNode('a', ['navigation__item', 'active'], this.navigation, '', [{ href: '#/' }]);
    this.menuIcon = createDomNode('div', ['menu__icon', 'menu__logo'], this.navigationItemMain);
    this.menuIcon.innerHTML = NavigationSvg.logo;
    this.menuTextMain = createDomNode('strong', ['menu__text', 'active'], this.navigationItemMain, 'Домой');
    this.navigationItemMain.addEventListener('click', () => this.navigationItemsActive(this.navigationItemMain, this.menuTextMain));

    this.navigationItemBook = createDomNode('a', ['navigation__item'], this.navigation, '', [{ href: '#/book' }]);
    this.menuIcon = createDomNode('div', ['menu__icon', 'menu__logo'], this.navigationItemBook);
    this.menuIcon.innerHTML = NavigationSvg.book;
    this.menuTextBook = createDomNode('strong', ['menu__text'], this.navigationItemBook, 'Учебник');
    this.navigationItemBook.addEventListener('click', () => this.navigationItemsActive(this.navigationItemBook, this.menuTextBook));

    this.navigationItemGame = createDomNode('a', ['navigation__item'], this.navigation, '', [{ href: '#/games' }]);
    this.menuIcon = createDomNode('div', ['menu__icon', 'menu__logo'], this.navigationItemGame);
    this.menuIcon.innerHTML = NavigationSvg.puzzle;
    this.menuTextGame = createDomNode('strong', ['menu__text'], this.navigationItemGame, 'Игры');
    this.navigationItemGame.addEventListener('click', () => this.navigationItemsActive(this.navigationItemGame, this.menuTextGame));

    this.navigationItemStats = createDomNode('a', ['navigation__item'], this.navigation, '', [{ href: '#/stats' }]);
    this.menuIcon = createDomNode('div', ['menu__icon', 'menu__logo'], this.navigationItemStats);
    this.menuIcon.innerHTML = NavigationSvg.statisc;
    this.menuTextStats = createDomNode('strong', ['menu__text'], this.navigationItemStats, 'Статистика');
    this.navigationItemStats.addEventListener('click', () => this.navigationItemsActive(this.navigationItemStats, this.menuTextStats));

    this.navigationItemAbout = createDomNode('a', ['navigation__item'], this.navigation, '', [{ href: '#/about' }]);
    this.menuIcon = createDomNode('div', ['menu__icon'], this.navigationItemAbout);
    this.menuIcon.innerHTML = NavigationSvg.team;
    this.menuTextAbout = createDomNode('strong', ['menu__text'], this.navigationItemAbout, 'Команда');
    this.navigationItemAbout.addEventListener('click', () => this.navigationItemsActive(this.navigationItemAbout, this.menuTextAbout));

    this.userName = createDomNode('p', ['user-name'], this.rightSide);

    this.authButton = createDomNode('button', ['btn', 'btn_red'], this.rightSide, 'Вход');
    this.authButton.addEventListener('click', () => this.updateLoginButton());

    this.burger = createDomNode('div', ['burger'], this.rightSide);
    this.burger.addEventListener('click', () => this.burgerSubscribe());

    this.maskContent = createDomNode('div', ['mask-content'], this.rightSide);

    this.burgerLine = createDomNode('span', ['burger__line'], this.burger);

    if (getStorage('id') !== null) {
      new App().getUser()
        .then((res) => {
          this.userName.innerHTML = res.name;
          this.authButton.innerHTML = 'Выйти';
        });
      // .catch(() => {
      //   new AuthorizationStateWindow('Время сессии истекло, вам необходимо авторизоваться');
      // });
      // new App().getStatistics()
      //   .then((res) => sessionStorage.setItem('statistics', JSON.stringify(res)));
      uploadStatistics();
    }

    this.loadNavigation();
    this.root = createDomNode('div', [], document.body, '', [{ id: 'root' }]);
  }

  toggleMenu() {
    this.burger.classList.toggle('open');
    this.navigation.classList.toggle('open');
    this.maskContent.classList.toggle('open');
  }

  burgerSubscribe() {
    this.toggleMenu();
    [this.navigationItemMain, this.navigationItemBook, this.navigationItemGame,
      this.navigationItemStats, this.navigationItemAbout].forEach((el) => el.addEventListener('click', () => {
      this.burger.classList.remove('open');
      this.navigation.classList.remove('open');
      this.maskContent.classList.remove('open');
    }));
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
      sessionStorage.clear();
      window.location.reload();
      this.userName.innerHTML = '';
      this.authButton.innerHTML = 'Вход';
      this.overlay?.remove();
    });
  }

  navigationItemsActive(elem: HTMLElement, text: HTMLElement) {
    [this.navigationItemMain, this.navigationItemBook, this.navigationItemGame,
      this.navigationItemStats, this.navigationItemAbout].forEach((el) => {
      el.classList.remove('active');
    });

    [this.menuTextMain, this.menuTextBook, this.menuTextGame,
      this.menuTextStats, this.menuTextAbout].forEach((el) => {
      el.classList.remove('active');
    });

    elem.classList.add('active');
    text.classList.add('active');
  }

  loadNavigation() {
    [this.navigationItemMain, this.navigationItemBook, this.navigationItemGame,
      this.navigationItemStats, this.navigationItemAbout].forEach((el) => {
      el.classList.remove('active');

      helpLoadNavigation(el, /book/);
      helpLoadNavigation(el, /games/);
      helpLoadNavigation(el, /stats/);
      helpLoadNavigation(el, /about/);

      if (!window.location.href.match(/about/) && !el.getAttribute('href')?.match(/about/)) {
        if (!window.location.href.match(/stats/) && !el.getAttribute('href')?.match(/stats/)) {
          if (!window.location.href.match(/games/) && !el.getAttribute('href')?.match(/games/)) {
            if (!window.location.href.match(/book/) && !el.getAttribute('href')?.match(/book/)) {
              el.classList.add('active');
            }
          }
        }
      }
    });

    [this.menuTextMain, this.menuTextBook, this.menuTextGame,
      this.menuTextStats, this.menuTextAbout].forEach((el) => {
      el.classList.remove('active');
      if (el.parentElement?.classList.contains('active')) {
        el.classList.add('active');
      }
    });
  }
}
