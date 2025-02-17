

export interface AuthState {
  isLoggedIn: boolean;
  user?: AuthUser| any;
  token: string|null;
}

export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email? : string
}