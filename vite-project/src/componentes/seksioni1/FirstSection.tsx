import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FirstSection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState<string>(urlQuery);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentParams = new URLSearchParams(location.search);

    if (query.trim() !== "") {
      currentParams.set("q", query.trim());
    } else {
      currentParams.delete("q");
    }

    navigate(`/products?${currentParams.toString()}`);
  };

  return (
    <section
      style={{
        color: "white",
        width: "100%",
        backgroundImage: 'url("/seksioni 1.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <form onSubmit={handleSearch}>
        <div
          className="search-container position-relative"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50px",
            padding: "10px 20px",
            maxWidth: "500px",
            width: "120%",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            marginTop: "220px",
          }}
          onClick={() => setIsFocused(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              color: "white",
              position: "absolute",
              left: "35px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            type="search"
            placeholder="Search your product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              flexGrow: 1,
              padding: "8px 15px 8px 45px",
              fontSize: "1rem",
              border: "2px solid rgba(255, 255, 255, 0.5)",
              borderRadius: "20px",
              background: isFocused
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(255, 255, 255, 0.1)",
              color: "white",
              outline: "none",
              transition: "all 0.3s ease-in-out",
              width: isFocused ? "100%" : "80%",
              boxShadow: "none",
            }}
          />

          {isFocused && (
            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "50px",
                padding: "10px 20px",
                border: "none",
                marginLeft: "10px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Search
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default FirstSection;
