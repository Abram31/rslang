import './statisticsPage.scss';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
import createDomNode from '../../../utils/createDomNode';
import {
  numberNewWordsEachDay, numbersLearnedWordsEveryDay, statisticByWords, statisticsGame,
} from '../../statistics/addStatisticToPage';

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

  private statisticsByWords: { newWordsDay: string;
    newLearnedWordsDay: string; percentAnswers: string; };

  private statisticsAudioCallGame: {
    newWordsGameDay: string;
    longestSeriesAnswers: string; percentAnswers: string;
  };

  chartNewWOrdsOfEveryDay: HTMLElement | undefined;

  chartIncreaseTotalNumber: HTMLElement | undefined;

  constructor(container: HTMLElement) {
    this.statisctics = createDomNode('main', ['statisctics'], container);
    this.statiscticsWrapper = createDomNode('div', ['wrapper', 'statisctics-wrapper'], this.statisctics);

    this.title = createDomNode('h1', ['title'], this.statiscticsWrapper, 'Статистика');

    this.btnGroup = createDomNode('div', ['btn-group'], this.statiscticsWrapper);

    this.btnWords = createDomNode('button', ['btn-static', 'btn__active'], this.btnGroup, 'По словам');
    this.btnWords.addEventListener('click', () => {
      this.statisc(
        this.statisticsByWords.newWordsDay,
        ['Изученные слова за день: ', this.statisticsByWords.newLearnedWordsDay],
        this.statisticsByWords.percentAnswers,
      );
    });

    this.btnAudio = createDomNode('button', ['btn-static'], this.btnGroup, 'Aудиовызов');
    this.btnAudio.addEventListener('click', () => {
      this.statisc(
        this.statisticsAudioCallGame.newWordsGameDay,
        ['Самая длинная серия правильных ответов: ', this.statisticsAudioCallGame.longestSeriesAnswers],
        this.statisticsAudioCallGame.percentAnswers,
      );
    });

    this.btnSprint = createDomNode('button', ['btn-static'], this.btnGroup, 'Спринт');
    this.btnSprint.addEventListener('click', () => {
      this.contentStatic?.remove();
      this.contentStatic = createDomNode('div', ['content-static'], this.statiscticsWrapper);
      this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, 'В РАЗРАБОТКЕ');
    });

    this.btnStatic = createDomNode('button', ['btn-static'], this.btnGroup, 'Общая статистика');
    this.btnStatic.addEventListener('click', () => {
      this.statisticsChart();
    });

    [this.btnWords, this.btnAudio, this.btnSprint, this.btnStatic].forEach((el) => {
      el.addEventListener('click', () => this.toogleBtn(el));
    });

    this.statisticsByWords = statisticByWords();

    this.statisticsAudioCallGame = statisticsGame('audio-call');
  }

  toogleBtn(element: HTMLElement) {
    [this.btnWords, this.btnAudio, this.btnSprint, this.btnStatic].forEach((el) => {
      el.classList.remove('btn__active');
    });
    element.classList.add('btn__active');
  }

  statisc(firstRow: string, secondRow: Array<string>, percents:string) {
    this.contentStatic?.remove();
    if (localStorage.getItem('id')) {
      this.contentStatic = createDomNode('div', ['content-static'], this.statiscticsWrapper);
      this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, 'Новые слова за день: ');
      this.newWords = createDomNode('span', ['static__new-word'], this.staticItem, firstRow);

      this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, secondRow[0]);
      this.learnedWord = createDomNode('span', ['static__learned-word'], this.staticItem, secondRow[1]);

      this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, 'Правильные ответы за день: ');

      this.circle = createDomNode('div', ['circle'], this.contentStatic);
      this.percent = createDomNode('p', ['percent'], this.circle, percents);
      this.percentSign = createDomNode('span', ['percent-sign'], this.percent, '%');
    } else {
      this.contentStatic = createDomNode('div', ['content-static'], this.statiscticsWrapper);
      this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, 'Для отображения статистики вам необходимо авторизироваться');
    }
  }

  statisticsChart() {
    this.contentStatic?.remove();
    if (localStorage.getItem('id')) {
      this.contentStatic = createDomNode('div', ['content-static'], this.statiscticsWrapper);
      this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, 'График, отображающий количество новых слов за каждый день изучения');

      this.chartNewWOrdsOfEveryDay = createDomNode('canvas', ['chart-every-day-learning'], this.contentStatic);
      this.chartNewWOrdsOfEveryDay.id = 'chartEveryDayLearning';

      const amountWordsOfDays = numberNewWordsEachDay();

      const labels = Object.keys(amountWordsOfDays);

      const data1 = {
        labels,
        datasets: [{
          label: '',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: Object.values(amountWordsOfDays),

        }],
      };

      const config: ChartConfiguration = {
        type: 'bar',
        data: data1,
        options: {},

      };

      new Chart(
        document.getElementById('chartEveryDayLearning') as HTMLCanvasElement,
        config,
      );

      this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, 'График, отображающий увеличение общего количества изученных слов за весь период обучения по дням');

      this.chartIncreaseTotalNumber = createDomNode('canvas', ['chart-increase-total-number'], this.contentStatic);
      this.chartIncreaseTotalNumber.id = 'chartIncreaseTotalNumber';

      const amountLearnedEveryDayWords = numbersLearnedWordsEveryDay();

      const label = ['', ...Object.keys(amountLearnedEveryDayWords)];

      const data2 = {
        labels: label,
        datasets: [{
          label: '',
          backgroundColor: '#f57600',
          borderColor: '#f57600',
          data: [0, ...Object.values(amountLearnedEveryDayWords)],
        }],
      };
      const config2: ChartConfiguration = {
        type: 'line',
        data: data2,
        options: {},
      };

      new Chart(
        document.getElementById('chartIncreaseTotalNumber') as HTMLCanvasElement,
        config2,
      );
    } else {
      this.contentStatic = createDomNode('div', ['content-static'], this.statiscticsWrapper);
      this.staticItem = createDomNode('p', ['static__item'], this.contentStatic, 'Для отображения графиков вам необходимо авторизироваться');
    }
  }
}
