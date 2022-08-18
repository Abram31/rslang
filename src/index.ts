import './global.scss';
import FooterRender from './modules/layouts/footer/FooterRender';
import HeaderRender from './modules/layouts/header/HeaderRender';
import MiniGamesListRender from './modules/layouts/miniGames/MiniGamesListRender';

import './modules/game-audio-call/markup';

// import './modules/tutorial/fetch/fetch';
// import './modules/get words/get-words';
// import './modules/tutorial/get words/render-result-find-to-page';
// import './modules/tutorial/markup';
// import './modules/tutorial/listeners';
new HeaderRender();
new MiniGamesListRender();
new FooterRender();
