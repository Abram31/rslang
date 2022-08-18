const generateRouter = () => {
	let routes: { [key: string]: string | (() => void) } = {};
	let templates: { [key: string]: (() => void) } = {};

	let body = document.querySelector('body') as HTMLElement;

	const generateHeader = () => {
	let linksContainer = document.createElement('div');
	let main = document.createElement('a');
	main.href = '#/';
	main.innerText = 'Main';
	let book = document.createElement('a');
	book.href = '#/book';
	book.innerText = 'Book';
	let games = document.createElement('a');
	games.href = '#/games';
	games.innerText = 'Games';
	let stats = document.createElement('a');
	stats.href = '#/stats';
	stats.innerText = 'Stats';
	let about = document.createElement('a');
	about.href = '#/about';
	about.innerText = 'About';

	let linksArray = [main, book, games, stats, about];

	linksArray.forEach(link => {
		linksContainer.append(link);
		})
	body.append(linksContainer);
	}

	const home = () => {
		body.innerHTML = '';
		generateHeader();
		let div = document.createElement('div');
		div.innerHTML = '<h1>Home</h1>';
		body.append(div);
	}

	const book = () => {
		body.innerHTML = '';
		generateHeader();
		let div = document.createElement('div');
		div.innerHTML = '<h1>Book</h1>';
		body.append(div);
	}

	const games = () => {
		body.innerHTML = '';
		generateHeader();
		let div = document.createElement('div');
		div.innerHTML = '<h1>Games</h1>';
		body.append(div);
	}

	const stats = () => {
		body.innerHTML = '';
		generateHeader();
		let div = document.createElement('div');
		div.innerHTML = '<h1>Stats</h1>';
		body.append(div);
	}

	const about = () => {
		body.innerHTML = '';
		generateHeader();
		let div = document.createElement('div');
		div.innerHTML = '<h1>About</h1>';
		body.append(div);
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
}

export { generateRouter };