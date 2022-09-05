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

    this.game = createDomNode('div', ['game', 'game-sprint'], this.gamesWrapper);
    this.gameImage = createDomNode('img', ['game__image'], this.game, '', [{ src: './assets/png/image-sprint-game.png' }, { alt: 'Sprint' }]);
    this.gameText = createDomNode('div', ['game__text'], this.game);
    this.title = createDomNode('p', ['title'], this.gameText, 'Спринт');
    this.descriptionGame = createDomNode('p', ['game__description'], this.gameText, 'Тренировка Спринт поможет вам проверить знаете ли вы правильный перевод. Игра длится 1 минуту или пока не закончатся слова.');
    this.descriptionGame = createDomNode('p', ['game__description'], this.gameText, 'Управление клавишами: ←, → выбор варианта.');

    this.btn = createDomNode('button', ['btn', 'btn_transparent'], this.gameText, 'Играть');
    this.btn.addEventListener('click', () => {
      window.location.href = '#/games/sprint';
    });

    this.game = createDomNode('div', ['game', 'game-audio'], this.gamesWrapper);
    this.gameText = createDomNode('div', ['game__text'], this.game);
    this.title = createDomNode('p', ['title'], this.gameText, 'Аудиовызов');
    this.descriptionGame = createDomNode('p', ['game__description'], this.gameText, 'Тренировка Аудиовызов улучшает восприятие речи на слух.');
    this.descriptionGame = createDomNode('p', ['game__description'], this.gameText, 'Управление клавишами: "Enter" - следующий вопрос, "1...5" - выбор варианта');

    this.btn = createDomNode('button', ['btn', 'btn_transparent'], this.gameText, 'Играть');
    this.btn.addEventListener('click', () => {
      window.location.href = '#/games/audio';
    });

    this.gameImage = createDomNode('img', ['game__image'], this.game, '', [{ src: './assets/png/image-audio-game.png' }, { alt: 'Audio' }]);
  }
}
