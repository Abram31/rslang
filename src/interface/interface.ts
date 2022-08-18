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
