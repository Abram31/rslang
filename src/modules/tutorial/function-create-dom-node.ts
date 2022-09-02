import { IDomNode } from '../../interface/interface';

const createDomNode = ({
  typeElement,
  id,
  className,
  text,
  type,
  color,
  colorText,
  innerHTML,
  parentElement,
  dataAttribute,
}: IDomNode) => {
  let element;
  if (typeElement === 'input' || typeElement === 'button') {
    element = document.createElement(typeElement) as HTMLInputElement;
    if (type) {
      element.type = type;
    }
  } else {
    element = document.createElement(typeElement) as HTMLElement;
  }
  if (id) {
    element.id = id;
  }
  if (className) {
    const elem = element as HTMLElement;
    className.split(' ').forEach((item) => {
      elem.classList.add(item);
    });
  }
  if (text) {
    element.innerText = text;
  }
  if (color) {
    element.style.backgroundColor = color;
  }
  if (colorText) {
    element.style.color = colorText;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  if (dataAttribute) {
    element.setAttribute(dataAttribute[0], dataAttribute[1]);
  }
  if (parentElement) {
    parentElement.appendChild(element);
  }
  return element;
};

export default createDomNode;
