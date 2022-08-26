import { createDomNode } from '../tutorial/function-create-dom-node';
import { body } from '../tutorial/get words/render-result-find-to-page';

const preload = () => {
  const descriptionPreload = {
    typeElement: 'div',
    className: 'preloader',
    parentElement: body,
  };
  const prel = createDomNode(descriptionPreload);
  const descriptionPreloadRow = {
    typeElement: 'div',
    className: 'preloader__row',
    parentElement: prel,
  };
  const preloadRow = createDomNode(descriptionPreloadRow);
  const descriptionPreloadItem = {
    typeElement: 'div',
    className: 'preloader__item',
    parentElement: preloadRow,
  };
  createDomNode(descriptionPreloadItem);
  createDomNode(descriptionPreloadItem);
  return prel;
};

export default preload;
