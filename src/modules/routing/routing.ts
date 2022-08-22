import HeaderRender from '../layouts/header/HeaderRender';
import FooterRender from '../layouts/footer/FooterRender';
import MainPageRender from '../layouts/mainPage/MainPageRender';
import MiniGamesListRender from '../layouts/miniGames/MiniGamesListRender';
import AboutTeam from '../layouts/aboutTeam/AboutTeam';

const generateRouter = () => {
	let routes: { [key: string]: string | (() => void) } = {};
	let templates: { [key: string]: (() => void) } = {};

	let body = document.querySelector('body') as HTMLElement;

	const home = () => {
		body.innerHTML = '';
		new HeaderRender();
		new MainPageRender();
		new FooterRender();
	}

	const book = () => {
		body.innerHTML = '';
		new HeaderRender();
		new FooterRender();
	}

	const games = () => {
		body.innerHTML = '';
		new HeaderRender();
		new MiniGamesListRender();
		new FooterRender();
	}

	const stats = () => {
		body.innerHTML = '';
		new HeaderRender();
		new FooterRender();
	}

	const about = () => {
		body.innerHTML = '';
		new HeaderRender();
		new AboutTeam();
		new FooterRender();
	}

	const route = (path: string, template: string | (() => void)) => {
		if (typeof template === 'function') {
			return routes[path] = template;
		} else if (typeof template === 'string') {
				return routes[path] = templates[template];
		} else {
				return;
		};
	};

	const template = (name: string, templateFunction: (() => void)) => {
		return templates[name] = templateFunction;
	};

	template('home', () => {
		home();
	});

	template('book', () => {
		book();
	});

	template('games', () => {
		games();
	});

	template('stats', () => {
		stats();
	});

	template('about', () => {
		about();
	});

	route('/', 'home');
	route('/book', 'book');
	route('/games', 'games');
	route('/stats', 'stats');
	route('/about', 'about');

	const resolveRoute = (route: string) => {
		try {
			return routes[route];
		} catch (e) {
			throw new Error(`Route ${route} not found`);
		};
	};

	const router = () => {
		let url = window.location.hash.slice(1) || '/';
		let route = resolveRoute(url);

		if (typeof route === 'function') {
			route();
		}
	};

	window.addEventListener('load', router);
	window.addEventListener('hashchange', router);

	console.log(document.querySelectorAll('.navigation__item'))
}

export { generateRouter };