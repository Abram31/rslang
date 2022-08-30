import createDomNode from '../../../utils/createDomNode';
import AuthModal from '../../authentication/AuthModal';

export default class AuthorizationStateWindow {
  private overlay;

  private modalWindow;

  private title;

  private actionBtn;

  private cancelBtn;

  constructor(textWindow: string) {
    this.overlay = createDomNode('div', ['overlay'], document.body);
    this.modalWindow = createDomNode('div', ['modal-window'], this.overlay);

    this.title = createDomNode(
      'h2',
      ['title'],
      this.modalWindow,
      `${textWindow}`,
    );

    this.actionBtn = createDomNode('button', ['btn-auth'], this.modalWindow, 'Войти');
    this.actionBtn.addEventListener('click', () => {
      this.overlay?.remove();
      new AuthModal('Войти', 'Войдите в свою учетную запись').modalSignInRender();
    });

    this.cancelBtn = createDomNode(
      'button',
      ['btn-auth'],
      this.modalWindow,
      'Отмена',
    ) as HTMLButtonElement;
    this.cancelBtn.addEventListener('click', () => {
      localStorage.clear();
      this.overlay?.remove();
    });
  }
}
