import { User, UserManager } from "oidc-client-ts";
import { Gateway } from "./gateway";

export class AuthRepository {
  constructor(private gateway: Gateway) {}

  async login(): Promise<void> {
    const userManager = await this.gateway.getUserManager();
    await userManager.signinRedirect();
  }

  getUserManager(): UserManager {
    return this.gateway.getUserManager();
  }

  async getUser(): Promise<User | null> {
    const userManager = this.gateway.getUserManager();
    return await userManager.getUser();
  }
}
