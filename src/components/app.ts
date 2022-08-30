import { CreateNewUser, SignInUser } from '../interface/interface';
// eslint-disable-next-line import/no-cycle
import AuthModal from '../modules/authentication/AuthModal';
import { IdataFromServer } from '../modules/tutorial/get words/render-result-find-to-page';
import { TOKEN_ACTION_IN_MILLISECONDS } from '../utils/constants';
import { getStorage, setStorage } from '../utils/storage';

export default class App {
  private userUrl;

  private signInUserUrl;

  private baseUrl: string;

  constructor(
    baseUrl = 'https://base-rs-lang-1.herokuapp.com',
    userUrl = `${baseUrl}/users`,
    signInUserUrl = `${baseUrl}/signin`,
  ) {
    this.baseUrl = baseUrl;
    this.userUrl = userUrl;
    this.signInUserUrl = signInUserUrl;
  }

  async createUser(user: CreateNewUser) {
    const response = await fetch(this.userUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response.json();
  }

  async loginUser(user: SignInUser) {
    const response = await fetch(this.signInUserUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response.json();
  }

  async refreshToken() {
    const userId = getStorage('id');
    const refresh = getStorage('refreshToken');

    const response = await fetch(`${this.userUrl}/${userId}/tokens`, {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${refresh}`,
        Accept: 'application/json',
      },
    });

    const tokenData = await response.json();
    setStorage('token', tokenData.token);
    setStorage('refreshToken', tokenData.refreshToken);
    return tokenData.token;
  }

  // async request(endpoint: string, params: RequestInit) {
  //   return fetch(endpoint, params)
  //     .then(async (res) => {
  //       if (res.status === 401) {
  //         await this.refreshToken()
  //           .catch(() => {
  //             new AuthModal('Войти', 'Войдите в свою учетную запись').modalSignInRender();
  //           });
  //       }
  //       return res.json();
  //     });
  // }

  async request(endpoint: string, options: RequestInit) {
    const tokenDateCreation = getStorage('tokenDateCreation');
    const token = getStorage('token');

    if (token !== null) {
      if (Date.now() - Number(tokenDateCreation) > TOKEN_ACTION_IN_MILLISECONDS) {
        try {
          await this.refreshToken();
        } catch (e) {
          new AuthModal('Войти', 'Войдите в свою учетную запись').modalSignInRender();
        }
      }
    } else {
      // new AuthModal('Войти', 'Войдите в свою учетную запись').modalSignInRender();    убрал ее потому что выскакивала везде если не зарегистрирован
    }

    const requestPromise = await fetch(endpoint, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return requestPromise.json();
  }

  async getUser() {
    const id = getStorage('id');

    return this.request(`${this.userUrl}/${id}`, {
      method: 'GET',
    });
  }

  async getUsersWords() { // Получить слова пользователя
    const id = getStorage('id');
    return this.request(`${this.userUrl}/${id}/words`, {
      method: 'GET',
    });
  }

  async getUserOneWord(idWord: string) { // Получить одно слово  ----- АРТЕМ
    const id = getStorage('id');
    return this.request(`${this.baseUrl}/words/${idWord}`, {
      method: 'GET',
    });
  }

  async postUserWords(word: IdataFromServer, diff?: string) { // Запись слов пользователя
    const id = getStorage('id');

    const aboutWord = {
      difficulty: !diff ? 'easy' : `${diff}`,
    };
    try {
      const resp = await this.request(`${this.userUrl}/${id}/words/${word.id}`, {
        method: 'POST',
        body: JSON.stringify(aboutWord),
      });
      return resp;
    } catch (err) {
      const resp = await this.request(`${this.userUrl}/${id}/words/${word.id}`, {
        method: 'PUT',
        body: JSON.stringify(aboutWord),
      });
      return resp;
    }
  }
}
