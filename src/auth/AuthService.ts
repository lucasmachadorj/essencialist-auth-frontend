export interface AuthUser {
  isExpired(): boolean;
}

export interface AuthService {
  signinRedirect(): Promise<void>;
  signoutRedirect(): Promise<void>;
  signinRedirectCallback(): Promise<void>;
  signoutRedirectCallback(): Promise<void>;
  getUser(): Promise<AuthUser | null>;
}
