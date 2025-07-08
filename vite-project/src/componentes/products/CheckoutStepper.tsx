import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

export default function ModernCheckoutStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+355",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const steps = [
    {
      title: "Personal Information",
      subtitle: "First and Last Name",
      fields: ["firstName", "lastName"],
      icon: User,
    },
    {
      title: "Contact",
      subtitle: "Email and Phone",
      fields: ["email", "phone"],
      icon: Mail,
    },
    {
      title: "Address",
      subtitle: "Shipping Information",
      fields: ["address", "city", "zipCode", "country"],
      icon: MapPin,
    },
    {
      title: "Confirmation",
      subtitle: "Review Your Order",
      fields: [],
      icon: CreditCard,
    },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = (stepIndex: number) => {
    if (stepIndex === 3) return true; // Confirmation step
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
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Order submitted successfully!");
    setIsSubmitting(false);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "+355",
      address: "",
      city: "",
      zipCode: "",
      country: "",
    });
    setCurrentStep(0);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                First Name *
              </label>
              <input
                type="text"
                className="form-control form-control-lg border-2 rounded-3"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                style={{
                  borderColor: "#e9ecef",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                Last Name *
              </label>
              <input
                type="text"
                className="form-control form-control-lg border-2 rounded-3"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                style={{
                  borderColor: "#e9ecef",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                Email *
              </label>
              <input
                type="email"
                className="form-control form-control-lg border-2 rounded-3"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                style={{
                  borderColor: "#e9ecef",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                Phone Number *
              </label>
              <input
                type="tel"
                className="form-control form-control-lg border-2 rounded-3"
                placeholder="+355 69 123 4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                style={{
                  borderColor: "#e9ecef",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                Address *
              </label>
              <input
                type="text"
                className="form-control form-control-lg border-2 rounded-3"
                placeholder="Street, house number"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                style={{
                  borderColor: "#e9ecef",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark">
                  City *
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg border-2 rounded-3"
                  placeholder="Tirana"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  style={{
                    borderColor: "#e9ecef",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg border-2 rounded-3"
                  placeholder="1000"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  style={{
                    borderColor: "#e9ecef",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                Country *
              </label>
              <select
                className="form-select form-select-lg border-2 rounded-3"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                style={{
                  borderColor: "#e9ecef",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              >
                <option value="">Select a country</option>
                <option value="Albania">Albania</option>
                <option value="Kosovo">Kosovo</option>
                <option value="Montenegro">Montenegro</option>
                <option value="North Macedonia">North Macedonia</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div
              className="p-4 rounded-4 border border-primary border-opacity-25 mb-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(13, 110, 253, 0.1), rgba(111, 66, 193, 0.1))",
              }}
            >
              <h3 className="h5 fw-bold text-dark mb-3">Order Summary</h3>
              <div className="row g-3">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">First Name:</span>
                    <span className="fw-semibold">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Email:</span>
                    <span className="fw-semibold">{formData.email}</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Phone:</span>
                    <span className="fw-semibold">{formData.phone}</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-start">
                    <span className="text-muted">Address:</span>
                    <div className="text-end fw-semibold">
                      <div>{formData.address}</div>
                      <div>
                        {formData.city}, {formData.zipCode}
                      </div>
                      <div>{formData.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <Check className="me-2" size={16} />
              <span>All information is correct and complete</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-vh-100 py-5 px-3"
      style={{
        background:
          "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-6">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-5 fw-bold text-dark mb-3">Checkout</h1>
              <p className="text-muted fs-5">
                Please fill out your information to complete the order
              </p>
            </div>

            {/* Main Card */}
            <div
              className="card border-0 shadow-lg rounded-4 overflow-hidden"
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Progress Bar */}
              <div
                className="p-4"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ width: "100%" }}
                >
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;

                    return (
                      <React.Fragment key={index}>
                        <div
                          className={`rounded-circle d-flex align-items-center justify-content-center ${
                            isCompleted
                              ? "bg-success text-white"
                              : isActive
                              ? "bg-white text-primary shadow-lg"
                              : "text-white"
                          }`}
                          style={{
                            width: "48px",
                            height: "48px",
                            backgroundColor:
                              !isCompleted && !isActive
                                ? "rgba(255, 255, 255, 0.3)"
                                : undefined,
                            transition: "all 0.3s ease",
                            flexShrink: 0,
                          }}
                        >
                          {isCompleted ? (
                            <Check size={24} />
                          ) : (
                            <Icon size={24} />
                          )}
                        </div>

                        {index < steps.length - 1 && (
                          <div
                            style={{
                              flexGrow: 1,
                              height: "2px",
                              backgroundColor: isCompleted
                                ? "#10b981"
                                : "rgba(255, 255, 255, 0.3)",
                              marginLeft: "12px",
                              marginRight: "12px",
                              transition: "all 0.3s ease",
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-5">
                <div className="mb-4">
                  <h2 className="h3 fw-bold text-dark mb-2">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-muted">{steps[currentStep].subtitle}</p>
                </div>

                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`btn btn-lg rounded-3 d-flex align-items-center gap-2 ${
                      currentStep === 0
                        ? "btn-light text-muted"
                        : "btn-outline-secondary"
                    }`}
                    style={{
                      minWidth: "120px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>

                  {currentStep === steps.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`btn btn-lg rounded-3 d-flex align-items-center gap-2 ${
                        isSubmitting ? "btn-secondary" : "btn-success"
                      }`}
                      style={{
                        minWidth: "180px",
                        background: !isSubmitting
                          ? "linear-gradient(135deg, #10b981, #059669)"
                          : undefined,
                        border: "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check size={20} />
                          Complete Order
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      disabled={!isStepValid(currentStep)}
                      className={`btn btn-lg rounded-3 d-flex align-items-center gap-2 ${
                        !isStepValid(currentStep)
                          ? "btn-light text-muted"
                          : "btn-primary"
                      }`}
                      style={{
                        minWidth: "120px",
                        background: isStepValid(currentStep)
                          ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                          : undefined,
                        border: "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Continue
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="text-center mt-4">
              <small className="text-muted">
                🔒 Your data is safe and encrypted
              </small>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .form-control:focus,
        .form-select:focus {
          border-color: #0d6efd !important;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
        }
        
        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .btn:active:not(:disabled) {
          transform: translateY(0);
        }
        
        .card {
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          max-width: 400px;
          margin: 0 auto;
        }
        
        @media (max-width: 768px) {
          .d-flex.align-items-center {
            flex-wrap: wrap;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
