import { CreateNewUser, SignInUser } from '../interface/interface';

export default class App {
  private createUserUrl;

  private signInUserUrl;

  constructor(
    baseUrl = 'https://base-rs-lang-1.herokuapp.com',
    createUserUrl = `${baseUrl}/users`,
    signInUserUrl = `${baseUrl}/signin`,
  ) {
    this.createUserUrl = createUserUrl;
    this.signInUserUrl = signInUserUrl;
  }

  async createUser(user: CreateNewUser) {
    const response = await fetch(this.createUserUrl, {
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
}
