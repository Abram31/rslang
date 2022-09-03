import { fetchRequest } from './fetch/fetch';
import { body } from './get words/render-result-find-to-page';
import createWordContainer from './create-word-container';
import createDomNode from './function-create-dom-node';
import playAudio from './play-words';
import './style.scss';
import { addWordsToPage } from '../game-audio-call/get-voice-word';

export const changeBackgroundChapters = () => {
  const chapterInMemory = sessionStorage.getItem('chapter-number');
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

export const miniButtonGames = (wrapper: HTMLElement) => {
  const descriptionContainerButtons = {
    typeElement: 'div',
    className: 'container-tutorial__container-buttons',
    parentElement: wrapper,
  };
  const containerButtons = createDomNode(descriptionContainerButtons);

  // const descriptionHome = {
  //   typeElement: 'div',
  //   className: 'container-buttons__home',
  //   parentElement: containerButtons,
  // };
  // const buttonHome = createDomNode(descriptionHome);

  const descriptionSoundGame = {
    typeElement: 'button',
    className: 'container-buttons__game-audio-call',
    parentElement: containerButtons,
  };
  // const buttonSoundGame =
  createDomNode(descriptionSoundGame);

  const descriptionSprintGame = {
    typeElement: 'button',
    className: 'container-buttons__game-sprint',
    parentElement: containerButtons,
  };
  // const buttonSprintGame =
  createDomNode(descriptionSprintGame);

  containerButtons.addEventListener('click', async (event) => {
    const element = event.target as HTMLDivElement;
    if (element.classList.contains('container-buttons__game-audio-call')) {
      if (window.location.href.match(/section-7/)) {
        window.location.hash = '/games/audio/hard-word';
      } else {
        const parths = (document.querySelector('.wrapper-selects__select-parts') as HTMLSelectElement).value;
        const part = parseInt(parths.replace(/[^\d]/g, ''), 10);

        const pages = (document.querySelector('.wrapper-selects__select-pages') as HTMLSelectElement).value;
        const page = parseInt(pages.replace(/[^\d]/g, ''), 10);
        window.location.hash = `book/games/audio/${part}/${page}`;
      }
    }
  });
};

const tutorialRender = () => {
  const pageInMemory = sessionStorage.getItem('page-number');
  const chapterInMemory = sessionStorage.getItem('chapter-number');

  const tutorilaFragmet = document.createDocumentFragment();

  const wrap = document.getElementById('root') as HTMLElement;

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
  // const wrapperTitle =
  createDomNode(descriptionTitle);

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
  const selectParts = createDomNode(descriptionParts) as HTMLSelectElement;

  const descriptionPartsDefaultOption = {
    typeElement: 'option',
    text: 'Выберите раздел',
    parentElement: selectParts,
  };
  createDomNode(descriptionPartsDefaultOption);

  for (let i = 1; i <= 7; i += 1) {
    if (!localStorage.getItem('id') && i === 7) {
      break;
    }
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
  const selectPages = createDomNode(descriptionPages) as HTMLSelectElement;

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
      pathAudio ? playAudio(pathAudio) : '';
    }
  });

  miniButtonGames(wrapperTutorial);

  fetchRequest.getNewWordsLIst({
    page: String(Number(pageInMemory) - 1),
    group: String(Number(chapterInMemory) - 1),
  })
    .then((data) => {
      for (let i = 0; i < data.length; i += 1) {
        const fragmentWord = createWordContainer(data[i], data[i].id);
        containerWords.appendChild(fragmentWord);
      }
    });
  wrap.appendChild(tutorilaFragmet);
  changeBackgroundChapters();
};

export default tutorialRender;
