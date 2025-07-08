import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAppContext } from "../../context/AppContext";

const Report = () => {
  const { order } = useAppContext();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter orders with status "delivered" and by date range
  const filteredOrders = order.filter((o) => {
    if (o.status.toLowerCase() !== "delivered") return false;

    const orderDate = new Date(o.date);
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;

    if (from && orderDate < from) return false;
    if (to && orderDate > to) return false;

    return true;
  });

  // Calculate total sales amount
  const total = filteredOrders.reduce((sum, o) => {
    const orderTotal = o.products.reduce(
      (s, p) => s + parseFloat(p.price) * (p.quantity || 1),
      0
    );
    return sum + orderTotal;
  }, 0);

  // Calculate profit and loss
  const profit = total * 0.3;
  const loss = total - profit;

  return (
    <div className="container mt-5" style={{ paddingTop: "20px" }}>
      <h2 className="text-center mb-4 text-light mt-5">📊 Financial Report</h2>

      {/* Date filter */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label className="form-label text-light">From Date:</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label text-light">To Date:</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-3">
          <div
            className="card text-center border-0 shadow"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="card-body">
              <h5 className="card-title text-muted">Total Sales</h5>
              <h3 className="fw-bold">{total.toFixed(2)} €</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card text-center border-0 shadow"
            style={{ backgroundColor: "#D1E7DD" }}
          >
            <div className="card-body">
              <h5 className="card-title text-dark">Profit (30%)</h5>
              <h3 className="fw-bold">{profit.toFixed(2)} €</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card text-center border-0 shadow"
            style={{ backgroundColor: "#F8D7DA" }}
          >
            <div className="card-body">
              <h5 className="card-title text-dark">Loss</h5>
              <h3 className="fw-bold">{loss.toFixed(2)} €</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <h5 className="text-light mb-3">📊 Financial Summary Chart</h5>
      <div style={{ width: "100%", height: 300 }} className="mb-5">
        <ResponsiveContainer>
          <BarChart
            data={[
              { name: "Total Sales", value: total },
              { name: "Profit", value: profit },
              { name: "Loss", value: loss },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Table */}
      <h5 className="text-light mb-3">📦 Order Details</h5>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total (€)</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                No delivered orders found.
              </td>
            </tr>
          ) : (
            filteredOrders.map((o) => {
              const totalOrder = o.products.reduce(
                (s, p) => s + parseFloat(p.price) * (p.quantity || 1),
                0
              );
              return (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>
                    {o.customer.firstName} {o.customer.lastName}
                  </td>
                  <td>{new Date(o.date).toLocaleDateString()}</td>
                  <td>{o.status}</td>
                  <td>{totalOrder.toFixed(2)} €</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
