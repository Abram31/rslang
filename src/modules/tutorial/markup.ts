import { fetchRequest } from './fetch/fetch';
import { body, IdataFromServer } from './get words/render-result-find-to-page';
import { createWordContainer } from './create-word-container';
import { createDomNode } from './function-create-dom-node';
import playAudio from './play-words';
import './style.scss';

export const changeBackgroundChapters = () => {
  const chapterInMemory = sessionStorage.getItem('chapter-number');
  // eslint-disable-next-line default-case
  switch (chapterInMemory) {
    case '1':
      body.style.backgroundColor = 'rgba(239, 251, 251, 0.2)';
      break;
    case '2':
      body.style.backgroundColor = 'rgba(18, 235, 235, 0.2)';
      break;
    case '3':
      body.style.backgroundColor = 'rgba(97, 248, 27, 0.2)';
      break;
    case '4':
      body.style.backgroundColor = 'rgba(246, 249, 103, 0.56)';
      break;
    case '5':
      body.style.backgroundColor = 'rgba(185, 38, 188, 0.2)';
      break;
    case '6':
      body.style.backgroundColor = 'rgba(245, 68, 59, 0.2)';
      break;
  }
};

const tutorialRender = () => {
  const pageInMemory = sessionStorage.getItem('page-number');
  const chapterInMemory = sessionStorage.getItem('chapter-number');

  const tutorilaFragmet = document.createDocumentFragment();

  const descriptionContainerTutorial = {
    typeElement: 'section',
    className: 'container-tutorial',
    parentElement: tutorilaFragmet,
  };
  const wrapperTutorial = createDomNode(descriptionContainerTutorial);

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
    const optionChapter = createDomNode(descriptionPartsOption);
    if (i === Number(chapterInMemory)) {
      optionChapter.setAttribute('selected', '');
    }
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
    const optionPage = createDomNode(descriptionPartsOption) as HTMLOptionElement;
    if (i === Number(pageInMemory)) {
      optionPage.setAttribute('selected', '');
    }
  }

  const descriptionContainerWords = {
    typeElement: 'div',
    className: 'container-tutorial__container-words',
    parentElement: wrapperTutorial,
  };
  const containerWords = createDomNode(descriptionContainerWords);

  wrapperTutorial.addEventListener('click', (event) => {
    const element = event.target as HTMLHRElement;
    if (element.classList.contains('container-word__title')) {
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

  fetchRequest.getNewWordsLIst({ page: String(Number(pageInMemory) - 1),
    group: String(Number(chapterInMemory) - 1) })
    .then((data) => {
      for (let i = 0; i < data.length; i += 1) {
        const fragmentWord = createWordContainer(data[i]);
        containerWords.appendChild(fragmentWord);
      }
    });
  body.appendChild(tutorilaFragmet);
  changeBackgroundChapters();
};

export default tutorialRender;
