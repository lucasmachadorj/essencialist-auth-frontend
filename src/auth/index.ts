import { UserManager, WebStorageStateStore } from "oidc-client-ts";
import { Gateway } from "./gateway";
import { AuthRepository } from "./repository";
import { AuthController } from "./controller";
import { AuthPresenter } from "./presenter";
import { authClientId, authClientSecret, authority } from "../shared/config";

const userManager = new UserManager({
  authority,
  client_id: authClientId,
  client_secret: authClientSecret,
  scope: "openid email profile offline_access",
  response_type: "code",
  response_mode: "query",
  includeIdTokenInSilentRenew: true,
  redirect_uri: `${location.origin}/signed-in`,
  metadataSeed: {
    end_session_endpoint: `${authority}/v2/logout?client_id=${authClientId}&returnTo=${location.origin}/signed-out`,
  },
  userStore: new WebStorageStateStore({ store: localStorage }),
});

const gateway = new Gateway(userManager);
const repository = new AuthRepository(gateway);
const authController = AuthController.create(repository);
const authPresenter = AuthPresenter.create(repository);

export { authController, authPresenter };
