import './footer.scss';
import createDomNode from '../../../utils/createDomNode';

export default class FooterRender {
  private footer;

  private footerWrapper;

  private rscontainer;

  protected year;

  protected rsIcon;

  private githubWrapper;

  protected githubSpan: HTMLSpanElement | undefined;

  protected githubIcon: HTMLImageElement | undefined;

  protected githubLink: HTMLAnchorElement | undefined;

  constructor() {
    this.footer = createDomNode('footer', ['footer'], document.body);
    this.footerWrapper = createDomNode('div', ['footer-wrapper'], this.footer);

    this.rscontainer = createDomNode('div', ['rs-container'], this.footerWrapper);

    this.year = createDomNode('p', ['year'], this.rscontainer, '2022');
    this.rsIcon = createDomNode('a', ['rs-icon'], this.rscontainer, '', [{ href: 'https://rs.school/js/' }]);

    this.githubWrapper = createDomNode('div', ['github', 'github-wrapper'], this.footerWrapper);

    this.createItemsGithub('https://github.com/Veronika2811', 'veronika2811');
    this.createItemsGithub('https://github.com/abram31', 'abram31');
    this.createItemsGithub('https://github.com/paulonio', 'paulonio');
  }

  createItemsGithub(linkGithub: string, nameGithub: string) {
    this.githubLink = createDomNode('a', ['github__link'], this.githubWrapper, '', [{ href: `${linkGithub}` }]) as HTMLAnchorElement;
    this.githubIcon = createDomNode('img', [], this.githubLink, '', [{ src: './assets/svg/Github.svg' }, { alt: 'GitHub' }]) as HTMLImageElement;
    this.githubSpan = createDomNode('span', ['github__name'], this.githubLink, `${nameGithub}`);
  }
}
