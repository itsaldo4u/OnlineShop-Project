import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

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

const products = [
  {
    id: "p1",
    img: "men-skin-care.jpg",
    title: "Cleanser Amino Men",
    description: "Formula me aminoacide pastron pa e tharë lëkurën.",
    price: "€24.99",
    tags: ["Pastrim i thellë", "Hidratim dhe freski", "E butë me lëkurën"],
    rating: 4.8,
    discount: "10% OFF",
  },
  {
    id: "p2",
    img: "krem.webp",
    title: "Krem Hidratues",
    description: "Krem i pasur me vitamina për fytyrë të shëndetshme.",
    price: "€19.99",
    tags: ["Hidratim", "Mbrojtje UV", "Anti-rrudhë"],
    rating: 4.6,
  },
  {
    id: "p3",
    img: "shampo.jpg",
    title: "Shampo Bimore",
    description: "Shampo pa sulfate me përbërës natyralë.",
    price: "€14.99",
    tags: ["Pa sulfate", "Fortësim flokësh", "Aromë freskuese"],
    rating: 4.2,
    discount: "15% OFF",
  },
  {
    id: "p4",
    img: "vaj.webp",
    title: "Serum për mjekër",
    description: "Rritje dhe mbushje e qimeve të mjekrës me 100% vaj natyral.",
    price: "€22.49",
    tags: ["Rritje natyrale", "Vitaminë E", "Nuk irriton lëkurën"],
    rating: 4.9,
  },
  {
    id: "p5",
    img: "naturalskincare.jpg",
    title: "Scrub Fytyre",
    description: "Eksfoliues i butë për lëkurë të freskët dhe të pastër.",
    price: "€16.99",
    tags: ["Hiq qelizat e vdekura", "Butësi", "Efekt pastrues"],
    rating: 4.5,
  },
  {
    id: "p6",
    img: "care products.jpg",
    title: "Locion Trupi",
    description: "Locion i lehtë me përbërës hidratues për lëkurë të butë.",
    price: "€12.99",
    tags: ["Lëkurë më e butë", "Aromë relaksuese", "Përditshëm"],
    rating: 4.3,
    discount: "20% OFF",
  },
  {
    id: "p7",
    img: "JeanPaul.png",
    title: "Jean Paul Gaultier Le Male",
    description:
      "Parfum ikonik me nota vanilje, nenexhik dhe lavandë për një aromë të parezistueshme dhe elegante.",
    price: "€59.99",
    tags: ["Aromë e qëndrueshme", "Për meshkuj", "Klasik modern"],
    rating: 4.9,
  },
  {
    id: "p8",
    img: "burberry.jpeg",
    title: "Burberry Hero",
    description:
      "Parfum i guximshëm dhe modern me nota druri, kedri dhe bergamoti për një stil të fuqishëm dhe të sofistikuar.",
    price: "€69.99",
    tags: ["Aromë drunore", "Stil modern", "Për meshkuj"],
    rating: 4.7,
    discount: "10% OFF",
  },
];

const filters = [
  { key: "all", label: "Të gjitha" },
  { key: "hidratim", label: "Hidratim" },
  { key: "pastrim", label: "Pastrim" },
  { key: "natyral", label: "Natyral" },
  { key: "discount", label: "Oferta" },
  { key: "parfum", label: "Parfume" },
];

export default function ProductList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(products);

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
    let result = [...products];

    // Apply search filter
    if (query) {
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedFilter !== "all") {
      if (selectedFilter === "discount") {
        result = result.filter((product) => product.discount);
      } else {
        result = result.filter(
          (product) =>
            product.tags.some((tag) =>
              tag.toLowerCase().includes(selectedFilter)
            ) ||
            product.title.toLowerCase().includes(selectedFilter) ||
            product.description.toLowerCase().includes(selectedFilter)
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
    <div
      style={{
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "100vh",
        padding: "30px 20px",
        position: "relative",
      }}
    >
      {/* Header with cart icon */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            position: "relative",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            transition: "transform 0.3s",
            transform: cartAnimation === "pulse" ? "scale(1.2)" : "scale(1)",
          }}
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
          {totalItems > 0 && (
            <span
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                backgroundColor: "#ff3860",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            height: "100vh",
            width: "350px",
            backgroundColor: "#1e1e2f",
            boxShadow: "-5px 0 15px rgba(0,0,0,0.3)",
            zIndex: 1000,
            padding: "20px",
            overflowY: "auto",
            transition: "transform 0.3s ease",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              paddingBottom: "15px",
              borderBottom: "1px solid #2c2c40",
            }}
          >
            <h2
              style={{
                margin: "0",
                fontSize: "1.3rem",
              }}
            >
              Shporta ({totalItems})
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#aab0bc",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
            >
              ×
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {cartItems.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px 0",
                  color: "#aab0bc",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🛒</div>
                <p>Shporta juaj është bosh</p>
              </div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "1px solid #2c2c40",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "5px",
                        objectFit: "cover",
                        marginRight: "15px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 5px 0", fontSize: "0.9rem" }}>
                        {item.title}
                      </h4>
                      <div style={{ fontSize: "0.9rem", color: "#007bff" }}>
                        {item.price}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        style={{
                          width: "25px",
                          height: "25px",
                          background: "#2c2c40",
                          border: "none",
                          borderRadius: "3px",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </button>
                      <span style={{ margin: "0 10px", fontSize: "0.9rem" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        style={{
                          width: "25px",
                          height: "25px",
                          background: "#2c2c40",
                          border: "none",
                          borderRadius: "3px",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ff3860",
                          cursor: "pointer",
                          marginLeft: "10px",
                          fontSize: "1.1rem",
                        }}
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
            <div style={{ marginTop: "auto", paddingTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                  fontSize: "1rem",
                }}
              >
                <span>Totali:</span>
                <span style={{ fontWeight: "bold" }}>
                  €{totalPrice.toFixed(2)}
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={clearCart}
                  style={{
                    flex: "1",
                    padding: "10px",
                    background: "#2c2c40",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Pastro
                </button>
                <button
                  style={{
                    flex: "2",
                    padding: "10px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Vazhdo në Arkë
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Search results heading */}
      {query && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "500",
              color: "#e0e0e0",
            }}
          >
            Rezultatet e kërkimit për:{" "}
            <span style={{ color: "#007bff" }}>{query}</span>
          </h2>
        </div>
      )}

      {/* Filter and Sort Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "25px",
          padding: "15px 20px",
          borderRadius: "10px",
          backgroundColor: "#1e1e2f",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {/* Category filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            margin: "10px 0",
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "0.9rem",
                border: "none",
                cursor: "pointer",
                backgroundColor:
                  selectedFilter === filter.key ? "#007bff" : "#2c2c40",
                color: selectedFilter === filter.key ? "white" : "#aab0bc",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                if (selectedFilter !== filter.key) {
                  e.currentTarget.style.backgroundColor = "#353550";
                }
              }}
              onMouseOut={(e) => {
                if (selectedFilter !== filter.key) {
                  e.currentTarget.style.backgroundColor = "#2c2c40";
                }
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort options */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "10px 0",
          }}
        >
          <label style={{ fontSize: "0.9rem", color: "#aab0bc" }}>
            Rendit sipas:
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              border: "none",
              backgroundColor: "#2c2c40",
              color: "white",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="default">Parazgjedhur</option>
            <option value="price-low">Çmimi: I ulët - I lartë</option>
            <option value="price-high">Çmimi: I lartë - I ulët</option>
            <option value="rating">Vlerësimi</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "25px",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ProductCard
                id={product.id}
                img={product.img}
                title={product.title}
                description={product.description}
                price={product.price}
                tags={product.tags}
                rating={product.rating}
                discount={product.discount}
                onAddToCart={() => addToCart(product)}
              />
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "40px 20px",
              backgroundColor: "#1e1e2f",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>😕</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              Nuk u gjet asnjë produkt
            </h3>
            <p style={{ color: "#aab0bc", fontSize: "1rem" }}>
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
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Reset Filtrave
            </button>
          </div>
        )}
      </div>

      {/* Product count */}
      {filteredProducts.length > 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#aab0bc",
            fontSize: "0.9rem",
          }}
        >
          Duke shfaqur {filteredProducts.length} produkte nga {products.length}
        </div>
      )}
    </div>
  );
}
