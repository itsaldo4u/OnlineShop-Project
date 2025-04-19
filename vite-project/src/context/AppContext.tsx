import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
interface Product {
  product: string;
  type: string;
  price: number;
}
interface AppContextType {
  product: Product[];
  gettingData: () => Promise<void>;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

interface MarketingType {
  name: string;
  title: string;
  contact: number;
}
// interface AppContextType {
//   marketing: Marketing[];
//   gettingData: () => Promise<void>;
// }
// const Marketing = createContext<MarketingType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [product, setProduct] = useState([]);
  const [marketing, setMarketing] = useState([]);

  const gettingData = async () => {
    const response = await axios.get("http://localhost:3000/data");
    const productRes = response.data;
    setProduct(productRes);
  };
  const getMarketing = async () => {
    const response = await axios.get("http://localhost:3000/marketing");
    const marketingRes = response.data;
    setMarketing(marketingRes);
  };

  useEffect(() => {
    gettingData();
  }, []);
  useEffect(() => {
    getMarketing();
  }, []);
  return (
    <AppContext.Provider value={{ product, marketing, gettingData }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
