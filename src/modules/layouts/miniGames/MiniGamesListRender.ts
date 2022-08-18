import createDomNode from '../../../utils/createDomNode';
import './miniGames.scss';

export default class MiniGamesListRender {
  private games;

  private gamesWrapper;

  private title;

  private gamesList;

  private gamesItem: HTMLElement | undefined;

  private gameItemWrapper: HTMLElement | undefined;

  private image: HTMLElement | undefined;

  private nameOfGame: HTMLElement | undefined;

  private descriptionGame: HTMLElement | undefined;

  private line: HTMLElement | undefined;

  private btn: HTMLElement | undefined;

  constructor() {
    this.games = createDomNode('main', ['games'], document.body);
    this.gamesWrapper = createDomNode('div', ['wrapper', 'games-wrapper'], this.games);

    this.title = createDomNode('h1', ['title-center'], this.gamesWrapper, 'Мини-игры');

    this.gamesList = createDomNode('div', ['games-list'], this.gamesWrapper);
    this.createGame('../../../assets/svg/audio.svg', 'Audio', 'image-audio', 'Аудио', 'Тренировка Аудиовызов улучшает восприятие речи на слух.');
    this.createGame('../../../assets/svg/sprint.svg', 'Sprint', 'image-sprint', 'Спринт', 'Тренировка Спринт поможет тебе проверить знаешь ли ты правильный перевод. Игра длится 1 минуту или пока не закончаться слова.');
  }

  createGame(
    image: string,
    imageAlt: string,
    classImage: string,
    nameGame: string,
    description: string,
  ) {
    this.gamesItem = createDomNode('div', ['game-item'], this.gamesList);
    this.gameItemWrapper = createDomNode('div', ['game-item-wrapper'], this.gamesItem);
    this.image = createDomNode('img', [`${classImage}`], this.gameItemWrapper, '', [{ src: `${image}` }, { alt: `${imageAlt}` }]);
    this.nameOfGame = createDomNode('p', ['game-name'], this.gameItemWrapper, `${nameGame}`);
    this.descriptionGame = createDomNode('p', ['description-game'], this.gameItemWrapper, `${description}`);

    this.line = createDomNode('hr', ['line'], this.gameItemWrapper);

    this.btn = createDomNode('button', ['btn'], this.gameItemWrapper, 'Играть');
  }
}
