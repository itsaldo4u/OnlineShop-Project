import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
};

export type ProductData = {
  id: string;
  img: string;
  title: string;
  description: string;
  price: string;
  tags: string[];
  filterTags: string[];
  rating?: number;
  discount?: string;
  isNew?: boolean;
};

type AppContextType = {
  contacts: Contact[];
  productdata: ProductData[];
  fetchContacts: () => Promise<void>;
  fetchProductData: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addProduct: (product: ProductData) => Promise<void>;
  updateProduct: (updated: ProductData) => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [productdata, setProductdata] = useState<ProductData[]>([]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contact");
      setContacts(response.data);
    } catch (error) {
      console.error("Gabim me kontaktet:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/productdata");
      setProductdata(response.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së produkteve:", err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/productdata/${id}`);
      await fetchProductData();
    } catch (err) {
      console.error("Gabim gjatë fshirjes së produktit:", err);
    }
  };

  const addProduct = async (product: ProductData) => {
    try {
      await axios.post("http://localhost:3000/productdata", product);
      await fetchProductData();
    } catch (err) {
      console.error("Gabim gjatë shtimit të produktit:", err);
    }
  };

  const updateProduct = async (updated: ProductData) => {
    try {
      await axios.put(
        `http://localhost:3000/productdata/${updated.id}`,
        updated
      );
      await fetchProductData();
    } catch (err) {
      console.error("Gabim gjatë përditësimit të produktit:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchProductData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        contacts,
        productdata,
        fetchContacts,
        fetchProductData,
        deleteProduct,
        addProduct,
        updateProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext duhet të përdoret brenda AppProvider");
  }
  return context;
};
