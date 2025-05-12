import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface Product {
  product: string;
  type: string;
  price: number;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

interface AppContextType {
  product: Product[];
  contacts: Contact[];
  gettingData: () => Promise<void>;
  fetchContacts: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [product, setProduct] = useState<Product[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const gettingData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      console.log("Produktet:", response.data);
      setProduct(response.data);
    } catch (error) {
      console.error("Gabim me produktet:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contact");
      console.log("Kontaktet:", response.data);
      setContacts(response.data);
    } catch (error) {
      console.error("Gabim me kontaktet:", error);
    }
  };

  useEffect(() => {
    gettingData();
    fetchContacts();
  }, []);

  return (
    <AppContext.Provider
      value={{ product, contacts, gettingData, fetchContacts }}
    >
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
