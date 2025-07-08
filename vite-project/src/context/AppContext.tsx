import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Users = {
  order: ReactNode;
  firstName: ReactNode;
  lastName: ReactNode;
  address: ReactNode;
  id: string; // <-- ndryshuar në string për përputhje me rating.userId
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

type Customer = {
  [x: string]: any;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber?: string;
};

type Product = {
  id: string;
  title: string;
  price: string;
  img: string;
  quantity: number;
};

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

export type Order = {
  id: string;
  customer: Customer;
  products: Product[];
  date: string;
  status: OrderStatus;
  [key: string]: any;
};

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

type Rating = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
};

type AppContextType = {
  Users: Users[];
  contacts: Contact[];
  productdata: ProductData[];
  Rating: Rating[];
  fetchRatings: () => Promise<void>;
  updateRating: (id: string, rating: number) => Promise<void>;
  fetchUsers: () => Promise<void>;
  currentUser: Users | null;
  setCurrentUser: (user: Users | null) => void;
  deleteUser: (id: string) => Promise<void>;
  updateUserRole: (id: string, role: "admin" | "user") => Promise<void>;

  order: Order[];
  fetchContacts: () => Promise<void>;
  fetchProductData: () => Promise<void>;
  fetchOrder: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addProduct: (product: ProductData) => Promise<void>;
  updateProduct: (updated: ProductData) => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  updateOrder: (id: string, updatedOrder: Order) => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [productdata, setProductdata] = useState<ProductData[]>([]);
  const [Rating, setUserRating] = useState<Rating[]>([]);
  const [Users, setUsers] = useState<Users[]>([]);
  const [_currentUser, _setCurrentUser] = useState<Users | null>(null);
  const [order, setOrder] = useState<Order[]>([]);

  // Orders
  const fetchOrder = async () => {
    try {
      const response = await axios.get("http://localhost:3000/order");
      setOrder(response.data);
    } catch (error) {
      console.error("Gabim me datat e Order", error);
    }
  };

  // Contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contact");
      setContacts(response.data);
    } catch (error) {
      console.error("Gabim me kontaktet:", error);
    }
  };

  // Products
  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/productdata");
      setProductdata(response.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së produkteve:", err);
    }
  };

  // Ratings
  const fetchRatings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/rating");
      setUserRating(response.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së ratingut:", err);
    }
  };

  const updateRating = async (id: string, rating: number) => {
    try {
      await axios.post("http://localhost:3000/rating", { id, rating });
      await fetchRatings();
    } catch (err) {
      console.error("Gabim gjatë ruajtjes së ratingut:", err);
      throw err;
    }
  };

  // Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së përdoruesve:", err);
    }
  };

  const setCurrentUser = (user: Users | null) => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
    _setCurrentUser(user);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        _setCurrentUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  // Product operations
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

  // Order operations
  const addOrder = async (newOrder: Order) => {
    try {
      await axios.post("http://localhost:3000/order", newOrder);
      await fetchOrder();
    } catch (err) {
      console.error("Gabim gjatë shtimit të porosisë:", err);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/order/${id}`);
      await fetchOrder();
    } catch (err) {
      console.error("Gabim gjatë fshirjes së porosisë:", err);
    }
  };

  const updateOrder = async (id: string, updatedOrder: Order) => {
    try {
      await axios.put(`http://localhost:3000/order/${id}`, updatedOrder);
      await fetchOrder();
    } catch (err) {
      console.error("Gabim gjatë përditësimit të porosisë:", err);
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      const existingOrder = order.find((o) => o.id === id);
      if (!existingOrder) return;

      const updatedOrder = { ...existingOrder, status };
      await axios.put(`http://localhost:3000/order/${id}`, updatedOrder);
      await fetchOrder();
    } catch (err) {
      console.error("Gabim gjatë përditësimit të statusit të porosisë:", err);
    }
  };

  // User operations
  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      await fetchUsers();
    } catch (err) {
      console.error("Gabim gjatë fshirjes së përdoruesit:", err);
    }
  };

  const updateUserRole = async (id: string, role: "admin" | "user") => {
    try {
      await axios.patch(`http://localhost:3000/users/${id}`, { role });
      await fetchUsers();
    } catch (err) {
      console.error("Gabim gjatë përditësimit të rolit:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchProductData();
    fetchUsers();
    fetchRatings();
    fetchOrder();
  }, []);

  return (
    <AppContext.Provider
      value={{
        Users,
        order,
        contacts,
        productdata,
        Rating,
        fetchRatings,
        updateRating,
        fetchContacts,
        fetchProductData,
        fetchUsers,
        deleteProduct,
        addProduct,
        updateProduct,
        currentUser: _currentUser,
        setCurrentUser,

        fetchOrder,

        addOrder,
        deleteOrder,
        updateOrderStatus,
        updateOrder,
        deleteUser,
        updateUserRole,
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
