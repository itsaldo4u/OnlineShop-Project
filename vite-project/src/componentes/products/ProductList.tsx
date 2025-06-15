import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

type CartItem = {
  id: string;
  title: string;
  price: string;
  quantity: number;
  img: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const filters = [
  { key: "all", label: "Të gjitha" },
  { key: "hidratim", label: "Hidratim" },
  { key: "pastrim", label: "Pastrim" },
  { key: "natyral", label: "Natyral" },
  { key: "discount", label: "Oferta" },
  { key: "parfum", label: "Parfume" },
];

export default function ProductList() {
  const { productdata } = useAppContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(productdata);

  // Shopping cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState("");

  // Add to cart function
  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Increase quantity if item exists
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.img,
            quantity: 1,
          },
        ];
      }
    });

    // Show cart after adding item
    setIsCartOpen(true);

    // Animate cart icon
    setCartAnimation("pulse");
    setTimeout(() => setCartAnimation(""), 500);
  };

  // Remove from cart function
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update quantity function
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + itemPrice * item.quantity;
  }, 0);

  // Filter and sort products when query, filter or sort option changes
  useEffect(() => {
    let result = [...productdata];

    // Apply search filter
    if (query) {
      result = result.filter(
        (productdata) =>
          productdata.title.toLowerCase().includes(query) ||
          productdata.description.toLowerCase().includes(query) ||
          productdata.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedFilter !== "all") {
      if (selectedFilter === "discount") {
        result = result.filter((productdata) => productdata.discount);
      } else if (selectedFilter === "parfum") {
        result = result.filter(
          (productdata) =>
            Array.isArray(productdata.tags) &&
            productdata.tags.some((tag) => tag.includes("parfum"))
        );
      } else if (selectedFilter === "hidratim") {
        result = result.filter(
          (productdata) =>
            Array.isArray(productdata.tags) &&
            productdata.tags.some((tag) =>
              tag.toLowerCase().includes("hidratim")
            )
        );
      } else if (selectedFilter === "natyral") {
        result = result.filter(
          (productdata) =>
            Array.isArray(productdata.tags) &&
            productdata.tags.some((tag) =>
              tag.toLowerCase().includes("natyral")
            )
        );
      } else if (selectedFilter === "pastrim") {
        result = result.filter(
          (productdata) =>
            Array.isArray(productdata.tags) &&
            productdata.tags.some((tag) =>
              tag.toLowerCase().includes("pastrim")
            )
        );
      }
    }

    // Apply sorting
    if (sortOption === "price-low") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return priceA - priceB;
      });
    } else if (sortOption === "price-high") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return priceB - priceA;
      });
    } else if (sortOption === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredProducts(result);
  }, [query, selectedFilter, sortOption]);

  return (
    <div className="product-list-container">
      {/* Header with cart icon */}
      <div className="cart-header">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className={`cart-button ${cartAnimation ? cartAnimation : "normal"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </button>
      </div>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer">
          <div className="cart-header-section">
            <h2 className="cart-title">Shporta ({totalItems})</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="close-cart-button"
            >
              ×
            </button>
          </div>

          <div className="cart-items-container">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <p>Shporta juaj është bosh</p>
              </div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h4 className="cart-item-title">{item.title}</h4>
                      <div className="cart-item-price">{item.price}</div>
                    </div>
                    <div className="cart-item-actions">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="quantity-button"
                      >
                        -
                      </button>
                      <span className="quantity-text">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="quantity-button"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-item-button"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Totali:</span>
                <span style={{ fontWeight: "bold" }}>
                  €{totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="cart-actions">
                <button onClick={clearCart} className="clear-cart-button">
                  Pastro
                </button>
                <button className="checkout-button">Vazhdo në Arkë</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      )}

      {/* Search results heading */}
      {query && (
        <div className="search-results-heading">
          <h2 className="search-results-title">
            Rezultatet e kërkimit për:{" "}
            <span className="search-query">{query}</span>
          </h2>
        </div>
      )}

      {/* Filter and Sort Controls */}
      <div className="filter-sort-container">
        {/* Category filters */}
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`filter-button ${
                selectedFilter === filter.key ? "active" : "inactive"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort options */}
        <div className="sort-container">
          <label className="sort-label">Rendit sipas:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="default">Parazgjedhur</option>
            <option value="price-low">Çmimi: I ulët - I lartë</option>
            <option value="price-high">Çmimi: I lartë - I ulët</option>
            <option value="rating">Vlerësimi</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card-container">
              <ProductCard
                id={product.id}
                img={product.img}
                title={product.title}
                description={product.description}
                price={product.price}
                tags={product.tags}
                rating={product.rating}
                discount={product.discount}
                isNew={product.isNew} // Make sure to pass isNew property here!
                onAddToCart={() => addToCart(product)}
              />
            </div>
          ))
        ) : (
          <div className="no-products-found">
            <div className="no-products-emoji">😕</div>
            <h3 className="no-products-title">Nuk u gjet asnjë produkt</h3>
            <p className="no-products-message">
              Nuk u gjet asnjë produkt për: <strong>{query}</strong>
              {selectedFilter !== "all" && (
                <>
                  {" "}
                  me filtrin: <strong>{selectedFilter}</strong>
                </>
              )}
            </p>
            <button
              onClick={() => {
                setSelectedFilter("all");
                setSortOption("default");
              }}
              className="reset-filters-button"
            >
              Reset Filtrave
            </button>
          </div>
        )}
      </div>

      {/* Product count */}
      {filteredProducts.length > 0 && (
        <div className="product-count">
          Duke shfaqur {filteredProducts.length} produkte nga{" "}
          {productdata.length}
        </div>
      )}
    </div>
  );
}
