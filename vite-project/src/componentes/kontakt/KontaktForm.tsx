import React, { useState, useEffect } from "react";
import axios from "axios";
import "./KontaktForm.css";

const BasicContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState([]);

  // Fetch existing contact submissions when component mounts
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
      // Create new contact message object
      const newContact = {
        id: Date.now(),
        name,
        email,
        message,
        date: new Date().toISOString(),
      };

      // Post to JSON server
      await axios.post("http://localhost:3000/contact", newContact);

      // Update UI
      setSuccess("Mesazhi u dërgua me sukses!");
      setName("");
      setEmail("");
      setMessage("");

      // Refresh submissions list
      fetchSubmissions();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Ka ndodhur një gabim. Ju lutemi provoni përsëri.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Na Kontaktoni</h1>
        <p>Ne jemi këtu për t'ju ndihmuar me çdo pyetje që keni.</p>
      </div>

      <div className="contact-section">
        <div className="content">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Informacione Kontakti</h2>
            <div>
              <h3>Adresa</h3>
              <p>Rr. Skenderbeu, Nr 15, Tiranë, Shqipëri</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>info@kompania.com</p>
            </div>
            <div>
              <h3>Telefon</h3>
              <p>+355 69 123 4567</p>
            </div>
            <div>
              <h3>Orari i Punës</h3>
              <p>E Hënë - E Premte: 9:00 - 17:00</p>
              <p>E Shtunë: 10:00 - 14:00</p>
              <p>E Dielë: Mbyllur</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Na dërgoni një mesazh</h2>

            {success && <div className="success">{success}</div>}
            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label className="label">Emri</label>
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
                <label className="label">Mesazhi</label>
                <textarea
                  className="textarea-field"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="button">
                {isSubmitting ? "Duke dërguar..." : "Dërgo Mesazhin"}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Pyetje të Shpeshta</h2>

          <div className="faq-item">
            <h3>Sa shpejt do të merrni përgjigje?</h3>
            <p>
              Ne synojmë t'ju përgjigjemi brenda 24 orëve gjatë ditëve të punës.
            </p>
          </div>

          <div className="faq-item">
            <h3>Si mund të anuloj një porosi?</h3>
            <p>
              Ju mund të anuloni një porosi duke na kontaktuar me email ose
              telefon brenda 24 orëve nga blerja.
            </p>
          </div>

          <div>
            <h3>A ofron kompania juaj dërgesë të shpejtë?</h3>
            <p>
              Po, ne ofrojmë dërgesë të shpejtë për të gjitha porositë në Tiranë
              dhe rrethinat e saj.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicContactPage;
