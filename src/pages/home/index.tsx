import { authController } from "../../auth";

export const Home = () => {
  const logout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await authController.logoutUseCase();
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};
