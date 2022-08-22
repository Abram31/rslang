import createDomNode from '../../utils/createDomNode';
import AboutTeam from '../layouts/aboutTeam/AboutTeam';
import FooterRender from '../layouts/footer/FooterRender';
import HeaderRender from '../layouts/header/HeaderRender';
import LevelGame from '../layouts/levelGame/LevelGame';
import MainPageRender from '../layouts/mainPage/MainPageRender';
import MiniGamesListRender from '../layouts/miniGames/MiniGamesListRender';
import TextBookChapter from '../layouts/textBookChapter/TextBookChapter';
import TextBookPage from '../layouts/textBookPage/textBookPage';
import VideoRender from '../layouts/video/VideoRender';

const generateRouter = () => {
  const routes: { [key: string]: string | (() => void) } = {};
  const templates: { [key: string]: (() => void) } = {};

  const route = (path: string, template: string | (() => void)) => {
    if (typeof template === 'function') {
      routes[path] = template;
    }
    if (typeof template === 'string') {
      routes[path] = templates[template];
    }
    return routes[path];
  };

  const template = (name: string, templateFunction: (() => void)) => {
    templates[name] = templateFunction;
    return templates[name];
  };

  template('home', () => {
    document.body.innerHTML = '';
    new HeaderRender();
    new MainPageRender();
    new FooterRender();
  });

  template('book', () => {
    document.body.innerHTML = '';
    new HeaderRender();
    new TextBookChapter();
    new FooterRender();
  });

  template('games', () => {
    document.body.innerHTML = '';
    new HeaderRender();
    new MiniGamesListRender();
    new FooterRender();
  });

  template('stats', () => {
    document.body.innerHTML = '';
    new HeaderRender();
    createDomNode('h1', ['title'], document.body, 'В разработке');
    new FooterRender();
  });

  template('video', () => {
    document.body.innerHTML = '';
    new HeaderRender();
    new VideoRender();
    new FooterRender();
  });

  template('about', () => {
    document.body.innerHTML = '';
    new HeaderRender();
    new AboutTeam();
    new FooterRender();
  });

  template('selection-page', () => {
    document.body.innerHTML = '';
    new HeaderRender();
    new TextBookPage();
    new FooterRender();
  });

  template('game', () => {
    document.body.innerHTML = '';
    new HeaderRender();
    new LevelGame();
    new FooterRender();
  });

  template('game-level', () => {
    document.body.innerHTML = '';
    new HeaderRender();
    createDomNode('h1', ['title'], document.body, 'В разработке');
  });

  template('page-book', () => {
    document.body.innerHTML = '';
    new HeaderRender();
    createDomNode('h1', ['title'], document.body, 'В разработке');
    new FooterRender();
  });

  route('/', 'home');
  route('/book', 'book');
  route('/games', 'games');
  route('/stats', 'stats');
  route('/about', 'about');
  route('/video', 'video');

  for (let i = 0; i < 7; i += 1) {
    route(`/book/section-${i}`, 'selection-page');
  }

  route('/games/audio', 'game');
  route('/games/sprint', 'game');

  for (let i = 0; i < 6; i += 1) {
    route(`/games/audio/${i}`, 'game-level');
  }

  for (let i = 0; i < 6; i += 1) {
    route(`/games/sprint/${i}`, 'game-level');
  }

  for (let i = 0; i < 7; i += 1) {
    for (let j = 0; j < 30; j += 1) {
      route(`/book/section-${i}/${j}`, 'page-book');
    }
  }

  const resolveRoute = (routeStr: string) => {
    try {
      return routes[routeStr];
    } catch (e) {
      throw new Error(`Route ${routeStr} not found`);
    }
  };

  const router = () => {
    const url = window.location.hash.slice(1) || '/';
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const route = resolveRoute(url);

    if (typeof route === 'function') {
      route();
    }
  };

  window.addEventListener('load', router);
  window.addEventListener('hashchange', router);
};

export default generateRouter;
