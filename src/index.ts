import './global.scss';
import FooterRender from './modules/layouts/footer/FooterRender';
import HeaderRender from './modules/layouts/header/HeaderRender';
import { renderSprintGame, getWords } from './modules/game_sprint/game_sprint';
import LevelGame from './modules/layouts/levelGame/LevelGame';
import { renderSprintResults } from './modules/game_sprint/results/sprint_results';


new HeaderRender();
new LevelGame();
new FooterRender();

// generateRouter();
renderSprintGame();
// renderSprintResults();
// getWords();