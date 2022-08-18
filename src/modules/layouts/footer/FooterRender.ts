import createDomNode from '../../../utils/createDomNode';
import './footer.scss';

export default class FooterRender {
  private footer;

  private footerWrapper;

  private year;

  private githubWrapper;

  private githubImage;

  private githubLink;

  private rsImage;

  constructor() {
    this.footer = createDomNode('footer', ['footer'], document.body);
    this.footerWrapper = createDomNode('div', ['wrapper', 'footer-wrapper'], this.footer);

    this.year = createDomNode('p', ['year'], this.footerWrapper, '2022');

    this.githubWrapper = createDomNode('div', ['github-wrapper'], this.footerWrapper);
    this.githubImage = createDomNode('img', ['github-image'], this.githubWrapper, '', [{ src: '../../../assets/svg/Github.svg' }, { alt: 'GitHub' }]);

    this.githubLink = createDomNode('a', ['github-link'], this.githubWrapper, 'veronika2811', [{ href: 'https://github.com/Veronika2811' }]);
    this.githubLink = createDomNode('a', ['github-link'], this.githubWrapper, 'abram31', [{ href: 'https://github.com/abram31' }]);
    this.githubLink = createDomNode('a', ['github-link'], this.githubWrapper, 'paulonio', [{ href: 'https://github.com/paulonio' }]);

    this.rsImage = createDomNode('a', ['rs-image'], this.footerWrapper, '', [{ href: 'https://rs.school/js/' }]);
  }
}
