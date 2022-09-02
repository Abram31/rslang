import './levelGame.scss';
import createDomNode from '../../../utils/createDomNode';
import { ARRAY_LEVEL } from '../../../utils/constants';

export default class LevelGame {
  private textBook;

  private textBookWrapper;

  private title;

  private containerTextBook;

  private sectionList;

  private sectionText;

  private textBookDescription;

  private iconInfo;

  private textBookDescriptionItem;

  private chapter: HTMLAnchorElement | undefined;

  private chapterText: HTMLParagraphElement | undefined;

  constructor(container: HTMLElement) {
    this.textBook = createDomNode('main', ['textbook'], container);
    this.textBookWrapper = createDomNode('div', ['wrapper', 'textbook-wrapper'], this.textBook);

    this.title = createDomNode('h1', ['title'], this.textBookWrapper, 'Выберите уровень сложности мини-игры');

    this.containerTextBook = createDomNode('div', ['textbook__container'], this.textBookWrapper);

    this.sectionList = createDomNode('div', ['textbook__left-side'], this.containerTextBook);
    this.sectionText = createDomNode('div', ['level__right-side'], this.containerTextBook);

    for (let i = 1; i <= 6; i += 1) {
      this.createSection(String(i), ARRAY_LEVEL[i - 1]);
    }

    this.textBookDescription = createDomNode('div', ['level__description'], this.sectionText);
    this.iconInfo = createDomNode('img', ['icon-info'], this.textBookDescription, '', [{ src: './assets/svg/icons/A.svg' }, { alt: 'A' }]);
    this.textBookDescriptionItem = createDomNode('p', ['textbook__description-item'], this.textBookDescription, 'Элементарное владение');

    this.textBookDescription = createDomNode('div', ['level__description'], this.sectionText);
    this.iconInfo = createDomNode('img', ['icon-info'], this.textBookDescription, '', [{ src: './assets/svg/icons/B.svg' }, { alt: 'B' }]);
    this.textBookDescriptionItem = createDomNode('p', ['textbook__description-item'], this.textBookDescription, 'Самостоятельное владение');

    this.textBookDescription = createDomNode('div', ['level__description'], this.sectionText);
    this.iconInfo = createDomNode('img', ['icon-info'], this.textBookDescription, '', [{ src: './assets/svg/icons/C.svg' }, { alt: 'C' }]);
    this.textBookDescriptionItem = createDomNode('p', ['textbook__description-item'], this.textBookDescription, 'Свободное владение');
  }

  createSection(item: string, level: string) {
    const currentGame = window.location.href.split('/').pop();
    this.chapter = createDomNode('a', ['chapter', `chapter-${item}`], this.sectionList, '', [{ href: `#/games/${currentGame}/${item}` }]) as HTMLAnchorElement;

    this.chapterText = createDomNode('span', ['chapter-text'], this.chapter, `${level}`) as HTMLParagraphElement;
  }
}
