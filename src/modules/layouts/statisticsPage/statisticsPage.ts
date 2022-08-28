import './statisticsPage.scss';
import createDomNode from '../../../utils/createDomNode';

export default class StatisticsPageRender {
  private statisctics;

  private statiscticsWrapper;

  private title;

  private btnGroup;

  private btnWords;

  private btnAudio;

  private btnSprint;

  private btnStatic;

  private staticItem: HTMLElement | undefined;

  private contentStatic: HTMLElement | undefined;

  private newWords: HTMLElement | undefined;

  private learnedWord: HTMLElement | undefined;

  private circle: HTMLElement | undefined;

  private percent: HTMLElement | undefined;

  private percentSign: HTMLElement | undefined;

  constructor() {
    this.statisctics = createDomNode('main', ['statisctics'], document.body);
    this.statiscticsWrapper = createDomNode('div', ['wrapper', 'statisctics-wrapper'], this.statisctics);

    this.title = createDomNode('h1', ['title'], this.statiscticsWrapper, 'Статистика');

    this.btnGroup = createDomNode('div', ['btn-group'], this.statiscticsWrapper);

    this.btnWords = createDomNode('button', ['btn-static', 'btn__active'], this.btnGroup, 'По словам');
    this.btnWords.addEventListener('click', () => this.statisc('Изученные слова за день: '));

    this.btnAudio = createDomNode('button', ['btn-static'], this.btnGroup, 'Aудиовызов');
    this.btnAudio.addEventListener('click', () => this.statisc('Самая длинная серия правильных ответов: '));

    this.btnSprint = createDomNode('button', ['btn-static'], this.btnGroup, 'Спринт');
    this.btnSprint.addEventListener('click', () => this.statisc('Самая длинная серия правильных ответов: '));

    this.btnStatic = createDomNode('button', ['btn-static'], this.btnGroup, 'Общая статистика');
    this.btnStatic.addEventListener('click', () => this.staticsAll());

    [this.btnWords, this.btnAudio, this.btnSprint, this.btnStatic].forEach((el) => {
      el.addEventListener('click', () => this.toogleBtn(el));
    });
  }

  toogleBtn(element: HTMLElement) {
    [this.btnWords, this.btnAudio, this.btnSprint, this.btnStatic].forEach((el) => {
      el.classList.remove('btn__active');
    });
    element.classList.add('btn__active');
  }

  statisc(item: string) {
    this.contentStatic?.remove();
    this.contentStatic = createDomNode('div', ['content-static'], this.statiscticsWrapper);
    this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, 'Новые слова за день: ');
    this.newWords = createDomNode('span', ['static__new-word'], this.staticItem, '1');

    this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, `${item}`);
    this.learnedWord = createDomNode('span', ['static__learned-word'], this.staticItem, '1');

    this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, 'Правильные ответы за день:');

    this.circle = createDomNode('div', ['circle'], this.contentStatic);
    this.percent = createDomNode('p', ['percent'], this.circle, '0');
    this.percentSign = createDomNode('span', ['percent-sign'], this.percent, '%');
  }

  staticsAll() {
    this.contentStatic?.remove();
  }
}
