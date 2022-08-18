import createDomNode from '../../../utils/createDomNode';
import './footer.scss';

export default class FooterRender {
  private footer;

  private footerWrapper;

  private rscontainer;

  private year;

  private githubWrapper;

  private githubItem;

  private githubImage;

  private githubLink;

  private rsImage;

  constructor() {
    this.footer = createDomNode('footer', ['footer'], document.body);
    this.footerWrapper = createDomNode('div', ['wrapper', 'footer-wrapper'], this.footer);

    this.rscontainer = createDomNode('div', ['rs-container'], this.footerWrapper);

    this.year = createDomNode('p', ['year'], this.rscontainer, '2022');
    this.rsImage = createDomNode('a', ['rs-image'], this.rscontainer, '', [{ href: 'https://rs.school/js/' }]);

    this.githubWrapper = createDomNode('div', ['github-wrapper'], this.footerWrapper);

    this.githubItem = createDomNode('a', ['github-item'], this.githubWrapper, '', [{ href: 'https://github.com/Veronika2811' }]);
    this.githubImage = createDomNode('img', ['github-image'], this.githubItem, '', [{ src: '../../../assets/svg/Github.svg' }, { alt: 'GitHub' }]);
    this.githubLink = createDomNode('span', ['github-link'], this.githubItem, 'veronika2811');

    this.githubItem = createDomNode('a', ['github-item'], this.githubWrapper, '', [{ href: 'https://github.com/abram31' }]);
    this.githubImage = createDomNode('img', ['github-image'], this.githubItem, '', [{ src: '../../../assets/svg/Github.svg' }, { alt: 'GitHub' }]);
    this.githubLink = createDomNode('span', ['github-link'], this.githubItem, 'abram31');

    this.githubItem = createDomNode('a', ['github-item'], this.githubWrapper, '', [{ href: 'https://github.com/paulonio' }]);
    this.githubImage = createDomNode('img', ['github-image'], this.githubItem, '', [{ src: '../../../assets/svg/Github.svg' }, { alt: 'GitHub' }]);
    this.githubLink = createDomNode('span', ['github-link'], this.githubItem, 'paulonio');
  }
}
