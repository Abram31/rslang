import './global.scss';
import FooterRender from './modules/layouts/footer/FooterRender';
import HeaderRender from './modules/layouts/header/HeaderRender';
import MiniGamesListRender from './modules/layouts/miniGames/MiniGamesListRender';
import { generateRouter } from './modules/routing/routing';

new HeaderRender();
new MiniGamesListRender();
new FooterRender();

generateRouter();