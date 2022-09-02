import createDomNode from '../../utils/createDomNode';
import './game_sprint.scss';
import HeaderRender from '../layouts/header/HeaderRender';
import { timer } from './timer';

interface IData {
	id: string,
  group: 0,
  page: 0,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

const renderSprintGame = () => {
	let body = document.querySelector('body') as HTMLElement;
	body.innerHTML = '';
	new HeaderRender();

	let sprintPage = createDomNode('main', ['sprint-game'], document.body);
	let sprintContainer = createDomNode('div', ['wrapper', 'sprint-game-wrapper'], sprintPage);

	let sprintHeader = createDomNode('div', ['sprint-header'], sprintContainer);
	createDomNode('p', ['sprint-english-word'], sprintContainer, '');
	createDomNode('p', ['sprint-russian-word'], sprintContainer, '');
	let sprintButtons = createDomNode('div', ['sprint-buttons'], sprintContainer);

	createDomNode('div', ['sprint-timer'], sprintHeader, '10');
	createDomNode('img', ['sprint-sound-icon'], sprintHeader, '', [{ src: '../../assets/svg/icons/sprint-sound-icon.svg' }, { alt: 'Sprint sound icon' }]);
	createDomNode('div', ['sprint-counter'], sprintHeader, '0');

	createDomNode('button', ['btn', 'btn_red', 'wrong__button'], sprintButtons, 'Не верно');
	createDomNode('button', ['btn', 'correct__button'], sprintButtons, 'Верно');
	
}

const arrayGenerator = (arrayEng: Array<string>, arrayRus: Array<string>) => {
	const result: Array<string> = [];
	arrayEng.forEach((item, idx) => {
		let bool: number = Math.floor(Math.random() * 2);
		let index: number = Math.floor(Math.random() * arrayEng.length);
		bool ? result.push(arrayRus[idx]) : result.push(arrayRus[index]);
	})
	return result;
}

const wordsCheck = (array: Array<string>, translation: Array<string>) => {
	const result: Array<boolean> = [];
	array.forEach((item, idx) => {
		item === translation[idx] ? result.push(true) : result.push(false);
	})
	return result;
}

let counter: number = 0;

const getWords = async () => {
	let words: Array<string> = [];
	let wordsTranslate: Array<string> = [];
	let pathAudio: Array<string> = [];

	for (let i = 1; i <= 30; i++) {
		let result = await fetch(`https://base-rs-lang-1.herokuapp.com/words?group=1&page=${i}`);
		let data: Array<IData> = await result.json();
		data.forEach(item => {
			pathAudio.push(item.audio);
			words.push(item.word);
			wordsTranslate.push(item.wordTranslate);
		})
	}

	let score = document.querySelector('.sprint-counter') as HTMLElement;
	let englishWord = document.querySelector('.sprint-english-word') as HTMLElement;
	let russianWord = document.querySelector('.sprint-russian-word') as HTMLElement;
	const correctButton = document.querySelector('.correct__button') as HTMLElement;
	const wrongButton = document.querySelector('.wrong__button') as HTMLElement;

	let translation: Array<string> = arrayGenerator(words, wordsTranslate);
	
	englishWord.innerText = words[counter];
	russianWord.innerText = translation[counter];

	const answers = wordsCheck(wordsTranslate, translation);

	const changeWords = () => {
		let current = Number(score.innerText)
		score.innerText = (current += 10).toString();
		counter++
		englishWord.innerText = words[counter];
		russianWord.innerText = translation[counter];
		
	}

	correctButton.addEventListener('click', changeWords);
	wrongButton.addEventListener('click', changeWords);

	document.addEventListener('keydown', (e: KeyboardEvent) => {
		if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') changeWords();
	})

	return [words, wordsTranslate, answers, pathAudio];
}

export const englishWords: Array<string> = []; 
export const russianWords: Array<string> = []; 
export const result: Array<boolean> = [];
export const audioPaths: Array<string> = [];

const play = (path: string) => {
	const url = 'https://base-rs-lang-1.herokuapp.com/';
	const audio = new Audio(`${url}${path}`);
	audio.play();
}

const userResponse = async () => {
	const answers = await getWords();
	const score = document.querySelector('.sprint-counter') as HTMLElement;
	const correctButton = document.querySelector('.correct__button') as HTMLElement;
	const wrongButton = document.querySelector('.wrong__button') as HTMLElement;
	const soundIcon = document.querySelector('.sprint-sound-icon') as HTMLElement;

	answers[0].forEach(word => {
		if (typeof word === 'string') {
			englishWords.push(word)
		}
	})

	answers[1].forEach(word => {
		if (typeof word === 'string') {
			russianWords.push(word)
		}
	})

	answers[3].forEach(path => {
		if (typeof path === 'string') {
			audioPaths.push(path);
		}
	})

	correctButton.addEventListener('click', () => {
		answers[2][counter - 1] ? result.push(true) : result.push(false);
	});

	wrongButton.addEventListener('click', () => {
		answers[2][counter - 1] ? result.push(false) : result.push(true);
	});

	document.addEventListener('keydown', (e: KeyboardEvent) => {
		if (e.code === 'ArrowRight') {

			answers[2][counter - 1] ? result.push(true) : result.push(false);
		} else if (e.code === 'ArrowLeft') {

			answers[2][counter - 1] ? result.push(false) : result.push(true);
		}
	});

	soundIcon.addEventListener('click', () => {
		audioPaths.forEach((path, idx) => {
			if (counter === idx) {
				play(path);
			}
		})
	})

	timer();
}

renderSprintGame();
userResponse();

export { renderSprintGame, getWords, play };