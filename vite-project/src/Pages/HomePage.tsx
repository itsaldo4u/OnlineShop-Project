import HomeCarusel from "../componentes/carusel/HomeCarusel";
import KontaktForm from "../componentes/kontakt/KontaktForm";
import ProductList from "../componentes/products/ProductList";
import FeedbackSection from "../componentes/seksioni1/FeedBack";
import FirstSection from "../componentes/seksioni1/FirstSection";
import AboutPage from "./AboutPage";

export default function HomePAge() {
  return (
    <>
      <FirstSection />
      <HomeCarusel />
      <FeedbackSection />
      <ProductList />
      <AboutPage />
      <KontaktForm />
    </>
  );
}
