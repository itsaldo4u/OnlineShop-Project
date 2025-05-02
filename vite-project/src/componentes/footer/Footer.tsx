import { useState } from "react";
import axios from "axios";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: "", type: null });

    try {
      const response = await axios.get("http://localhost:3000/subscribers");
      const subscribers = response.data;

      if (subscribers.some((sub: { email: string }) => sub.email === email)) {
        setStatus({
          message: "This email is already subscribed!",
          type: "error",
        });
        return;
      }

      await axios.post("http://localhost:3000/subscribers", {
        id: Date.now(),
        email: email,
        subscribedAt: new Date().toISOString(),
      });

      setStatus({
        message: "Thank you for subscribing!",
        type: "success",
      });
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus({
        message: "Something went wrong. Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <footer className="bg-dark text-light mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src="/shopping.png" alt="logo" width="25" height="25" />
              <h5 className="fw-bold mb-0">iShopping</h5>
            </div>

            <p className="text-light opacity-75 mb-4">
              Providing quality products and outstanding customer service since
              2020.
            </p>
            <div className="d-flex gap-3 mb-4">
              <a href="#" className="text-decoration-none text-light">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-decoration-none text-light">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-decoration-none text-light">
                <i className="bi bi-twitter-x fs-5"></i>
              </a>
              <a href="#" className="text-decoration-none text-light">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3 fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/about"
                  className="text-decoration-none text-light opacity-75 hover-opacity-100"
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/products"
                  className="text-decoration-none text-light opacity-75 hover-opacity-100"
                >
                  Products
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/contact"
                  className="text-decoration-none text-light opacity-75 hover-opacity-100"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3 fw-bold">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/faq"
                  className="text-decoration-none text-light opacity-75 hover-opacity-100"
                >
                  FAQ
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/shipping"
                  className="text-decoration-none text-light opacity-75 hover-opacity-100"
                >
                  Shipping
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/privacy"
                  className="text-decoration-none text-light opacity-75 hover-opacity-100"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="mb-3 fw-bold">Subscribe to our newsletter</h5>
            <p className="text-light opacity-75 mb-3">
              Get updates on new products and exclusive offers
            </p>
            <form onSubmit={handleSubscribe} className="mb-2">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </div>
              {status.message && (
                <div
                  className={`mt-2 text-${
                    status.type === "success" ? "success" : "danger"
                  } small`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="border-top border-secondary">
        <div className="container py-3 d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="text-light opacity-75">
            © {currentYear} i Shopping. All rights reserved.
          </div>
          <div className="d-flex gap-3 text-light">
            <i className="bi bi-credit-card fs-5" title="Credit Card"></i>
            <i className="bi bi-paypal fs-5" title="PayPal"></i>
            <i className="bi bi-wallet2 fs-5" title="Digital Wallet"></i>
            <i className="bi bi-bank fs-5" title="Bank Transfer"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
