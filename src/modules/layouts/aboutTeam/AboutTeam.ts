import createDomNode from '../../../utils/createDomNode';
import './aboutTeam.scss';

export default class AboutTeam {
  private mainTeam;

  private teamWrapper;

  private title;

  private teamItems;

  private teamItem: HTMLDivElement | undefined;

  private photo: HTMLImageElement | undefined;

  private teamItemWrapper: HTMLDivElement | undefined;

  private nameItem: HTMLParagraphElement | undefined;

  private actionDescription: HTMLParagraphElement | undefined;

  private socialLinks: HTMLDivElement | undefined;

  private linkIcon: HTMLAnchorElement | undefined;

  constructor() {
    this.mainTeam = createDomNode('main', ['team'], document.body);
    this.teamWrapper = createDomNode('div', ['wrapper', 'team-wrapper'], this.mainTeam);

    this.title = createDomNode('h1', ['title'], this.teamWrapper, 'О команде');

    this.teamItems = createDomNode('div', ['team__items'], this.teamWrapper);

    this.createItemTeam('../../../assets/teamPhoto/1.jpg', 'Veronika', 'ФИО', 'Чем занимался?', 'https://github.com/Veronika2811', 'https://www.linkedin.com/in/veranika-smiayun-9a2297235/', '#');
    this.createItemTeam('../../../assets/teamPhoto/1.jpg', 'Artem', 'ФИО', 'Чем занимался?', 'https://github.com/abram31', '#', '#');
    this.createItemTeam('../../../assets/teamPhoto/1.jpg', 'Pasha', 'ФИО', 'Чем занимался?', 'https://github.com/paulonio', '#', '#');
  }

  createItemTeam(
    photo: string,
    photoAlt: string,
    name: string,
    didDo: string,
    linkGithub: string,
    linkLinkedin: string,
    linkTelegram: string,
  ) {
    this.teamItem = createDomNode('div', ['team-item'], this.teamItems) as HTMLDivElement;
    this.photo = createDomNode('img', ['photo'], this.teamItem, '', [{ src: `${photo}` }, { alt: `${photoAlt}` }]) as HTMLImageElement;

    this.teamItemWrapper = createDomNode('div', ['team-item-wrapper'], this.teamItem) as HTMLDivElement;

    this.nameItem = createDomNode('p', ['name-item'], this.teamItemWrapper, `${name}`) as HTMLParagraphElement;

    this.actionDescription = createDomNode('p', ['action-description'], this.teamItemWrapper, `${didDo}`) as HTMLParagraphElement;

    this.socialLinks = createDomNode('div', ['social-links'], this.teamItemWrapper) as HTMLDivElement;
    this.linkIcon = createDomNode('a', ['icon-link', 'in-link'], this.socialLinks, '', [{ href: `${linkGithub}` }]) as HTMLAnchorElement;
    this.linkIcon = createDomNode('a', ['icon-link', 'github-link-team'], this.socialLinks, '', [{ href: `${linkLinkedin}` }]) as HTMLAnchorElement;
    this.linkIcon = createDomNode('a', ['icon-link', 'telegram-link'], this.socialLinks, '', [{ href: `${linkTelegram}` }]) as HTMLAnchorElement;
  }
}
