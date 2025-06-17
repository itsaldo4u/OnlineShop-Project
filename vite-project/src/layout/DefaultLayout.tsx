import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../componentes/navbar/Navbar";
import Footer from "../componentes/footer/Footer";
import WelcomeForm from "../componentes/welcome/WelcomeForm";

export default function DefaultLayout() {
  const { pathname } = useLocation();
  const showWelcome = pathname === "/" || pathname === "/home";

  return (
    <>
      <Navbar />
      {showWelcome && <WelcomeForm />}
      <Outlet />
      <Footer />
    </>
  );
}
