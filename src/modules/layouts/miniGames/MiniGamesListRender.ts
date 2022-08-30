import './miniGames.scss';
import createDomNode from '../../../utils/createDomNode';

export default class MiniGamesListRender {
  private games;

  private gamesWrapper;

  private title;

  private game;

  private gameImage;

  private gameText;

  private descriptionGame;

  private btn;

  constructor(container: HTMLElement) {
    this.games = createDomNode('main', ['games'], container);
    this.gamesWrapper = createDomNode('div', ['wrapper', 'games-wrapper'], this.games);

    this.title = createDomNode('h1', ['title'], this.gamesWrapper, 'Мини-игры');

    this.game = createDomNode('div', ['game'], this.gamesWrapper);
    this.gameImage = createDomNode('img', ['game__image'], this.game, '', [{ src: '../../../assets/svg/sprint-game-image.svg' }, { alt: 'Sprint' }]);
    this.gameText = createDomNode('div', ['game__text'], this.game);
    this.title = createDomNode('p', ['title'], this.gameText, 'Спринт');
    this.descriptionGame = createDomNode('p', ['game__description'], this.gameText, 'Тренировка Спринт поможет вам проверить знаете ли вы правильный перевод. Игра длится 1 минуту или пока не закончаться слова');

    this.btn = createDomNode('button', ['btn', 'btn_transparent'], this.gameText, 'Играть');
    this.btn.addEventListener('click', () => {
      window.location.href = '#/games/sprint';
    });

    this.game = createDomNode('div', ['game'], this.gamesWrapper);
    this.gameText = createDomNode('div', ['game__text'], this.game);
    this.title = createDomNode('p', ['title'], this.gameText, 'Аудиовызов');
    this.descriptionGame = createDomNode('p', ['game__description'], this.gameText, 'Тренировка Аудиовызов улучшает восприятие речи на слух.');

    this.btn = createDomNode('button', ['btn', 'btn_transparent'], this.gameText, 'Играть');
    this.btn.addEventListener('click', () => {
      window.location.href = '#/games/audio';
    });

    this.gameImage = createDomNode('img', ['game__image'], this.game, '', [{ src: '../../../assets/svg/audio-game-image.svg' }, { alt: 'Audio' }]);
  }
}
