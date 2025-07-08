// src/pages/UserDashboard.tsx
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard: React.FC = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    password: currentUser?.password || "",
  });

  // Redirect if no user
  if (!currentUser) {
    navigate("/login");
    return null;
  }

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch user's orders from backend and filter by current user's email (case-insensitive)
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/order`);
      const userOrders = res.data.filter(
        (order: any) =>
          order.customer.email.trim().toLowerCase() ===
          currentUser.email.trim().toLowerCase()
      );
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Save updated user data to backend
  const handleSave = async () => {
    const updatedUser = { ...currentUser, ...formData };
    try {
      await axios.put(
        `http://localhost:3000/users/${currentUser.id}`,
        updatedUser
      );
      setCurrentUser(updatedUser);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div
      className="container-fluid p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className="card shadow-sm mb-4 border-0">
            <div className="card-body p-4 d-flex justify-content-between align-items-center">
              <div>
                <h2 className="card-title mb-2 text-dark fw-bold">User</h2>
                <p className="card-text text-muted mb-0">My Information</p>
              </div>
              <div>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-outline-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    navigate("/login");
                  }}
                  className="btn btn-danger ms-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <p>
                <strong>Name:</strong> {currentUser.name}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p>
                <strong>Role:</strong> {currentUser.role}
              </p>
            </div>
          </div>

          {/* Orders Section */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="fw-bold mb-3">My Orders</h4>
              {orders.length === 0 ? (
                <p className="text-muted">No orders recorded.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Products</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        const total = order.products.reduce(
                          (sum: number, p: any) =>
                            sum + Number(p.price) * p.quantity,
                          0
                        );
                        return (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>
                              <span className="badge bg-success text-capitalize">
                                {order.status}
                              </span>
                            </td>
                            <td>
                              {order.products.map((p: any) => (
                                <div key={p.id}>
                                  {p.title} × {p.quantity}
                                </div>
                              ))}
                            </td>
                            <td>{total.toFixed(2)} €</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header bg-primary text-white border-0">
                  <h5 className="modal-title fw-semibold">Edit User</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer bg-light border-0">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
