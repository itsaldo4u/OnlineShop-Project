import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../componentes/navbar/Navbar";
import Footer from "../componentes/footer/Footer";
import WelcomeForm from "../componentes/welcome/WelcomeForm";

export default function DefaultPage() {
  const location = useLocation(); // Get the current route

  return (
    <>
      <Navbar />
      {location.pathname === "/" && <WelcomeForm />}
      <Outlet />
      <Footer />
    </>
  );
}
