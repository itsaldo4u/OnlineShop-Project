import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CheckoutStepper.css";

type CartItem = {
  id: string;
  title: string;
  price: string;
  quantity: number;
  img: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

type LocationState = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export default function CheckoutStepper() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const cartItems = state?.cartItems || [];
  const setCartItems = state?.setCartItems;

  const steps = [
    { title: "Emri", fields: ["firstName", "lastName"] },
    { title: "Email", fields: ["email"] },
    { title: "Adresa", fields: ["address", "city", "zipCode", "country"] },
  ];

  useEffect(() => {
    if (cartItems.length === 0) {
      alert("Shporta është bosh!");
      navigate("/checkout");
    }
  }, [cartItems, navigate]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = (stepIndex: number) => {
    const requiredFields = steps[stepIndex].fields;
    return requiredFields.every(
      (field) => formData[field as keyof FormData].trim() !== ""
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && isStepValid(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid(currentStep)) return;

    if (cartItems.length === 0) {
      alert("Shporta është bosh! Ju lutemi shtoni produkte.");
      return;
    }

    const order = {
      customer: formData,
      products: cartItems,
      date: new Date().toISOString(),
      status: "pending",
    };

    try {
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!response.ok) throw new Error("Failed to send order");

      await response.json();
      alert("Porosia u dërgua me sukses!");

      setCartItems?.([]);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Gabim gjatë dërgimit të porosisë.");
    }
  };

  const renderStepFields = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <label>Emri</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Shkruani emrin"
            />
            <label>Mbiemri</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Shkruani mbiemrin"
            />
          </>
        );
      case 1:
        return (
          <>
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Shkruani email-in"
            />
          </>
        );
      case 2:
        return (
          <>
            <label>Adresa</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Adresa e rrugës"
            />
            <label>Qyteti</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Qyteti"
            />
            <label>ZIP Kodi</label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              placeholder="Kodi Postar"
            />
            <label>Shteti</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              placeholder="Shteti"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="checkout-container">
        <h2>Checkout</h2>

        {/* Step Indicator */}
        <div className="step-indicator">
          {steps.map((step, idx) => (
            <div key={idx} className="step">
              <div
                className={`circle ${
                  idx < currentStep
                    ? "completed"
                    : idx === currentStep
                    ? "active"
                    : "inactive"
                }`}
              >
                {idx < currentStep ? <Check size={16} /> : idx + 1}
              </div>
              <span
                className={`label ${
                  idx <= currentStep ? "label-active" : "label-inactive"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form Fields */}
        <div className="step-content">
          <h3>
            Hapi {currentStep + 1}: {steps[currentStep].title}
          </h3>
          {renderStepFields()}
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="previous-button"
          >
            <ChevronLeft size={16} style={{ marginRight: "4px" }} />
            Mbrapa
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid(currentStep)}
              className="complete-button"
            >
              Përfundo Porosinë
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className="next-button"
            >
              Para
              <ChevronRight size={16} style={{ marginLeft: "4px" }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
