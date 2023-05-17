import { AuthController } from "./controller";
import { OIDCAuthService } from "./OIDCAuthService";
import { buildUserManagerSettings } from "./fixtures";

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

const userManagerSettings = buildUserManagerSettings();

describe("Auth use cases", () => {
  describe("When user is not logged in", () => {
    describe("When user logins", () => {
      it("Should call redirect to provider signin page", async () => {
        const authService = new OIDCAuthService(userManagerSettings);
        jest.spyOn(authService, "getUser").mockResolvedValue(null);
        jest.spyOn(authService, "signinRedirect");
        const controller = AuthController.create(authService);
        await controller.loginUseCase();
        expect(authService.getUser).toHaveBeenCalled();
        expect(authService.signinRedirect).toHaveBeenCalled();
      });
    });
  });

  describe("When user is logged in", () => {
    describe("when user logs out", () => {
      it("should call redirect to provider signout page", async () => {
        const authService = new OIDCAuthService(userManagerSettings);
        jest.spyOn(authService, "getUser").mockResolvedValue({
          isExpired: () => false,
        });
        jest.spyOn(authService, "signoutRedirect");
        const controller = AuthController.create(authService);
        await controller.logoutUseCase();
        expect(authService.signoutRedirect).toHaveBeenCalled();
      });
    });
  });

  describe("When provider authorized access ", () => {
    test("whether user is redirected", async () => {
      const authService = new OIDCAuthService(userManagerSettings);
      jest.spyOn(authService, "signinRedirectCallback");
      const controller = AuthController.create(authService);
      await controller.loginCallbackUseCase();
      expect(authService.signinRedirectCallback).toHaveBeenCalled();
    });
  });

  describe("When user is logged out", () => {
    test("whether user is redirected", async () => {
      const authService = new OIDCAuthService(userManagerSettings);
      jest.spyOn(authService, "signoutRedirectCallback");
      const controller = AuthController.create(authService);
      await controller.logoutCallbackUseCase();
      expect(authService.signoutRedirectCallback).toHaveBeenCalled();
    });
  });
});
