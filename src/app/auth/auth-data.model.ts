// I do not create a User model as the user object do not always has a password attached to it!

export interface AuthData {
  email: string;
  password: string;
}
