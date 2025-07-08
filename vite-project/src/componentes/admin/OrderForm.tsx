import React from "react";

const OrderForm = ({
  newOrder,
  handleNewOrderChange,
  handleAddOrder,
  setShowForm,
  productdata,
}: {
  newOrder: any;
  handleNewOrderChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleAddOrder: () => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  productdata: any[];
}) => {
  return (
    <div className="card p-4 mb-4" style={{ backgroundColor: "#e0f2fe" }}>
      <h5 className="mb-3 text-center" style={{ color: "#0284c7" }}>
        Add New Order
      </h5>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            Customer First Name
          </label>
          <input
            type="text"
            name="customerName"
            className="form-control"
            value={newOrder.customerName}
            onChange={handleNewOrderChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={newOrder.lastName}
            onChange={handleNewOrderChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={newOrder.email}
            onChange={handleNewOrderChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            Product
          </label>
          <select
            name="productTitle"
            className="form-select"
            value={newOrder.productTitle}
            onChange={handleNewOrderChange}
          >
            <option value="">Select a product</option>
            {productdata.map((product) => (
              <option key={product.id} value={product.title}>
                {product.title}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            min={1}
            className="form-control"
            value={newOrder.quantity}
            onChange={handleNewOrderChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            Address
          </label>
          <input
            type="text"
            name="adress"
            className="form-control"
            value={newOrder.adress}
            onChange={handleNewOrderChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            Price (€)
          </label>
          <input
            type="number"
            name="totalPrice"
            className="form-control"
            value={Number(newOrder.totalPrice) || 0}
            onChange={handleNewOrderChange}
            readOnly
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={newOrder.phone}
            onChange={handleNewOrderChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            City
          </label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={newOrder.city}
            onChange={handleNewOrderChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            Zip Code
          </label>
          <input
            type="text"
            name="zipCode"
            className="form-control"
            value={newOrder.zipCode}
            onChange={handleNewOrderChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" style={{ color: "#0369a1" }}>
            Country
          </label>
          <input
            type="text"
            name="country"
            className="form-control"
            value={newOrder.country}
            onChange={handleNewOrderChange}
          />
        </div>
      </div>

      <div className="mt-3 d-flex gap-2 justify-content-center">
        <button className="btn btn-success" onClick={handleAddOrder}>
          Save Order
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
