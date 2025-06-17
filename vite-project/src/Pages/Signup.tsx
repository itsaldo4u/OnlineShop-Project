import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { name, email, password, comment: "" };

    try {
      const res = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        navigate("/login");
      } else {
        setError("Nuk u regjistrua. Kontrollo të dhënat.");
      }
    } catch (err) {
      setError("Gabim gjatë regjistrimit.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Regjistrohu</h2>
        <p className="text-muted text-center">Krijo një llogari të re</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Emri</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Shkruaj emrin"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Shkruaj email-in"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fjalëkalimi</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Shkruaj fjalëkalimin"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Krijo Llogari
          </button>
        </form>

        <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
          Ke një llogari? <a href="/login">Hyr</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
