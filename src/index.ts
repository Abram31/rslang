import App from './components/app';
import './global.scss';
import FooterRender from './modules/layouts/footer/FooterRender';
import HeaderRender from './modules/layouts/header/HeaderRender';
import generateRouter from './modules/routing/routing';

new HeaderRender();

generateRouter();

new FooterRender();
