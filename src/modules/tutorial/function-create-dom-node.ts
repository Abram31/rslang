export interface IDomNode {
  id?: string;
  typeElement: string;
  className?: string;
  text?: string;
  src?: string;
  type?: string;
  color?: string;
  colorText?: string;
  innerHTML?: string;
  parentElement?: HTMLElement | HTMLInputElement | DocumentFragment;
}

export const createDomNode = ({
  typeElement,
  id,
  className,
  text,
  type,
  color,
  colorText,
  innerHTML,
  parentElement,
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
    element.classList.add(className);
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

  if (parentElement) {
    parentElement.appendChild(element);
  }
  return element;
};
