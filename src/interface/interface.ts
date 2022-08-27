export interface SignInUser {
  email: string,
  password: string,
}

export interface CreateNewUser extends SignInUser {
  name: string,
}

export interface Attributes {
  [key: string ]: string;
}

export interface ParamsToken {
  method: string,
  credentials: 'omit',
  headers: Headers,
  body?: string,
}

interface Headers {
  Authorization: string,
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
