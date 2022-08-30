import createDomNode from '../../../utils/createDomNode';

export default class TextBookChapter {
  private textBook;

  private textBookWrapper;

  private title;

  private containerTextBook;

  private sectionList;

  private sectionText;

  private chapter: HTMLAnchorElement | undefined;

  private iconStar: HTMLImageElement | undefined;

  private chapterText: HTMLParagraphElement | undefined;

  private textBookDescription;

  private iconInfo;

  private textBookDescriptionWrapper;

  private textBookDescriptionItem;

  private textBookAuth;

  constructor() {
    this.textBook = createDomNode('main', ['textbook'], document.body);
    this.textBookWrapper = createDomNode('div', ['wrapper', 'textbook-wrapper'], this.textBook);

    this.title = createDomNode('h1', ['title'], this.textBookWrapper, 'Выберите раздел учебника');

    this.containerTextBook = createDomNode('div', ['textbook__container'], this.textBookWrapper);

    this.sectionList = createDomNode('div', ['textbook__left-side'], this.containerTextBook);
    this.sectionText = createDomNode('div', ['textbook__right-side'], this.containerTextBook);

    for (let i = 1; i <= 7; i += 1) {
      if (i <= 6) {
        this.createSection(String(i));
      } else if (localStorage.getItem('id')) {
        this.createSection(String(i), true);
      }
    }

    if ((document.body.querySelector('.user-name') as HTMLElement).innerHTML) {
      this.createSection('7', true);
    }

    this.textBookDescription = createDomNode('div', ['textbook__description'], this.sectionText);
    this.iconInfo = createDomNode('img', ['icon-info'], this.textBookDescription, '', [{ src: '../../../assets/svg/icons/info-circle.svg' }, { alt: 'Info' }]);
    this.textBookDescriptionWrapper = createDomNode('div', ['textbook__description-wrapper'], this.textBookDescription);
    this.textBookDescriptionItem = createDomNode('p', ['textbook__description-item'], this.textBookDescriptionWrapper, 'Учебник содержит 3600 часто употребляемых английских слов');
    this.textBookDescriptionItem = createDomNode('p', ['textbook__description-item'], this.textBookDescriptionWrapper, 'Слова в коллекции отсортированы от более простых и известных к более сложным. Вся коллекция разбита на шесть разделов, в каждом разделе 30 страниц, на каждой странице 20 слов для изучения');
    this.textBookDescriptionItem = createDomNode('p', ['textbook__description-item'], this.textBookDescriptionWrapper, 'Выберите раздел и успехов в изучении!');

    this.textBookAuth = createDomNode('div', ['textbook__auth'], this.sectionText);

    this.textBookDescription = createDomNode('div', ['textbook__description'], this.textBookAuth);
    this.iconInfo = createDomNode('img', ['icon-info'], this.textBookDescription, '', [{ src: '../../../assets/svg/icons/star.svg' }, { alt: 'Star' }]);
    this.textBookDescriptionItem = createDomNode('p', ['textbook__description-item'], this.textBookDescription, 'Сложные слова можно отменить звёздочкой. Эти слова будут находиться в разделе Сложные');

    this.textBookDescription = createDomNode('div', ['textbook__description'], this.textBookAuth);
    this.iconInfo = createDomNode('img', ['icon-info'], this.textBookDescription, '', [{ src: '../../../assets/svg/icons/check-mark.svg' }, { alt: 'Сheck-mark' }]);
    this.textBookDescriptionItem = createDomNode('p', ['textbook__description-item'], this.textBookDescription, 'Изученные слова можно отметить причкой. Изученные разделы будут отмечены птичкой');

    this.textBookDescription = createDomNode('div', ['textbook__description'], this.textBookAuth);
    this.iconInfo = createDomNode('img', ['icon-info'], this.textBookDescription, '', [{ src: '../../../assets/svg/icons/info-circle-red.svg' }, { alt: 'Info' }]);
    this.textBookDescriptionItem = createDomNode('p', ['textbook__description-item', 'text-bold'], this.textBookDescription, 'Данная функция доступна только для авторизированных пользователей');
  }

  createSection(item: string, diffucult?: boolean) {
    this.chapter = createDomNode('a', ['chapter', `chapter-${item}`], this.sectionList, '', [{ href: `#/book/section-${item}` }]) as HTMLAnchorElement;

    if (diffucult) {
      this.iconStar = createDomNode('img', ['icon-star'], this.chapter, '', [{ src: '../../../assets/svg/icons/star-transp.svg' }]) as HTMLImageElement;
      this.chapterText = createDomNode('span', ['chapter-text'], this.chapter, 'Сложные слова') as HTMLParagraphElement;
    } else {
      this.chapterText = createDomNode('span', ['chapter-text'], this.chapter, `Раздел ${item}`) as HTMLParagraphElement;
    }
  }
}
