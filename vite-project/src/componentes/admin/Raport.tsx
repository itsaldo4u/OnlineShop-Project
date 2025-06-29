import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Product = {
  title: string;
  price: string;
  quantity: number;
};
type Customer = {
  firstName: string;
  lastName: string;
};
type Order = {
  id: string;
  customer: Customer;
  products: Product[];
  date: string;
  status: string;
};
const Raport = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/order")
      .then((res) => {
        const delivered = res.data.filter((o: Order) => {
          if (o.status !== "Delivered") return false;
          const orderDate = new Date(o.date);
          const fromDate = startDate ? new Date(startDate) : null;
          const toDate = endDate ? new Date(endDate) : null;
          if (fromDate && orderDate < fromDate) return false;
          if (toDate && orderDate > toDate) return false;
          return true;
        });
        setOrders(delivered);
      })
      .catch((err) => console.error("Gabim:", err));
  }, [startDate, endDate]);
  // Llogarit totalin për çdo porosi
  const total = orders.reduce((sum, o) => {
    const orderTotal = o.products.reduce(
      (s, p) => s + parseFloat(p.price) * (p.quantity || 1),
      0
    );
    return sum + orderTotal;
  }, 0);
  const profit = total * 0.3;
  const loss = total - profit;
  return (
    <div className="container mt-5" style={{ paddingTop: "20px" }}>
      <h2 className="text-center mb-4 text-light mt-5">
        :bar_chart: Raporti Financiar
      </h2>
      <div className="row mb-4">
        <div className="col-md-3">
          <label className="form-label text-light">Nga data:</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label text-light">Deri më:</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      {/* KARTAT */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-3">
          <div
            className="card text-center border-0 shadow"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="card-body">
              <h5 className="card-title text-muted">Shitje Totale</h5>
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
              <h5 className="card-title text-dark">Fitimi (30%)</h5>
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
              <h5 className="card-title text-dark">Humbja</h5>
              <h3 className="fw-bold">{loss.toFixed(2)} €</h3>
            </div>
          </div>
        </div>
      </div>
      {/* GRAFIKU */}
      <h5 className="text-light mb-3">
        :bar_chart: Grafik i Përmbledhjes Financiare
      </h5>
      <div style={{ width: "100%", height: 300 }} className="mb-5">
        <ResponsiveContainer>
          <BarChart
            data={[
              { name: "Shitje Totale", value: total },
              { name: "Fitimi", value: profit },
              { name: "Humbja", value: loss },
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
      {/* TABELA */}
      <h5 className="text-light mb-3">:package: Detaje të Porosive</h5>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Klienti</th>
            <th>Data</th>
            <th>Statusi</th>
            <th>Total (€)</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                Nuk ka porosi të dorëzuara.
              </td>
            </tr>
          ) : (
            orders.map((o) => {
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
export default Raport;
