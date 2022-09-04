import createDomNode from '../../../utils/createDomNode';
import './aboutTeam.scss';

export default class AboutTeam {
  private mainTeam;

  private teamWrapper;

  private title;

  private teamItems;

  private person: HTMLDivElement | undefined;

  private container: HTMLDivElement | undefined;

  private containerInner: HTMLDivElement | undefined;

  private background: HTMLImageElement | undefined;

  private photo: HTMLImageElement | undefined;

  private name: HTMLDivElement | undefined;

  private divider: HTMLDivElement | undefined;

  private linkIcon: HTMLAnchorElement | undefined;

  private socialLinks: HTMLDivElement | undefined;

  constructor(container: HTMLElement) {
    this.mainTeam = createDomNode('main', ['team'], container);
    this.teamWrapper = createDomNode('div', ['wrapper', 'team-wrapper'], this.mainTeam);

    this.title = createDomNode('h1', ['title'], this.teamWrapper, 'О команде');

    this.teamItems = createDomNode('div', ['team__items'], this.teamWrapper);

    this.createItemTeam('./assets/teamPhoto/bg1.jpg', 'Фон', 'img1', './assets/teamPhoto/veronika.png', 'Veronika', 'Вероника', 'Авторизация, дизайн приложения', 'https://github.com/Veronika2811', 'https://www.linkedin.com/in/veranika-smiayun-9a2297235/');
    this.createItemTeam('./assets/teamPhoto/bg2.jpg', 'Фон', 'img2', './assets/teamPhoto/artem.png', 'Artem', 'Артем', 'Учебник, игра "Аудиовызов"', 'https://github.com/abram31', 'https://www.linkedin.com/in/artem-abramovich-45a06a230/');
    this.createItemTeam('./assets/teamPhoto/bg3.jpg', 'Фон', 'img1', './assets/teamPhoto/veronika.png', 'Pavel', 'Павел', 'Роутинг, игра "Спринт"', 'https://github.com/paulonio', '#');
  }

  createItemTeam(
    bg: string,
    bgAlt: string,
    classPhoto: string,
    photo: string,
    photoAlt: string,
    name: string,
    didDo: string,
    linkGithub: string,
    linkLinkedin: string,
  ) {
    this.person = createDomNode('div', ['person'], this.teamItems) as HTMLDivElement;
    this.container = createDomNode('div', ['container'], this.person) as HTMLDivElement;
    this.containerInner = createDomNode('div', ['container-inner'], this.container) as HTMLDivElement;
    this.background = createDomNode('img', ['circ'], this.containerInner, '', [{ src: `${bg}` }, { alt: `${bgAlt}` }]) as HTMLImageElement;
    this.photo = createDomNode('img', ['img', `${classPhoto}`], this.containerInner, '', [{ src: `${photo}` }, { alt: `${photoAlt}` }]) as HTMLImageElement;

    this.divider = createDomNode('div', ['divider'], this.person) as HTMLDivElement;
    this.name = createDomNode('div', ['name'], this.person, `${name}`) as HTMLDivElement;
    this.title = createDomNode('div', ['title-description'], this.person, `${didDo}`) as HTMLDivElement;

    this.socialLinks = createDomNode('div', ['social-links'], this.person) as HTMLDivElement;
    this.linkIcon = createDomNode('a', ['icon-link', 'in-link'], this.socialLinks, '', [{ href: `${linkLinkedin}` }]) as HTMLAnchorElement;
    this.linkIcon = createDomNode('a', ['icon-link', 'github-link-team'], this.socialLinks, '', [{ href: `${linkGithub}` }]) as HTMLAnchorElement;
  }
}
