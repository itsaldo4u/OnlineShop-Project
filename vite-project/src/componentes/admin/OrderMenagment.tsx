import React, { useState } from "react";
import { Package, Calendar, Trash2, Plus } from "lucide-react";
import { useAppContext, OrderStatus } from "../../context/AppContext";
import OrderForm from "./OrderForm";

const orderStatuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
];

const statusColors: Record<OrderStatus, any> = {
  pending: {
    borderColor: "#6c757d",
    backgroundColor: "rgba(108,117,125,0.1)",
    color: "#6c757d",
  },
  confirmed: {
    borderColor: "#0d6efd",
    backgroundColor: "rgba(13,110,253,0.1)",
    color: "#0d6efd",
  },
  shipped: {
    borderColor: "#ffc107",
    backgroundColor: "rgba(255,193,7,0.1)",
    color: "#ffc107",
  },
  delivered: {
    borderColor: "#198754",
    backgroundColor: "rgba(25,135,84,0.1)",
    color: "#198754",
  },
};

const OrderManagement = () => {
  const {
    order,
    addOrder,
    deleteOrder,
    updateOrder,
    updateOrderStatus,
    productdata,
  } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [showForm, setShowForm] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    lastName: "",
    email: "",
    productTitle: "",
    quantity: 1,
    totalPrice: 0,
    adress: "",
    phone: "",
    img: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const handleNewOrderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "productTitle") {
      const selectedProduct = productdata.find((p) => p.title === value);
      const price = selectedProduct
        ? parseFloat(selectedProduct.price) || 0
        : 0;

      setNewOrder((prev) => ({
        ...prev,
        productTitle: value,
        img: selectedProduct?.img || "",
        totalPrice: price * (prev.quantity || 1),
      }));
    } else if (name === "quantity") {
      const quantity = Number(value) || 1;
      const selectedProduct = productdata.find(
        (p) => p.title === newOrder.productTitle
      );
      const price = selectedProduct
        ? parseFloat(selectedProduct.price) || 0
        : 0;

      setNewOrder((prev) => ({
        ...prev,
        quantity,
        totalPrice: price * quantity,
      }));
    } else {
      setNewOrder((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddOrUpdateOrder = async () => {
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

    const orderEntry = {
      id: editingOrderId || `ORD${Date.now()}`,
      customer: {
        firstName: newOrder.customerName,
        lastName: newOrder.lastName,
        email: newOrder.email,
        address: newOrder.adress,
        city: newOrder.city,
        zipCode: newOrder.zipCode,
        country: newOrder.country,
        phoneNumber: newOrder.phone,
      },
      products: [
        {
          id: `PRD${Date.now()}`,
          title: newOrder.productTitle,
          price: newOrder.totalPrice.toString(),
          img: newOrder.img,
          quantity: newOrder.quantity,
        },
      ],
      date: new Date().toISOString(),
      status: "pending" as OrderStatus,
    };

    if (editingOrderId) {
      await updateOrder(orderEntry.id, orderEntry);
      showSuccess("Porosia u përditësua me sukses!");
    } else {
      await addOrder(orderEntry);
      showSuccess("Porosia u shtua me sukses!");
    }

    setEditingOrderId(null);
    resetForm();
  };

  const resetForm = () => {
    setNewOrder({
      customerName: "",
      lastName: "",
      email: "",
      productTitle: "",
      quantity: 1,
      totalPrice: 0,
      adress: "",
      phone: "",
      img: "",
      city: "",
      zipCode: "",
      country: "",
    });
    setShowForm(false);
  };

  const handleEditOrder = (order: any) => {
    const product = order.products[0];
    setNewOrder({
      customerName: order.customer.firstName,
      lastName: order.customer.lastName,
      email: order.customer.email,
      productTitle: product.title,
      quantity: product.quantity,
      totalPrice: parseFloat(product.price),
      adress: order.customer.address,
      phone: order.customer.phoneNumber,
      img: product.img,
      city: order.customer.city,
      zipCode: order.customer.zipCode,
      country: order.customer.country,
    });
    setEditingOrderId(order.id);
    setShowForm(true);
  };

  const handleDeleteOrder = async (id: string) => {
    if (window.confirm("A jeni i sigurt që doni ta fshini këtë porosi?")) {
      await deleteOrder(id);
      showSuccess("Porosia u fshi me sukses!");
    }
  };

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    await updateOrderStatus(id, status);
    showSuccess("Statusi u përditësua me sukses!");
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filteredOrders = order.filter((o) => {
    const matchesSearch =
      o.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.products.some((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = order
    .filter((o) => o.status === "delivered")
    .reduce(
      (sum, o) =>
        sum +
        o.products.reduce(
          (acc, p) => acc + parseFloat(p.price) * p.quantity,
          0
        ),
      0
    );

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4" style={{ color: "#3b82f6" }}>
        Menaxhimi i Porosive
      </h1>

      {successMessage && (
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Kërko..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control w-50"
        />

        <select
          className="form-select w-25"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
        >
          <option value="">Të gjitha</option>
          {orderStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus className="me-2" /> Shto Porosi
        </button>
      </div>

      {showForm && (
        <OrderForm
          newOrder={newOrder}
          handleNewOrderChange={handleNewOrderChange}
          handleAddOrder={handleAddOrUpdateOrder}
          setShowForm={setShowForm}
          productdata={productdata}
        />
      )}

      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Klienti</th>
            <th>Produkti</th>
            <th>Sasia</th>
            <th>Çmimi</th>
            <th>Data</th>
            <th>Adresa</th>
            <th>Kontakti</th>
            <th>Statusi</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center text-muted">
                <Package /> Nuk u gjetën porosi.
              </td>
            </tr>
          ) : (
            filteredOrders.map((o) => (
              <tr
                key={o.id}
                onMouseEnter={() => setHoveredId(o.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ backgroundColor: hoveredId === o.id ? "#e0f2fe" : "" }}
              >
                <td>{o.id}</td>
                <td>{o.customer.firstName}</td>
                <td>{o.products.map((p) => p.title).join(", ")}</td>
                <td>{o.products.reduce((sum, p) => sum + p.quantity, 0)}</td>
                <td>
                  €
                  {o.products
                    .reduce(
                      (sum, p) => sum + parseFloat(p.price) * p.quantity,
                      0
                    )
                    .toFixed(2)}
                </td>
                <td>
                  <Calendar className="me-1" size={16} />
                  {new Date(o.date).toLocaleDateString("sq-AL")}
                </td>
                <td>{o.customer.address}</td>
                <td>{o.customer.phoneNumber}</td>
                <td>
                  <span
                    className="badge"
                    style={{ ...statusColors[o.status], padding: "5px 10px" }}
                  >
                    {o.status}
                  </span>
                  <select
                    className="form-select form-select-sm mt-1"
                    value={o.status}
                    onChange={(e) =>
                      handleStatusChange(o.id, e.target.value as OrderStatus)
                    }
                  >
                    {orderStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-link text-primary me-2"
                    onClick={() => handleEditOrder(o)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => handleDeleteOrder(o.id)}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="text-end mt-4">
        <div className="fw-bold">
          Totali i të Ardhurave: €{totalRevenue.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
