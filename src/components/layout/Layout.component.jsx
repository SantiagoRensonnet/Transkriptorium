import { Header } from "./Header.component";
import { Footer } from "./Footer.component";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
