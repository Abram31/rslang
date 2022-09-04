import './authModal.scss';
import App from '../../components/app';
import createDomNode from '../../utils/createDomNode';
import { VALIDATION_EMAIL } from '../../utils/constants';
import { setStorage } from '../../utils/storage';
import AuthorizationStateWindow from '../layouts/authorizationStateWindow/authorizationStateWindow';

export default class AuthModal {
  private overlay;

  private modalWindow;

  protected title;

  private titleItemName;

  private titleItem;

  public inputEmail;

  public inputPassword;

  public actionBtn;

  public cancelBtn;

  private line;

  question: HTMLElement | undefined;

  registrationOpen: HTMLElement | undefined;

  signInOpen: HTMLElement | undefined;

  app = new App();

  private errorMessage;

  private inputName;

  constructor(textBtn: string, title: string) {
    this.overlay = createDomNode('div', ['overlay'], document.body);

    this.modalWindow = createDomNode('div', ['modal-window'], this.overlay);

    this.title = createDomNode('h2', ['title-modal'], this.modalWindow, `${title}`);

    this.titleItemName = createDomNode('div', ['title-item', 'hide'], this.modalWindow, 'Имя');
    this.inputName = createDomNode(
      'input',
      ['input', 'hide'],
      this.modalWindow,
      'E-mail',
      [{ placeholder: 'Введите вашe имя' }, { type: 'name' }, { required: 'true' }, { value: '' },
        { name: 'name' }, { autocomplete: 'on' }],
    ) as HTMLInputElement;

    this.titleItem = createDomNode('p', ['title-item'], this.modalWindow, 'E-mail');
    this.inputEmail = createDomNode(
      'input',
      ['input'],
      this.modalWindow,
      'E-mail',
      [{ placeholder: 'Введите ваш e-mail' }, { type: 'e-mail' }, { required: 'true' }, { value: '' },
        { name: 'email' }],
    ) as HTMLInputElement;

    this.titleItem = createDomNode('p', ['title-item'], this.modalWindow, 'Пароль');
    const form = createDomNode('form', ['form'], this.modalWindow);
    this.inputPassword = createDomNode(
      'input',
      ['input'],
      form,
      'E-mail',
      [{ placeholder: 'Введите ваш пароль' }, { type: 'password' }, { required: 'true' }, { value: '' },
        { name: 'password' }, { minLength: '8' }, { autocomplete: 'on' }],
    ) as HTMLInputElement;

    this.errorMessage = createDomNode('p', ['error-message'], this.modalWindow);

    this.actionBtn = createDomNode('button', ['btn-auth'], this.modalWindow, `${textBtn}`);

    this.cancelBtn = createDomNode(
      'button',
      ['btn-auth'],
      this.modalWindow,
      'Отмена',
    );
    this.cancelBtn.addEventListener('click', () => this.overlay?.remove());

    this.line = createDomNode('hr', ['line'], this.modalWindow);
  }

  modalSignInRender() {
    this.actionBtn.addEventListener('click', () => this.userSignIn(this.inputEmail.value, this.inputPassword.value));

    this.question = createDomNode('p', ['question'], this.modalWindow, 'У вас нет аккаунта?');
    this.registrationOpen = createDomNode('span', ['open-link'], this.question, ' Регистрация');
    this.registrationOpen.addEventListener('click', () => {
      this.overlay?.remove();
      new AuthModal('Зарегистрироваться', 'Зарегистрируйте учетную запись').modalRegistrationRender();
    });
  }

  modalRegistrationRender() {
    this.actionBtn.addEventListener('click', () => this.userRegistration());

    [this.titleItemName, this.inputName].forEach((el) => el.classList.remove('hide'));

    this.question = createDomNode('p', ['question'], this.modalWindow, 'У вас уже есть аккаунт?');
    this.signInOpen = createDomNode('span', ['open-link'], this.question, ' Войти');
    this.signInOpen.addEventListener('click', () => {
      this.overlay?.remove();
      new AuthModal('Войти', 'Войдите в свою учетную запись').modalSignInRender();
    });
  }

  async userSignIn(emailUser: string, passwordUser: string) {
    if (VALIDATION_EMAIL.test(emailUser) && passwordUser) {
      await this.app.loginUser({ email: emailUser, password: passwordUser })
        .then(async (res) => {
          setStorage('token', res.token);
          setStorage('refreshToken', res.refreshToken);
          setStorage('id', res.userId);
          setStorage('tokenDateCreation', String(Date.now()));

          (document.querySelector('.user-name') as HTMLElement).innerHTML = res.name;
          (document.querySelector('.btn') as HTMLElement).innerHTML = 'Выйти';
          this.overlay?.remove();
          window.location.reload();
        })
        .catch(() => {
          this.errorMessage.innerHTML = 'Введите корректные данные';
        });
    } else {
      this.errorMessage.innerHTML = 'Введите корректные данные';
    }
  }

  async userRegistration() {
    const nameUser = this.inputName.value;
    const emailUser = this.inputEmail.value;
    const passwordUser = this.inputPassword.value;

    if (VALIDATION_EMAIL.test(emailUser) && passwordUser && nameUser) {
      await this.app.createUser({ name: nameUser, email: emailUser, password: passwordUser })
        .then(() => {
          this.overlay?.remove();
          new AuthorizationStateWindow('Поздравляем с успешной регистрацией, теперь вы можете войти в свой аккаунт');
        })
        .catch(() => {
          this.errorMessage.innerHTML = 'Пользователь с такими данными уже зарегистрирован!';
        });
    } else {
      this.errorMessage.innerHTML = 'Введите корректные данные';
    }
  }
}
