import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

const LoginPage = () => {
  const { setCurrentUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/users");
      const user = res.data.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        setCurrentUser(user);
        setError("");

        if (user.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/userdashboard");
        }
      } else {
        setError("Incorrect email or password.");
      }
    } catch (err) {
      console.error("Error connecting to server:", err);
      setError("Error connecting to server.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3.2rem",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#eee",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.7)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: "700",
            fontSize: "1.8rem",
          }}
        >
          Login to Your Account
        </h2>

        {error && (
          <p
            style={{
              color: "#f44336",
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #333",
                backgroundColor: "#2c2c2c",
                color: "#eee",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3f51b5")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
            />
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #333",
                backgroundColor: "#2c2c2c",
                color: "#eee",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3f51b5")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: "12px",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#3f51b5",
              color: "#fff",
              fontWeight: "700",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#303f9f")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#3f51b5")
            }
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Don't have an account?
        </p>
        <div style={{ textAlign: "center" }}>
          <Link
            to="/signup"
            style={{
              color: "#7986cb",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "0.95rem",
              transition: "color 0.3s, text-decoration 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#c5cae9";
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#7986cb";
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
