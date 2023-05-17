import { AuthService } from "./AuthService";

export class AuthController {
  private constructor(private authService: AuthService) {}

  static create(authService: AuthService) {
    return new AuthController(authService);
  }

  async loginUseCase() {
    const user = await this.authService.getUser();
    const isUserLoggedIn = user && !user.isExpired();
    if (isUserLoggedIn) {
      return;
    }
    await this.authService.signinRedirect();
  }

  async logoutUseCase() {
    await this.authService.signoutRedirect();
  }

  async loginCallbackUseCase() {
    await this.authService.signinRedirectCallback();
  }

  async logoutCallbackUseCase() {
    await this.authService.signoutRedirectCallback();
  }
}
