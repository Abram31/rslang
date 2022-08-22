import './global.scss';
import FooterRender from './modules/layouts/footer/FooterRender';
import HeaderRender from './modules/layouts/header/HeaderRender';
import { generateRouter } from './modules/routing/routing';
import LevelGame from './modules/layouts/levelGame/LevelGame';

new HeaderRender();
new LevelGame();
new FooterRender();

generateRouter(); 
