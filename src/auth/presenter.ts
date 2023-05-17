import { AuthRepository } from "./repository";

export class AuthPresenter {
  private constructor(private repository: AuthRepository) {}

  static create(repository: AuthRepository) {
    return new AuthPresenter(repository);
  }

  async loginCallbackUseCase() {
    const userManager = this.repository.getUserManager();
    await userManager.signinRedirectCallback();
  }

  async logoutCallbackUseCase() {
    const userManager = this.repository.getUserManager();
    await userManager.signoutRedirectCallback();
  }
}
