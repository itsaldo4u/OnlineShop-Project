import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface Product {
  product: string;
  type: string;
  price: number;
}

interface MarketingType {
  name: string;
  title: string;
  contact: number;
}

interface AppContextType {
  product: Product[];
  marketing: MarketingType[];
  gettingData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [product, setProduct] = useState<Product[]>([]);
  const [marketing, setMarketing] = useState<MarketingType[]>([]);

  const gettingData = async () => {
    const response = await axios.get("http://localhost:3000/data");
    setProduct(response.data);
  };

  const getMarketing = async () => {
    const response = await axios.get("http://localhost:3000/marketing");
    setMarketing(response.data);
  };

  useEffect(() => {
    gettingData();
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
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
