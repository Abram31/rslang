import App from './components/app';
import './global.scss';
import { generateRouter } from './modules/routing/routing';

generateRouter();

console.log('Hello');

new App().getUsersWords().then((data) => {
  console.log(data);
});
