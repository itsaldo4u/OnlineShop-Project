import { useState, useEffect } from "react";
import { ProductData } from "../../context/AppContext";
import { XCircle, Save } from "lucide-react";

type FormProps = {
  product: ProductData | null;
  onClose: () => void;
  onSave: (product: ProductData) => void;
};

const ProductForm = ({ product, onClose, onSave }: FormProps) => {
  const [formData, setFormData] = useState<ProductData>(
    product || {
      id: "",
      img: "",
      title: "",
      description: "",
      price: "",
      tags: [],
      filterTags: [],
      rating: undefined,
      discount: "",
      isNew: false,
    }
  );

  const [rawTagsInput, setRawTagsInput] = useState<string>(
    formData.tags.join(", ")
  );
  const [rawFilterTagsInput, setRawFilterTagsInput] = useState<string>(
    formData.filterTags.join(", ")
  );
  const [tagError, setTagError] = useState<string | null>(null);
  const [filterTagError, setFilterTagError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setRawTagsInput(product.tags.join(", "));
      setRawFilterTagsInput(product.filterTags.join(", "));
    } else {
      setRawTagsInput("");
      setRawFilterTagsInput("");
    }

    setTagError(null);
    setFilterTagError(null);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, checked, type } = e.target as HTMLInputElement;

    if (name === "tags" || name === "filterTags") {
      if (name === "tags") {
        setRawTagsInput(value);
      } else {
        setRawFilterTagsInput(value);
      }

      if (name === "tags") setTagError(null);
      if (name === "filterTags") setFilterTagError(null);

      const currentTags = value
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "");

      if (currentTags.length > 3) {
        if (name === "tags") {
          setTagError("A maximum of 3 tags are allowed.");
        } else {
          setFilterTagError("A maximum of 3 filter tags are allowed.");
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: currentTags,
        }));
      }
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name === "rating") {
      setFormData((prevData) => ({
        ...prevData,
        rating: value === "" ? undefined : Number(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalTags = rawTagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    const finalFilterTags = rawFilterTagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    if (finalTags.length > 3) {
      setTagError("A maximum of 3 tags are allowed.");
      return;
    }
    if (finalFilterTags.length > 3) {
      setFilterTagError("A maximum of 3 filter tags are allowed.");
      return;
    }

    const dataToSave = {
      ...formData,
      tags: finalTags,
      filterTags: finalFilterTags,
    };

    if (!dataToSave.id) {
      dataToSave.id = Math.random().toString(36).substr(2, 9);
    }
    onSave(dataToSave);
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
      aria-labelledby="productFormModal"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content rounded-4 shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-gradient-primary text-white py-3 px-4 rounded-top-4">
              <h5 className="modal-title fw-bold m-0" id="productFormModal">
                {product ? "Edit Product" : "Add Product"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <div
              className="modal-body p-4"
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              {/* Title */}
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-3"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Description
                </label>
                <textarea
                  className="form-control form-control-sm rounded-3"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  required
                />
              </div>

              {/* Price */}
              <div className="mb-3">
                <label
                  htmlFor="price"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Price
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-3"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Image (filename) */}
              <div className="mb-3">
                <label
                  htmlFor="img"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Image (filename)
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-3"
                  id="img"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                />
              </div>

              {/* Tags */}
              <div className="mb-3">
                <label
                  htmlFor="tags"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Tags (max 3, separate with commas)
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm rounded-3 ${
                    tagError ? "is-invalid" : ""
                  }`}
                  id="tags"
                  name="tags"
                  value={rawTagsInput} // Using unprocessed state here
                  onChange={handleChange}
                />
                {tagError && (
                  <div className="invalid-feedback d-block">{tagError}</div>
                )}
              </div>

              {/* Filter Tags */}
              <div className="mb-3">
                <label
                  htmlFor="filterTags"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Filter Tags (max 3, separate with commas)
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm rounded-3 ${
                    filterTagError ? "is-invalid" : ""
                  }`}
                  id="filterTags"
                  name="filterTags"
                  value={rawFilterTagsInput} // Using unprocessed state here
                  onChange={handleChange}
                />
                {filterTagError && (
                  <div className="invalid-feedback d-block">
                    {filterTagError}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="mb-3">
                <label
                  htmlFor="rating"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Rating - 1 to 5
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  className="form-control form-control-sm rounded-3"
                  id="rating"
                  name="rating"
                  value={formData.rating ?? ""}
                  onChange={handleChange}
                />
              </div>

              {/* Discount */}
              <div className="mb-3">
                <label
                  htmlFor="discount"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Discount (e.g., "10% OFF")
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-3"
                  id="discount"
                  name="discount"
                  value={formData.discount ?? ""}
                  onChange={handleChange}
                />
              </div>

              {/* New Product Checkbox */}
              <div className="form-check form-switch mb-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  id="isNew"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label small fw-semibold text-muted"
                  htmlFor="isNew"
                >
                  New Product
                </label>
              </div>
            </div>

            <div className="modal-footer d-flex justify-content-end gap-2 py-3 px-4 bg-light rounded-bottom-4">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 rounded-pill px-3 py-2"
                onClick={onClose}
              >
                <XCircle size={16} /> Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm d-flex align-items-center gap-1 rounded-pill px-3 py-2"
                // Disable button if there are errors
                disabled={!!tagError || !!filterTagError}
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  boxShadow: "0 4px 8px rgba(102, 126, 234, 0.3)",
                }}
              >
                <Save size={16} /> Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
