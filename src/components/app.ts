import { CreateNewUser, IdataFromServer, SignInUser } from '../interface/interface';
import AuthorizationStateWindow from '../modules/layouts/authorizationStateWindow/authorizationStateWindow';
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

  async request(endpoint: string, options: RequestInit) {
    const tokenDateCreation = getStorage('tokenDateCreation');
    const token = getStorage('token');

    if (token !== null) {
      if (Date.now() - Number(tokenDateCreation) > TOKEN_ACTION_IN_MILLISECONDS) {
        try {
          await this.refreshToken();
        } catch (e) {
          new AuthorizationStateWindow('Время сессии истекло, вам необходимо авторизоваться');
        }
      }

      const requestPromise = await fetch(endpoint, {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // if (await requestPromise.status === 417) {
      //   console.warn()
      // }

      return requestPromise.json();
    }
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
    return this.request(`${this.baseUrl}/words/${idWord}`, {
      method: 'GET',
    });
  }

  async getUserAggregateWords(filter: string) { // ---example ?filter={"userWord.difficulty":"hard"}
    const id = getStorage('id');
    return this.request(`${this.userUrl}/${id}/aggregatedWords${filter}`, {
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

  async getStatistics() {
    const id = getStorage('id');
    const token = getStorage('token');
    return this.request(`${this.userUrl}/${id}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  async setStatistics() {
    const id = getStorage('id');
    const token = getStorage('token');
    const statistics = sessionStorage.getItem('statistics');
    return this.request(`${this.userUrl}/${id}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: statistics!,
    });
  }

  async deleteUserWord(wordId: string) {
    const id = getStorage('id');
    const token = getStorage('token');

    return fetch(`${this.userUrl}/${id}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        // Accept: 'application/json',
      },
    });
    // console.log((await response));
  }

  async putUserWord(wordId: string) {
    const id = getStorage('id');
    const token = getStorage('token');

    const aboutWord = {
      difficulty: 'studied',
    };

    return this.request(`${this.userUrl}/${id}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(aboutWord),
    });
  }
}
