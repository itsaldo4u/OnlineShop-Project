import { useState, useEffect } from "react";
import axios from "axios";
import "./KontaktForm.css";

const BasicContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contact");
      setSubmissions(response.data);
    } catch (err) {
      console.error("Error fetching contact submissions:", err);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const newContact = {
        id: Date.now(),
        name,
        email,
        message,
        date: new Date().toISOString(),
      };

      await axios.post("http://localhost:3000/contact", newContact);

      setSuccess("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");

      fetchSubmissions();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Contact Us</h1>
        <p>We are here to help you with any questions you have.</p>
      </div>

      <div className="contact-section">
        <div className="content">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div>
              <h3>Address</h3>
              <p>Skenderbeu St, No 15, Tirana, Albania</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>info@company.com</p>
            </div>
            <div>
              <h3>Phone</h3>
              <p>+355 69 123 4567</p>
            </div>
            <div>
              <h3>Working Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 10:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>

            {success && <div className="success">{success}</div>}
            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label className="label">Name</label>
                <input
                  className="input-field"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label className="label">Email</label>
                <input
                  className="input-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label className="label">Message</label>
                <textarea
                  className="textarea-field"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="button">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <h3>How quickly will I get a response?</h3>
            <p>We aim to reply within 24 hours on business days.</p>
          </div>

          <div className="faq-item">
            <h3>How can I cancel an order?</h3>
            <p>
              You can cancel an order by contacting us via email or phone within
              24 hours of purchase.
            </p>
          </div>

          <div>
            <h3>Does your company offer fast delivery?</h3>
            <p>
              Yes, we offer fast delivery for all orders in Tirana and
              surrounding areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicContactPage;
