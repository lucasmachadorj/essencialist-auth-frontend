import { AuthController } from "./controller";
import { authClientId, authClientSecret, authority } from "../shared/config";
import { OIDCAuthService } from "./OIDCAuthService";
import { UserManagerSettings, WebStorageStateStore } from "oidc-client-ts";

const settings: UserManagerSettings = {
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
};

const userManager = new OIDCAuthService(settings);

const authController = AuthController.create(userManager);

export { authController };
