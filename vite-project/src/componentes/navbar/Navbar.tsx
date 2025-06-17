import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navbarStyle = {
    minHeight: "60px",
    zIndex: 1050,
  };

  const logoStyle = {
    width: "25px",
    height: "25px",
    objectFit: "cover" as const,
    borderRadius: "8px",
    marginRight: "8px",
  };

  const brandStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold" as const,
  };

  const togglerStyle = {
    padding: "4px 8px",
    fontSize: "1.25rem",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const navLinkStyle = {
    transition: "all 0.3s ease",
    borderRadius: "4px",
    margin: "2px",
    padding: "8px 16px",
  };

  const collapseStyle = {
    backgroundColor: "rgba(33, 37, 41, 0.95)",
    marginTop: "10px",
    borderRadius: "8px",
    padding: "10px",
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      style={navbarStyle}
    >
      <div className="container-fluid px-3">
        {/* Brand section */}
        <div className="d-flex align-items-center">
          <img src="shopping.png" alt="iShopping Logo" style={logoStyle} />
          <Link className="navbar-brand text-white" to="/" style={brandStyle}>
            iShopping
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
          aria-controls="navbarNavAltMarkup"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
          style={togglerStyle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarNavAltMarkup"
          style={isNavOpen ? collapseStyle : {}}
        >
          <div className="navbar-nav ms-auto text-center">
            {["home", "about", "contact", "product"].map((path) => (
              <Link
                key={path}
                className="nav-link text-white"
                to={`/${path}`}
                onClick={() => setIsNavOpen(false)}
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            ))}

            {/* Log In (link te /login) */}
            <Link
  className="nav-link text-white"
  to="/login"
  onClick={() => setIsNavOpen(false)}
  style={navLinkStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
    e.currentTarget.style.boxShadow = "0 0 8px rgba(0, 255, 0, 0.5)";
    e.currentTarget.style.transform = "translateY(-1px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  Log In
</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
