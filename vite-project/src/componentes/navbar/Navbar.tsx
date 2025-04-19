const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  fixed-top bg-dark ">
      <div className="container justify-content-center">
        <img
          src="shopping.png"
          alt=""
          style={{
            width: "25px",
            height: "25px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <a className="navbar-brand text-white" href="/">
          iShopping
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav ">
            <a
              className="nav-link active text-white"
              aria-current="page"
              href="/home"
            >
              Home
            </a>
            <a className="nav-link text-white" href="/about">
              About
            </a>
            <a className="nav-link text-white" href="/contact">
              Contact
            </a>
            <a className="nav-link text-white" href="/product">
              Product
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
