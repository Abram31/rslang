import createDomNode from '../../../utils/createDomNode';
import './textbookLevel.scss';

export default class TextBookLevel {
  private textBook;

  private textBookWrapper;

  private title;

  private containerTextBook;

  private sectionList;

  private sectionText;

  private levelItem: HTMLElement | undefined;

  private levelItemInput: HTMLElement | undefined;

  private levelItemLabel: HTMLElement | undefined;

  private levelItemText: HTMLElement | undefined;

  private containerTextBookDescription;

  private image;

  private textBookDescription;

  private text;

  private containerAuthUserDescription;

  private sectionItem;

  constructor() {
    this.textBook = createDomNode('main', ['text-book'], document.body);
    this.textBookWrapper = createDomNode('div', ['wrapper', 'text-book-wrapper'], this.textBook);

    this.title = createDomNode('h1', ['title-center'], this.textBookWrapper, 'Выберите раздел');

    this.containerTextBook = createDomNode('div', ['container-text-book'], this.textBookWrapper);

    this.sectionList = createDomNode('div', ['left-side-text-book'], this.containerTextBook);
    this.createSection('1');
    this.createSection('2');
    this.createSection('3');
    this.createSection('4');
    this.createSection('5');
    this.createSection('6');

    if ((document.body.querySelector('.user-name') as HTMLElement).innerHTML) {
      this.createSection('7', true);
    }

    this.sectionText = createDomNode('div', ['right-side-text-book'], this.containerTextBook);

    this.containerTextBookDescription = createDomNode('div', ['container-text-book-description'], this.sectionText);
    this.image = createDomNode('img', ['icons-info'], this.containerTextBookDescription, '', [{ src: '../../../assets/svg/info-circle.svg' }, { alt: 'Circle-info' }]);
    this.textBookDescription = createDomNode('div', ['text-book-description'], this.containerTextBookDescription);
    this.text = createDomNode('p', ['text'], this.textBookDescription, 'Учебник содержит 3600 часто употребляемых английских слов');
    this.text = createDomNode('p', ['text'], this.textBookDescription, 'Слова в коллекции отсортированы от более простых и известных к более сложным. Вся коллекция разбита на шесть разделов, в каждом разделе 30 страниц, на каждой странице 20 слов для изучения');
    this.text = createDomNode('p', ['text'], this.textBookDescription, 'Выберите раздел и успехов в изучении!');

    this.containerAuthUserDescription = createDomNode('div', ['container-auth-user-description'], this.sectionText);

    this.sectionItem = createDomNode('div', ['container-item'], this.containerAuthUserDescription);
    this.image = createDomNode('img', ['icons-info'], this.sectionItem, '', [{ src: '../../../assets/svg/star.svg' }, { alt: 'Star' }]);
    this.text = createDomNode('p', ['text'], this.sectionItem, 'Сложные слова можно отменить звёздочкой. Эти слова будут находиться в разделе Сложные');

    this.sectionItem = createDomNode('div', ['container-item'], this.containerAuthUserDescription);
    this.image = createDomNode('img', ['icons-info'], this.sectionItem, '', [{ src: '../../../assets/svg/check-mark.svg' }, { alt: 'Сheck-mark' }]);
    this.text = createDomNode('p', ['text'], this.sectionItem, 'Изученные слова можно отметить причкой. Изученные разделы будут отмечены птичкой');

    this.sectionItem = createDomNode('div', ['container-item'], this.containerAuthUserDescription);
    this.image = createDomNode('img', ['icons-info'], this.sectionItem, '', [{ src: '../../../assets/svg/info-circle-red.svg' }, { alt: 'Info-circle' }]);
    this.text = createDomNode('p', ['text', 'text-bold'], this.sectionItem, 'Данная функция доступна только для авторизированных пользователей');
  }

  createSection(item: string, diffucult?: boolean) {
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
    if (diffucult) {
      this.levelItemText = createDomNode('span', ['level-item-text'], this.levelItemLabel, 'Сложные слова');
    } else {
      this.levelItemText = createDomNode('span', ['level-item-text'], this.levelItemLabel, `Раздел ${item}`);
    }
  }
}
