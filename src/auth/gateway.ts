import { UserManager } from "oidc-client-ts";

export class Gateway {
  private userManager: UserManager;

  constructor(userManager: UserManager) {
    this.userManager = userManager;
  }

  getUserManager(): UserManager {
    return this.userManager;
  }
}
