import { Attributes } from '../interface/interface';

export default function createDomNode(
  tag: string,
  className?: string[],
  parentNode?: HTMLElement,
  text?: string,
  attr?: Array<Attributes>,
): HTMLElement {
  const elem = document.createElement(tag);
  if (className) {
    className.forEach((el) => elem.classList.add(el));
  }
  if (parentNode) {
    parentNode.append(elem);
  }
  if (text) {
    elem.textContent = text;
  }
  if (attr) {
    attr.forEach((el) => {
      for (const key in el) {
        if (Object.prototype.hasOwnProperty.call(el, key)) {
          elem.setAttribute(key, el[key]);
        }
      }
    });
  }
  return elem;
}
