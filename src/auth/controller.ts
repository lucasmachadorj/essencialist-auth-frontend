import { AuthRepository } from "./repository";

export class AuthController {
  private constructor(private repository: AuthRepository) {}

  static create(repository: AuthRepository) {
    return new AuthController(repository);
  }

  async loginUseCase() {
    const userManager = this.repository.getUserManager();
    const user = await this.repository.getUser();
    const isUserLoggedIn = user && !user.expired;
    if (isUserLoggedIn) {
      return;
    }
    await userManager.signinRedirect();
  }

  async logoutUseCase() {
    const userManager = this.repository.getUserManager();
    await userManager.signoutRedirect();
  }
}
