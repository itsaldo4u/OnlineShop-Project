import React, { useState } from "react";
import {
  Package,
  User,
  Calendar,
  Trash2,
  Search,
  Filter,
  Plus,
} from "lucide-react";

type OrderStatus = "Krijuar" | "Konfirmuar" | "Shipped" | "Delivered";

type Order = {
  id: string;
  customerName: string;
  productTitle: string;
  quantity: number;
  status: OrderStatus;
  createdAt: Date;
  adress: string;
  phone: string;
  totalPrice?: number;
};

const orderStatuses: OrderStatus[] = [
  "Krijuar",
  "Konfirmuar",
  "Shipped",
  "Delivered",
];

const statusColors: Record<OrderStatus, string> = {
  Krijuar: "border-secondary bg-secondary bg-opacity-10 text-secondary",
  Konfirmuar: "border-primary bg-primary bg-opacity-10 text-primary",
  Shipped: "border-warning bg-warning bg-opacity-10 text-warning",
  Delivered: "border-success bg-success bg-opacity-10 text-success",
};

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      customerName: "Arber Krasniqi",
      productTitle: "MacBook Pro M3",
      quantity: 1,
      status: "Delivered",
      createdAt: new Date("2024-01-15"),
      totalPrice: 2500,
      adress: "Tirana",
      phone: "+355696969696",
    },
  ]);

  const [newOrder, setNewOrder] = useState<{
    customerName: string;
    productTitle: string;
    quantity: number;
    totalPrice: number;
    adress: string;
    phone: string;
  }>({
    customerName: "",
    productTitle: "",
    quantity: 1,
    totalPrice: 0,
    adress: "",
    phone: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    showSuccess("Statusi u përditësua me sukses!");
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm("A jeni i sigurt që doni ta fshini këtë porosi?")) {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      showSuccess("Porosia u fshi me sukses!");
    }
  };

  const handleNewOrderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "totalPrice" ? Number(value) : value,
    }));
  };

  const handleAddOrder = () => {
    if (
      !newOrder.customerName ||
      !newOrder.productTitle ||
      newOrder.quantity < 1 ||
      !newOrder.adress ||
      !newOrder.phone
    ) {
      alert("Ju lutem plotësoni të gjitha fushat.");
      return;
    }
    const newOrderEntry: Order = {
      id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
      status: "Krijuar",
      createdAt: new Date(),
      ...newOrder,
    };
    setOrders((prev) => [newOrderEntry, ...prev]);
    showSuccess("Porosia u shtua me sukses!");
    setNewOrder({
      customerName: "",
      productTitle: "",
      quantity: 1,
      totalPrice: 0,
      adress: "",
      phone: "",
    });
    setShowForm(false);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "Krijuar":
        return "🆕";
      case "Konfirmuar":
        return "✅";
      case "Shipped":
        return "🚛";
      case "Delivered":
        return "📦";
      default:
        return "📋";
    }
  };

  const totalRevenue = orders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="container my-4">
      {/* Koka e seksionit dhe titulli */}
      <h1 className="text-center mb-4" style={{ color: "#3b82f6" }}>
        Menaxhimi i Porosive
      </h1>

      {/* Mesazhi i suksesit */}
      {successMessage && (
        <div
          className="alert alert-success text-center"
          role="alert"
          style={{ backgroundColor: "#d1e7dd", color: "#0f5132" }}
        >
          {successMessage}
        </div>
      )}

      {/* Statistikat me ngjyra */}
      <div className="row mb-4 g-3">
        {/* Total */}
        <div className="col-md-3">
          <div
            className="card shadow-sm border-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white h-100"
            style={{ borderRadius: "15px" }}
          >
            <div className="card-body d-flex justify-content-between align-items-center p-3">
              <div>
                <h5 className="mb- text-dark">Totali</h5>
                <h2 className="display-4 text-dark fw-bold">{orders.length}</h2>
              </div>
              <div
                className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "60px", height: "60px" }}
              >
                <Package style={{ width: 30, height: 30, color: "#4f46e5" }} />
              </div>
            </div>
          </div>
        </div>
        {/* Statuset */}
        {orderStatuses.map((status) => (
          <div key={status} className="col-md-3">
            <div
              className="card shadow-sm border-0 bg-light h-100"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
                <div>
                  <h6 className="text-muted mb-2">{status}</h6>
                  <h3 className="fw-bold">
                    {orders.filter((o) => o.status === status).length}
                  </h3>
                </div>
                <div style={{ fontSize: "2rem" }}>{getStatusIcon(status)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Kontrollat */}
      <div
        className="card p-3 mb-4"
        style={{ borderRadius: "15px", backgroundColor: "#f8fafc" }}
      >
        <div className="d-flex flex-wrap align-items-center gap-3">
          {/* Kërkimi */}
          <div className="input-group flex-fill" style={{ maxWidth: "300px" }}>
            <span className="input-group-text bg-blue-100 border-0">
              <Search />
            </span>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Kërko porosi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filter */}
          <div className="d-flex align-items-center">
            <Filter className="me-2" style={{ color: "#3b82f6" }} />
            <select
              className="form-select"
              style={{ minWidth: "150px", borderColor: "#3b82f6" }}
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as OrderStatus | "")
              }
            >
              <option value="">Të gjitha</option>
              {orderStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          {/* Shto porosi */}
          <button
            className="btn btn-primary ms-auto"
            style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6" }}
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="me-2" /> Shto Porosi
          </button>
        </div>
      </div>

      {/* Forma e porosisë */}
      {showForm && (
        <div
          className="card p-4 mb-4"
          style={{ borderRadius: "15px", backgroundColor: "#e0f2fe" }}
        >
          <h5 className="mb-3 text-center" style={{ color: "#0284c7" }}>
            Shto Porosi të Re
          </h5>
          <div className="row g-3">
            {[
              { label: "Emri i Klientit", name: "customerName", type: "text" },
              { label: "Produkt", name: "productTitle", type: "text" },
              { label: "Sasia", name: "quantity", type: "number", min: 1 },
              { label: "Adresa", name: "adress", type: "text" },
              {
                label: "Çmimi (€)",
                name: "totalPrice",
                type: "number",
                min: 0,
                step: "0.01",
              },
              {
                label: "Numri i Telefonit",
                name: "phone",
                type: "tel",
                min: 0,
                step: "any",
              },
            ].map(({ label, name, type, min, step }) => (
              <div key={name} className="col-md-6">
                <label className="form-label" style={{ color: "#0369a1" }}>
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  min={min}
                  step={step}
                  className="form-control"
                  style={{ borderColor: "#0284c7" }}
                  value={(newOrder as any)[name]}
                  onChange={handleNewOrderChange}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 d-flex gap-2 justify-content-center">
            <button className="btn btn-success" onClick={handleAddOrder}>
              Ruaj Porosinë
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Anulo
            </button>
          </div>
        </div>
      )}

      {/* Tabela e porosive */}
      <div className="table-responsive mb-4">
        <table
          className="table table-hover align-middle"
          style={{ borderRadius: "15px", overflow: "hidden" }}
        >
          <thead className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
            <tr>
              {[
                "ID",
                "Klienti",
                "Produkti",
                "Sasia",
                "Çmimi",
                "Data",
                "Adresa",
                "Kontakti",
                "Statusi",
                "Veprime",
              ].map((h) => (
                <th key={h} className="text-uppercase small">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-4 text-muted"
                  style={{ fontSize: "2rem" }}
                >
                  <Package
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#9ca3af",
                    }}
                  />
                  Nuk u gjetën porosi që përputhen me kriteret.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="align-middle"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      hoveredId === order.id ? "#0d6efd" : "transparent",
                    color: hoveredId === order.id ? "white" : "inherit",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={() => setHoveredId(order.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <td className="text-dark">{order.id}</td>
                  <td className="d-flex align-items-center gap-2">
                    <User className="w-4 h-4 text-primary" />{" "}
                    {order.customerName}
                  </td>
                  <td>{order.productTitle}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalPrice ? `€${order.totalPrice}` : "-"}</td>
                  <td>
                    <div className="d-flex align-items-center gap-1 text-muted">
                      <Calendar style={{ fontSize: "1rem" }} />{" "}
                      {order.createdAt.toLocaleDateString("sq-AL")}
                    </div>
                  </td>
                  <td>{order.adress}</td>
                  <td>{order.phone}</td>
                  {/* Statusi me ngjyra */}
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className={`border rounded-pill px-3 py-1 small`}
                        style={{
                          minWidth: 100,
                          textAlign: "center",
                          fontWeight: "600",
                          borderColor: statusColors[order.status].split(" ")[0],
                          backgroundColor:
                            statusColors[order.status].split(" ")[1],
                          color: statusColors[order.status].split(" ")[3],
                        }}
                      >
                        <span className="me-1">
                          {getStatusIcon(order.status)}
                        </span>
                        {order.status}
                      </span>
                      <select
                        className="form-select form-select-sm"
                        style={{ minWidth: "100px" }}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                      >
                        {orderStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  {/* Veprimet */}
                  <td>
                    <button
                      className="btn btn-link text-danger p-0"
                      onClick={() => handleDeleteOrder(order.id)}
                      title="Fshi porosinë"
                    >
                      <Trash2 style={{ fontSize: "1.2rem" }} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Totali i porosive */}
      <div
        className="d-flex justify-content-between bg-light p-3 rounded"
        style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
      >
        <div>
          <div className="small text-muted mb-1" style={{ color: "#6b7280" }}>
            Totali i Porosive të Dorëzuara
          </div>
          <div className="h4 mb-0" style={{ color: "#111827" }}>
            €{totalRevenue.toLocaleString()}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="small text-muted mb-1" style={{ color: "#6b7280" }}>
            Porosi të Filtruara
          </div>
          <div className="h4 mb-0" style={{ color: "#111827" }}>
            {filteredOrders.length} nga {orders.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
