import { AuthUser, AuthService } from "./AuthService";
import { UserManager, UserManagerSettings, User } from "oidc-client-ts";

export class OIDCUser implements AuthUser {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  isExpired(): boolean {
    return this.user.expired || false;
  }
}

export class OIDCAuthService implements AuthService {
  private userManager: UserManager;

  constructor(settings: UserManagerSettings) {
    this.userManager = new UserManager(settings);
  }

  async signinRedirect(): Promise<void> {
    await this.userManager.signinRedirect();
  }
  async signoutRedirect(): Promise<void> {
    await this.userManager.signoutRedirect();
  }
  async signinRedirectCallback(): Promise<void> {
    await this.userManager.signinRedirectCallback();
  }
  async signoutRedirectCallback(): Promise<void> {
    await this.userManager.signoutRedirectCallback();
  }
  async getUser(): Promise<AuthUser | null> {
    const user = await this.userManager.getUser();
    if (!user) {
      return null;
    }
    return new OIDCUser(user);
  }
}
