import { UserManager, UserManagerSettings } from "oidc-client-ts";
import { AuthController } from "./controller";
import { AuthRepository } from "./repository";
import { Gateway } from "./gateway";

jest.mock("oidc-client-ts", () => {
  return {
    UserManager: jest.fn().mockImplementation(() => {
      return {
        signinRedirect: jest.fn(),
        getUser: jest.fn(),
        signinRedirectCallback: jest.fn(),
        signoutRedirect: jest.fn(),
        signoutRedirectCallback: jest.fn(),
      };
    }),
  };
});

const credentials: UserManagerSettings = {
  authority: "https://localhost:5001",
  client_id: "client_id",
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile email",
  post_logout_redirect_uri: "http://localhost:3000/",
  silent_redirect_uri: "http://localhost:3000/silent",
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true,
  metadata: {
    end_session_endpoint: "https://localhost:5001/connect/endsession",
  },
};

describe("Auth use cases", () => {
  describe("When user is not logged in", () => {
    describe("When user logins", () => {
      it("Should call redirect to provider signin page", async () => {
        const userManagerMocked = new UserManager(
          credentials
        ) as jest.Mocked<UserManager>;
        const gateway = new Gateway(userManagerMocked);
        const repository = new AuthRepository(gateway);
        const controller = AuthController.create(repository);
        await controller.loginUseCase();
        expect(userManagerMocked.getUser).toHaveBeenCalled();
        expect(userManagerMocked.signinRedirect).toHaveBeenCalled();
      });
    });
  });

  describe("When user is logged in", () => {
    describe("when user logs out", () => {
      it("should call redirect to provider signout page", async () => {
        const userManagerMocked = new UserManager(
          credentials
        ) as jest.Mocked<UserManager>;
        const gateway = new Gateway(userManagerMocked);
        const repository = new AuthRepository(gateway);
        const controller = AuthController.create(repository);
        await controller.logoutUseCase();
        expect(userManagerMocked.signoutRedirect).toHaveBeenCalled();
      });
    });
  });
});
