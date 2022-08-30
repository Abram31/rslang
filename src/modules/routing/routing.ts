import createDomNode from '../../utils/createDomNode';
import AboutTeam from '../layouts/aboutTeam/AboutTeam';
import LevelGame from '../layouts/levelGame/LevelGame';
import MainPageRender from '../layouts/mainPage/MainPageRender';
import MiniGamesListRender from '../layouts/miniGames/MiniGamesListRender';
import StatisticsPageRender from '../layouts/statisticsPage/statisticsPage';
import TextBookChapter from '../layouts/textBookChapter/TextBookChapter';
import TextBookPage from '../layouts/textBookPage/textBookPage';
import VideoRender from '../layouts/video/VideoRender';
import { body } from '../tutorial/get words/render-result-find-to-page';
import { addListenersToChoicePageChapter, addListenersToTextBookChapters, addListenersToTextBookPages } from '../tutorial/listeners';
import tutorialRender, { changeBackgroundChapters } from '../tutorial/markup';

const generateRouter = () => {
  document.querySelector('div')?.remove();

  const wrapper = document.getElementById('root') as HTMLElement;

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
    wrapper.innerHTML = '';
    new MainPageRender(wrapper);
  });

  template('book', () => {
    wrapper.innerHTML = '';
    new TextBookChapter(wrapper);
    addListenersToTextBookPages();
  });

  template('games', () => {
    wrapper.innerHTML = '';
    new MiniGamesListRender(wrapper);
  });

  template('stats', () => {
    wrapper.innerHTML = '';
    new StatisticsPageRender(wrapper).statisc('Изученные слова за день: ');
  });

  template('video', () => {
    wrapper.innerHTML = '';
    new VideoRender(wrapper);
  });

  template('about', () => {
    wrapper.innerHTML = '';
    new AboutTeam(wrapper);
  });

  template('selection-page', () => {
    wrapper.innerHTML = '';
    new TextBookPage(wrapper);
    addListenersToTextBookChapters();
    changeBackgroundChapters();
  });

  template('game', () => {
    wrapper.innerHTML = '';
    new LevelGame(wrapper);
  });

  template('game-level', () => {
    wrapper.innerHTML = '';
    createDomNode('h1', ['title'], wrapper, 'В разработке');
  });

  template('page-book', () => {
    wrapper.innerHTML = '';
    tutorialRender();
    addListenersToChoicePageChapter();
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

  route('/book/sprint', 'game-level');
  route('/book/audio', 'game-level');

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
    if (!window.location.hash.split('-').includes('#/book/section')) {
      body.style.backgroundColor = 'white';
    }
  };

  window.addEventListener('load', router);
  window.addEventListener('hashchange', router);
};

export default generateRouter;
