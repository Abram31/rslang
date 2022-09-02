import { addWordsToPage } from '../game-audio-call/get-voice-word';
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
import baseMarkupAudioCall from '../game-audio-call/markup';
import addListeners from '../game-audio-call/listeners';
import addDifficultWordsToPage from '../tutorial/difficult_words/add_difficult_words_to_page';
import HeaderRender from '../layouts/header/HeaderRender';
import FooterRender from '../layouts/footer/FooterRender';

const generateRouter = () => {
  document.querySelector('div')?.remove();
  new HeaderRender();
  new FooterRender();

  const wrapper = document.getElementById('root') as HTMLElement;
  const footer = document.querySelector('.footer') as HTMLElement;

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

  template('game-audio-call', async () => {
    wrapper.innerHTML = '';
    baseMarkupAudioCall();
    await addWordsToPage();
    addListeners();
  });
  template('game-audio-call-difficult', async () => {
    wrapper.innerHTML = '';
    baseMarkupAudioCall();
    await addWordsToPage(true);
    addListeners();
  });
  template('game-audio-call-random-page', async () => {
    wrapper.innerHTML = '';
    baseMarkupAudioCall();
    await addWordsToPage(false, sessionStorage.getItem('chapter-number') as string, sessionStorage.getItem('page-number') as string);
    addListeners();
  });

  template('page-book', () => {
    wrapper.innerHTML = '';
    tutorialRender();
    addListenersToChoicePageChapter();
  });
  template('page-difficult-words', async () => {
    wrapper.innerHTML = '';
    await addDifficultWordsToPage();
  });

  route('/', 'home');
  route('/book', 'book');
  route('/games', 'games');
  route('/stats', 'stats');
  route('/about', 'about');
  route('/video', 'video');

  for (let i = 0; i <= 7; i += 1) {
    if (i < 7) {
      route(`/book/section-${i}`, 'selection-page');
    } else {
      route(`/book/section-${i}`, 'page-difficult-words');
    }
  }

  route('/games/audio', 'game');
  route('/games/sprint', 'game');

  for (let i = 0; i <= 8; i += 1) {
    if (i === 7) {
      route(`/games/audio/${i}`, 'game-audio-call-difficult');
    } else if (i === 8) {
      route(`/games/audio/${i}`, 'game-audio-call-random-page');
    } else {
      route(`/games/audio/${i}`, 'game-audio-call');
    }
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

    const route = resolveRoute(url);

    if (typeof route === 'function') {
      route();
    }
    if (!window.location.hash.split('-').includes('#/book/section')) {
      body.style.backgroundColor = 'white';
    }

    if (!window.location.href.match(/audio\//)) {
      body.style.backgroundImage = 'none';
      footer.style.display = 'inline-flex';
      body.style.justifyContent = 'space-between';
    } else {
      footer.style.display = 'none';
      body.style.justifyContent = 'start';
    }
  };

  window.addEventListener('load', router);
  window.addEventListener('hashchange', router);
};

export default generateRouter;
