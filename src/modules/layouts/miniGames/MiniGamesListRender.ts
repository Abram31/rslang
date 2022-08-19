import createDomNode from '../../../utils/createDomNode';
import './miniGames.scss';

export default class MiniGamesListRender {
  private games;

  private gamesWrapper;

  private title;

  private gamesItem;

  private gameImage;

  private gameText;

  private nameOfGame;

  private descriptionGame;

  private btn;

  constructor() {
    this.games = createDomNode('main', ['games'], document.body);
    this.gamesWrapper = createDomNode('div', ['games-wrapper'], this.games);

    this.title = createDomNode('h1', ['title-center'], this.gamesWrapper, 'Мини-игры');

    this.gamesItem = createDomNode('div', ['games-item'], this.gamesWrapper);

    this.gameImage = createDomNode('img', ['game-image'], this.gamesItem, '', [{ src: '../../../assets/svg/sprint-game.svg' }, { alt: 'Sprint' }]);
    this.gameText = createDomNode('div', ['game-text'], this.gamesItem);
    this.nameOfGame = createDomNode('p', ['game-name'], this.gameText, 'Спринт');
    this.descriptionGame = createDomNode('p', ['description-game'], this.gameText, 'Тренировка Спринт поможет вам проверить знаете ли вы правильный перевод. Игра длится 1 минуту или пока не закончаться слова');

    this.btn = createDomNode('button', ['btn-transparent'], this.gameText, 'Играть');

    this.gamesItem = createDomNode('div', ['games-item'], this.gamesWrapper);

    this.gameText = createDomNode('div', ['game-text'], this.gamesItem);
    this.nameOfGame = createDomNode('p', ['game-name'], this.gameText, 'Аудиовызов');
    this.descriptionGame = createDomNode('p', ['description-game'], this.gameText, 'Тренировка Аудиовызов улучшает восприятие речи на слух.');

    this.btn = createDomNode('button', ['btn-transparent'], this.gameText, 'Играть');

    this.gameImage = createDomNode('img', ['game-image'], this.gamesItem, '', [{ src: '../../../assets/svg/Audio1.svg' }, { alt: 'Audio' }]);
  }
}
