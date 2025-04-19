import React, { useState } from "react";
import axios from "axios";

// Komponent për Inputin
const InputField: React.FC<{
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, type, label, value, onChange }) => (
  <div className="form-floating mb-2">
    <input
      type={type}
      className="form-control"
      id={id}
      placeholder={label}
      value={value}
      onChange={onChange}
      style={{
        padding: "8px",
        borderRadius: "5px",
        border: "1.5px solid #ccc",
        transition: "all 0.3s ease",
        fontSize: "0.9rem",
      }}
    />
    <label htmlFor={id} style={{ fontSize: "0.85rem" }}>
      {label}
    </label>
  </div>
);

const KontaktForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (!name || !email || !password || !comment) {
      return "Të gjitha fushat janë të detyrueshme.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Ju lutem jepni një email të vlefshëm.";
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");

    const formData = { name, email, password, comment };
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/contact",
        formData
      );
      setSuccessMessage("Mesazhi u dërgua me sukses!");
      setName("");
      setEmail("");
      setPassword("");
      setComment("");
    } catch (err) {
      setErrorMessage("Ndodhi një gabim gjatë dërgimit të të dhënave.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container" style={styles.container}>
      <h2 style={styles.title}>Na Kontaktoni</h2>

      {successMessage && (
        <div className="alert alert-success" style={styles.successMessage}>
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" style={styles.errorMessage}>
          {errorMessage}
        </div>
      )}

      <div className="form" style={styles.form}>
        <InputField
          id="floatingName"
          type="text"
          label="Emri"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          id="floatingEmail"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="floatingPassword"
          type="password"
          label="Fjalëkalimi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mb-2">
          <textarea
            className="form-control"
            id="floatingComment"
            placeholder="Koment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1.5px solid #ccc",
              transition: "all 0.3s ease",
              fontSize: "0.9rem",
            }}
          ></textarea>
          <label htmlFor="floatingComment" style={{ fontSize: "0.85rem" }}>
            Koment
          </label>
        </div>

        <div className="d-flex justify-content-center mt-2">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? "#28a745" : "#007bff",
              padding: "8px 20px",
              borderRadius: "30px",
              fontSize: "0.95rem",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Dërgo"
            )}
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "370px",
    margin: "0 auto",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
    animation: "fadeIn 0.7s ease-in-out",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "1.4rem",
    fontWeight: "bold",
  },
  form: {
    marginBottom: "10px",
  },
  successMessage: {
    padding: "8px 12px",
    fontSize: "0.85rem",
    borderRadius: "6px",
    marginBottom: "12px",
  },
  errorMessage: {
    padding: "8px 12px",
    fontSize: "0.85rem",
    borderRadius: "6px",
    marginBottom: "12px",
  },
};

export default KontaktForm;
