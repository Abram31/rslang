export default function helpLoadNavigation(el: HTMLElement, text: RegExp) {
  if (window.location.href.match(text) && el.getAttribute('href')?.match(text)) {
    el.classList.add('active');
  }
}
