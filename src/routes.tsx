import { redirect } from "react-router-dom";
import { authController, authPresenter } from "./auth";
import { Home } from "./pages";

export const routes = [
  {
    path: "/",
    Component: Home,
    loader: async () => {
      await authController.loginUseCase();
      return null;
    },
  },
  {
    path: "/signed-in",
    Component: Home,
    loader: async () => {
      try {
        authPresenter.loginCallbackUseCase();
      } finally {
        return redirect("/");
      }
    },
  },
  {
    path: "/signed-out",
    loader: async () => {
      await authPresenter.logoutCallbackUseCase();
      return redirect("/");
    },
  },
];
