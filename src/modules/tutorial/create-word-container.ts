/* eslint-disable import/prefer-default-export */
import { baseURL } from './fetch/fetch';
import { IdataFromServer } from './get words/render-result-find-to-page';
import { createDomNode } from './function-create-dom-node';

export const createWordContainer = (word: IdataFromServer) => {
  const wordFragment = document.createDocumentFragment();

  const descriptionWrapperWord = {
    typeElement: 'div',
    className: 'container-tutorial__wrapper-word',
    parentElement: wordFragment,
  };
  const wrapperWord = createDomNode(descriptionWrapperWord);
  wrapperWord.style.backgroundImage = `url(${baseURL}${word.image})`;

  const descriptionContainerWord = {
    typeElement: 'div',
    className: 'wrapper-word__container-word',
    parentElement: wrapperWord,
  };
  const containerWord = createDomNode(descriptionContainerWord);

  const descriptionTitle = {
    typeElement: 'h5',
    text: word.word,
    className: 'container-word__title',
    parentElement: containerWord,
  };
  const titleWord = createDomNode(descriptionTitle);
  titleWord.setAttribute('data-path-audio', word.audio);

  const descriptionTranslateTranscription = {
    typeElement: 'span',
    text: `${word.wordTranslate}, ${word.transcription}`,
    className: 'container-word__translate-transcription',
    parentElement: containerWord,
  };
  const translateTranscription = createDomNode(descriptionTranslateTranscription);

  const descriptionTextMeaning = {
    typeElement: 'span',
    innerHTML: word.textMeaning,
    className: 'container-word__text-meaning',
    parentElement: containerWord,
  };
  const textMeaning = createDomNode(descriptionTextMeaning);

  const descriptionTextMeaningTranslate = {
    typeElement: 'span',
    text: `${word.textMeaningTranslate}`,
    className: 'container-word__text-meaning-translate',
    parentElement: containerWord,
  };
  const textMeaningTranslate = createDomNode(descriptionTextMeaningTranslate);

  const descriptionTextExample = {
    typeElement: 'span',
    innerHTML: word.textExample,
    className: 'container-word__text-example',
    parentElement: containerWord,
  };
  const textExample = createDomNode(descriptionTextExample);

  const descriptionTextExampleTranslate = {
    typeElement: 'span',
    text: `${word.textExampleTranslate}`,
    className: 'container-word__text-example-translate',
    parentElement: containerWord,
  };
  const textExampleTranslate = createDomNode(descriptionTextExampleTranslate);

  return wordFragment;
};
