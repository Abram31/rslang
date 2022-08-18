import createDomNode from '../../../utils/createDomNode';
import './aboutTeam.scss';

export default class AboutTeam {
  private main;

  private teamWrapper;

  private title;

  private teamContainer;

  private teamItem: HTMLElement | undefined;

  private teamItemWrapper: HTMLElement | undefined;

  private image: HTMLElement | undefined;

  private role: HTMLElement | undefined;

  private firstLastName: HTMLElement | undefined;

  private action: HTMLElement | undefined;

  private line: HTMLElement | undefined;

  private btn: HTMLElement | undefined;

  private githubLink: HTMLElement | undefined;

  constructor() {
    this.main = createDomNode('main', ['main-team'], document.body);
    this.teamWrapper = createDomNode('div', ['wrapper', 'wrapper-team'], this.main);

    this.title = createDomNode('h1', ['title-team'], this.teamWrapper, 'О команде');

    this.teamContainer = createDomNode('div', ['team-container'], this.teamWrapper);
    this.createItemTeam('../../../assets/teamPhoto/1.jpg', 'Veronika', 'ФИО', 'Чем занимался?', 'https://github.com/Veronika2811');
    this.createItemTeam('../../../assets/teamPhoto/1.jpg', 'Artem', 'ФИО', 'Чем занимался?', 'https://github.com/abram31');
    this.createItemTeam('../../../assets/teamPhoto/1.jpg', 'Pasha', 'ФИО', 'Чем занимался?', 'https://github.com/paulonio');
  }

  createItemTeam(photo: string, photoAlt: string, name: string, didDo: string, linkGithub: string) {
    this.teamItem = createDomNode('div', ['team-item'], this.teamContainer);
    this.teamItemWrapper = createDomNode('div', ['team-item-wrapper'], this.teamItem);
    this.image = createDomNode('img', ['image'], this.teamItemWrapper, '', [{ src: `${photo}` }, { alt: `${photoAlt}` }]);
    this.role = createDomNode('p', ['role'], this.teamItemWrapper, 'Developer');
    this.firstLastName = createDomNode('p', ['name'], this.teamItemWrapper, `${name}`);
    this.action = createDomNode('p', ['action'], this.teamItemWrapper, `${didDo}`);
    this.line = createDomNode('hr', ['line'], this.teamItemWrapper);
    this.githubLink = createDomNode('a', ['github-link', 'github-link-team'], this.teamItemWrapper, '', [{ href: `${linkGithub}` }]);
    this.btn = createDomNode('button', ['btn'], this.githubLink, 'GitHub');
  }
}
