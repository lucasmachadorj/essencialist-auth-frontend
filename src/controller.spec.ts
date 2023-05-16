describe("Auth use cases", () => {
  describe("When user is not logged in", () => {
    describe("When user tries to login with right credentials", () => {
      it("Should return a token", () => {
        const repository = new AuthRepository();
        const userManager = new FakeUserManager();
        const controller = new AuthController(repository, userManager);
        controller.loginUseCase("admin", "admin");
        expect(repository.getToken()).toBe("token");
      });
    });
  });
});
