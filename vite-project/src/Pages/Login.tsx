import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/contact?email=${email}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        localStorage.setItem("user", JSON.stringify(data[0]));
        navigate("/home");
      } else {
        setError("Email ose fjalëkalim i gabuar.");
      }
    } catch (err) {
      setError("Gabim në lidhje me serverin.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Hyr në llogari</h2>
        <p className="text-muted text-center">Plotëso të dhënat për të vazhduar</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="shkruaj email-in"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fjalëkalimi</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="shkruaj fjalëkalimin"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Hyr
          </button>
        </form>

        <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
          Nuk ke një llogari? <a href="/signup">Regjistrohu këtu</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
