import { fetchRequest } from './fetch/fetch';
import { body, IdataFromServer } from './get words/render-result-find-to-page';
import { createWordContainer } from './create-word-container';
import { createDomNode } from './function-create-dom-node';
import playAudio from './play-words';
import './style.scss';

const tutorilaFragmet = document.createDocumentFragment();

const descriptionContainerTutorial = {
  typeElement: 'section',
  className: 'container-tutorial',
  parentElement: tutorilaFragmet,
};
export const wrapperTutorial = createDomNode(descriptionContainerTutorial);

const descriptionTitle = {
  typeElement: 'h4',
  text: 'Учебник',
  className: 'container-tutorial__title',
  parentElement: wrapperTutorial,
};
const wrapperTitle = createDomNode(descriptionTitle);

const descriptionWrapperSelects = {
  typeElement: 'div',
  className: 'container-tutorial__wrapper-selects',
  parentElement: wrapperTutorial,
};
const wrapperSelects = createDomNode(descriptionWrapperSelects);

const descriptionParts = {
  typeElement: 'select',
  id: 'select-parts',
  className: 'wrapper-selects__select-parts',
  parentElement: wrapperSelects,
};
const selectParts = createDomNode(descriptionParts);

const descriptionPartsDefaultOption = {
  typeElement: 'option',
  text: 'Выберите раздел',
  parentElement: selectParts,
};
createDomNode(descriptionPartsDefaultOption);

for (let i = 1; i <= 5; i += 1) {
  const descriptionPartsOption = {
    typeElement: 'option',
    text: `Раздел ${i}`,
    parentElement: selectParts,
  };
  createDomNode(descriptionPartsOption);
}

const descriptionPages = {
  typeElement: 'select',
  id: 'select-pages',
  className: 'wrapper-selects__select-pages',
  parentElement: wrapperSelects,
};
const selectPages = createDomNode(descriptionPages);

const descriptionPagesDefaultOption = {
  typeElement: 'option',
  text: 'Выберите страницу',
  parentElement: selectPages,
};
createDomNode(descriptionPagesDefaultOption);

for (let i = 1; i <= 30; i += 1) {
  const descriptionPartsOption = {
    typeElement: 'option',
    text: `Страница ${i}`,
    parentElement: selectPages,
  };
  createDomNode(descriptionPartsOption);
}

const descriptionContainerWords = {
  typeElement: 'div',
  className: 'container-tutorial__container-words',
  parentElement: wrapperTutorial,
};
export const containerWords = createDomNode(descriptionContainerWords);

fetchRequest.getNewWordsLIst({ page: '0', group: '0' })
  .then((data) => {
    containerWords.innerHTML = '';
    for (let i = 0; i <= 2; i += 1) {
      const fragmentWord = createWordContainer(data[i]);
      containerWords.appendChild(fragmentWord);
    }
  });

wrapperTutorial.addEventListener('click', (event) => {
  const element = event.target as HTMLHRElement;
  if (element.classList.contains('container-word__title')
    || element.classList.contains('container-word__text-meaning')
    || element.classList.contains('container-word__text-example')) {

    const pathAudio = element.getAttribute('data-path-audio');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    pathAudio ? playAudio(pathAudio) : '';
  }
});

const descriptionContainerButtons = {
  typeElement: 'div',
  className: 'container-tutorial__container-buttons',
  parentElement: wrapperTutorial,
};
const containerButtons = createDomNode(descriptionContainerButtons);

const descriptionHome = {
  typeElement: 'div',
  className: 'container-buttons__home',
  parentElement: containerButtons,
};
const buttonHome = createDomNode(descriptionHome);

const descriptionSoundGame = {
  typeElement: 'div',
  className: 'container-buttons__game-audio-call',
  parentElement: containerButtons,
};
const buttonSoundGame = createDomNode(descriptionSoundGame);

const descriptionSprintGame = {
  typeElement: 'div',
  className: 'container-buttons__game-sprint',
  parentElement: containerButtons,
};
const buttonSprintGame = createDomNode(descriptionSprintGame);

// body.appendChild(tutorilaFragmet);
