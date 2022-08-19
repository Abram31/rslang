import createDomNode from '../../../utils/createDomNode';
import './levelGame.scss';

export default class LevelGame {
  private textBook;

  private textBookWrapper;

  private title;

  private containerTextBook;

  private sectionList;

  private levelItem: HTMLElement | undefined;

  private levelItemInput: HTMLElement | undefined;

  private levelItemLabel: HTMLElement | undefined;

  private levelItemText: HTMLElement | undefined;

  private sectionText;

  private containerTextBookDescription;

  private image;

  private textBookDescription;

  private text;

  constructor() {
    this.textBook = createDomNode('main', ['text-book'], document.body);
    this.textBookWrapper = createDomNode('div', ['wrapper', 'text-book-wrapper'], this.textBook);

    this.title = createDomNode('h1', ['title-center'], this.textBookWrapper, 'Выберите уровень сложности мини-игры');

    this.containerTextBook = createDomNode('div', ['container-text-book'], this.textBookWrapper);

    this.sectionList = createDomNode('div', ['left-side-text-book'], this.containerTextBook);

    this.createSection('1', 'A1    Elementary');
    this.createSection('2', 'A2    Pre-Intermediate');
    this.createSection('3', 'B1    Intermediate');
    this.createSection('4', 'B2    Upper-Intermediate');
    this.createSection('5', 'C1    Advanced');
    this.createSection('6', 'C2    Proficiency');

    this.sectionText = createDomNode('div', ['right-side-text-book'], this.containerTextBook);

    this.containerTextBookDescription = createDomNode('div', ['container-text-book-description'], this.sectionText);
    this.image = createDomNode('img', ['icons-info'], this.containerTextBookDescription, '', [{ src: '../../../assets/svg/A.svg' }, { alt: 'A' }]);
    this.textBookDescription = createDomNode('div', ['text-book-description'], this.containerTextBookDescription);
    this.text = createDomNode('p', ['text'], this.textBookDescription, 'Элементарное владение');

    this.containerTextBookDescription = createDomNode('div', ['container-text-book-description'], this.sectionText);
    this.image = createDomNode('img', ['icons-info'], this.containerTextBookDescription, '', [{ src: '../../../assets/svg/B.svg' }, { alt: 'B' }]);
    this.textBookDescription = createDomNode('div', ['text-book-description'], this.containerTextBookDescription);
    this.text = createDomNode('p', ['text'], this.textBookDescription, 'Самостоятельное владение');

    this.containerTextBookDescription = createDomNode('div', ['container-text-book-description'], this.sectionText);
    this.image = createDomNode('img', ['icons-info'], this.containerTextBookDescription, '', [{ src: '../../../assets/svg/C.svg' }, { alt: 'C' }]);
    this.textBookDescription = createDomNode('div', ['text-book-description'], this.containerTextBookDescription);
    this.text = createDomNode('p', ['text'], this.textBookDescription, 'Свободное владение');
  }

  createSection(item: string, level: string) {
    this.levelItem = createDomNode('div', ['level-item', `level-item-${item}`], this.sectionList);
    this.levelItemInput = createDomNode(
      'input',
      ['level-item-input'],
      this.levelItem,
      '',
      [{ type: 'radio' }, { id: `${item}` }, { name: 'game' }, { value: '0' }],
    );

    if (item === '1') {
      this.levelItemInput.setAttribute('checked', '');
    }

    this.levelItemLabel = createDomNode('label', ['level-item-label'], this.levelItem, '', [{ for: `${item}` }]);
    this.levelItemText = createDomNode('span', ['level-item-text'], this.levelItemLabel, `${level}`);
  }
}
