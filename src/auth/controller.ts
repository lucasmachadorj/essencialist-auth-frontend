import { AuthService } from "./AuthService";

export class AuthController {
  private constructor(private authService: AuthService) {}

  static create(authService: AuthService) {
    return new AuthController(authService);
  }

  async login() {
    const user = await this.authService.getUser();
    const isUserLoggedIn = user && !user.isExpired();
    if (isUserLoggedIn) {
      return;
    }
    await this.authService.signinRedirect();
  }

  async logout() {
    await this.authService.signoutRedirect();
  }

  async requestTokens() {
    await this.authService.signinRedirectCallback();
  }

  async removeTokens() {
    await this.authService.signoutRedirectCallback();
  }
}
