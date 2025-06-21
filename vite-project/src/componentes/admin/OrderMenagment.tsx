import React, { useState } from "react";

type OrderStatus = "Krijuar" | "Konfirmuar" | "Shipped" | "Delivered";

type Order = {
  id: string;
  customerName: string;
  productTitle: string;
  quantity: number;
  status: OrderStatus;
};

const orderStatuses: OrderStatus[] = [
  "Krijuar",
  "Konfirmuar",
  "Shipped",
  "Delivered",
];

// Ngjyrat për status
const statusColors: Record<OrderStatus, string> = {
  Krijuar: "secondary",
  Konfirmuar: "info",
  Shipped: "primary",
  Delivered: "success",
};

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      customerName: "Arber K.",
      productTitle: "Produkt A",
      quantity: 2,
      status: "Krijuar",
    },
    {
      id: "2",
      customerName: "Elira M.",
      productTitle: "Produkt B",
      quantity: 1,
      status: "Konfirmuar",
    },
  ]);

  const [newOrder, setNewOrder] = useState<Omit<Order, "id" | "status">>({
    customerName: "",
    productTitle: "",
    quantity: 1,
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleNewOrderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newOrder.customerName ||
      !newOrder.productTitle ||
      newOrder.quantity < 1
    ) {
      alert("Ju lutem plotësoni të gjitha fushat.");
      return;
    }

    const newOrderEntry: Order = {
      id: Math.random().toString(36).substr(2, 9),
      status: "Krijuar",
      ...newOrder,
    };

    setOrders((prev) => [newOrderEntry, ...prev]);

    setSuccessMessage("Porosia u shtua me sukses!");
    setTimeout(() => setSuccessMessage(""), 3000);

    setNewOrder({ customerName: "", productTitle: "", quantity: 1 });
  };

  return (
    <div className="container text-dark my-4">
      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Shto Porosi të Re</h4>
        {successMessage && (
          <div className="alert alert-success py-2">{successMessage}</div>
        )}
        <form onSubmit={handleAddOrder}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Emri i Klientit</label>
              <input
                type="text"
                className="form-control"
                name="customerName"
                value={newOrder.customerName}
                onChange={handleNewOrderChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Produkt</label>
              <input
                type="text"
                className="form-control"
                name="productTitle"
                value={newOrder.productTitle}
                onChange={handleNewOrderChange}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Sasia</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                min={1}
                value={newOrder.quantity}
                onChange={handleNewOrderChange}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-success w-100">
                Shto
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Lista e Porosive</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Klienti</th>
                <th>Produkti</th>
                <th>Sasia</th>
                <th>Statusi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-3">
                    Nuk ka porosi të regjistruara.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ wordBreak: "break-word" }}>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.productTitle}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className={`badge bg-${statusColors[order.status]}`}
                        >
                          {order.status}
                        </span>
                        <select
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value as OrderStatus
                            )
                          }
                        >
                          {orderStatuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
